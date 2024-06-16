import { expect, test, describe, beforeAll, afterAll } from 'bun:test';
import { db, eq, inArray, Experiments, Variants } from 'pertentodb';
import { Changes, UrlTargeting, DeviceTargeting, ActivityLog } from 'pertentodb';
import { mockExperiment } from './helpers';
const { VITE_API_URL: API_URL, SUPER_USER } = process.env;
const experimentWithData = 428;

export const testExperiments = (headers) => {
  let newExperiment = null;
  let duplicatedExperiment = null;

  test('GET /experiments/:experimentId', async () => {
    const response = await fetch(`${API_URL}/experiments/${experimentWithData}`, { headers });
    expect(response.status).toBe(200);
    const experiment = await response.json();
    expect(experiment).toBeTruthy();
    expect(experiment.id).toBe(experimentWithData);
  });

  test('GET /experiments/:experimentId/variants', async () => {
    const response = await fetch(`${API_URL}/experiments/${experimentWithData}/variants`, { headers });
    expect(response.status).toBe(200);
    const variants = await response.json();
    expect(variants).toBeInstanceOf(Array);
  });

  test('POST /experiments', async () => {
    const response = await fetch(`${API_URL}/experiments`, {
      method: 'POST',
      headers,
      body: JSON.stringify(mockExperiment),
    });
    expect(response.status).toBe(200);
    const experiment = await response.json();
    expect(experiment).toBeTruthy();
    expect(experiment.id).toBeGreaterThan(0);
    newExperiment = experiment;
  });

  test('PUT /experiments/:experimentId/finish-setup', async () => {
    const response = await fetch(`${API_URL}/experiments/${newExperiment.id}/finish-setup`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        editorUrl: 'https://testing003.pertento.ai/',
        variantName: 'BlueGreen Variant',
        testing: true,
      }),
    });
    expect(response.status).toBe(200);
    const experiment = await response.json();
    expect(experiment).toBeTruthy();
    expect(experiment.id).toBe(newExperiment.id);
    expect(experiment.editorUrl).toBe('https://testing003.pertento.ai/');
    newExperiment = experiment;
  });

  test('POST /experiments/:experimentId/start', async () => {
    const variantWeights = newExperiment.variants.map((v) => ({ id: v.id, weight: 5000 }));
    const response = await fetch(`${API_URL}/experiments/${newExperiment.id}/start`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ variantWeights, testing: true }),
    });
    expect(response.status).toBe(200);
    const experiment = await response.json();
    expect(experiment).toBeTruthy();
    expect(experiment.id).toBe(newExperiment.id);
    expect(experiment.startsAt).toBeTruthy();
  });

  test('POST /experiments/:experimentId/end', async () => {
    const response = await fetch(`${API_URL}/experiments/${newExperiment.id}/end`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ testing: true }),
    });
    expect(response.status).toBe(200);
    const experiment = await response.json();
    expect(experiment).toBeTruthy();
    expect(experiment.id).toBe(newExperiment.id);
    expect(experiment.endsAt).toBeTruthy();
  });

  test('POST /experiments/:experimentId/duplicate', async () => {
    const response = await fetch(`${API_URL}/experiments/${newExperiment.id}/duplicate`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ name: 'Experiment from Testing (copy)', testing: true }),
    });
    expect(response.status).toBe(200);
    const experiment = await response.json();
    expect(experiment).toBeTruthy();
    expect(experiment.id).not.toBe(newExperiment.id);
    duplicatedExperiment = experiment;
  });

  test('POST /experiments/:experimentId/archive', async () => {
    const response = await fetch(`${API_URL}/experiments/${newExperiment.id}/archive`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ testing: true }),
    });
    expect(response.status).toBe(200);
    const experiment = await response.json();
    expect(experiment).toBeTruthy();
    expect(experiment.id).toBe(newExperiment.id);
    expect(experiment.archived).toBeTruthy();
  });

  test('DELETE /experiments/:experimentId', async () => {
    const response = await fetch(`${API_URL}/experiments/${newExperiment.id}`, {
      method: 'DELETE',
      headers,
      body: JSON.stringify({ testing: true }),
    });
    expect(response.status).toBe(200);
    const experiment = await response.json();
    expect(experiment.id).toBe(newExperiment.id);
    expect(experiment.deleted).toBeTruthy();
    await db.delete(Experiments).where(eq(Experiments.id, experiment.id));
    const variantIds = newExperiment.variants.map((v) => v.id);
    await db.delete(Variants).where(inArray(Variants.id, variantIds));
  });

  test('Cleanup', async () => {
    const variants = await db.query.Variants.findMany({ where: eq(Variants.experimentId, duplicatedExperiment.id) });
    const variantIds = variants.map((v) => v.id);
    await db.delete(Experiments).where(eq(Experiments.id, duplicatedExperiment.id));

    await db.delete(Variants).where(eq(Variants.experimentId, duplicatedExperiment.id));
    await db.delete(Changes).where(inArray(Changes.variantId, variantIds));
    await db.delete(UrlTargeting).where(eq(UrlTargeting.experimentId, duplicatedExperiment.id));
    await db.delete(DeviceTargeting).where(eq(DeviceTargeting.experimentId, duplicatedExperiment.id));
  });
};
