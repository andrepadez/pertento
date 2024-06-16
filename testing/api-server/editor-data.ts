import { expect, test } from 'bun:test';
import { mockChange } from './helpers';
const { VITE_API_URL: API_URL, SUPER_USER } = process.env;
import { websiteId, experimentId, variantId } from './helpers';

export const testEditorData = (headers) => {
  let allChanges = null;
  let newChange = null;

  test('GET /variant/:variantId', async () => {
    const response = await fetch(`${API_URL}/editor-data/variant/${variantId}`, { headers });
    expect(response.status).toBe(200);
    const variant = await response.json();
    expect(variant.id).toBe(variantId);
  });

  test('GET /experiment/:experimentId', async () => {
    const response = await fetch(`${API_URL}/editor-data/experiment/${experimentId}`, { headers });
    expect(response.status).toBe(200);
    const experiment = await response.json();
    expect(experiment.id).toBe(experimentId);
  });

  test('GET /variants/:experimentId', async () => {
    const response = await fetch(`${API_URL}/editor-data/variants/${experimentId}`, { headers });
    expect(response.status).toBe(200);
    const variants = await response.json();
    expect(variants).toBeInstanceOf(Array);
  });

  test('GET /websites/:websiteId/experiments', async () => {
    const response = await fetch(`${API_URL}/editor-data/websites/${websiteId}/experiments`, { headers });
    expect(response.status).toBe(200);
    const experiments = await response.json();
    expect(experiments).toBeInstanceOf(Array);
  });

  test('GET /variant/:variantId/changes', async () => {
    const response = await fetch(`${API_URL}/editor-data/variant/${variantId}/changes`, { headers });
    expect(response.status).toBe(200);
    const changes = await response.json();
    expect(changes).toBeInstanceOf(Array);
    allChanges = changes.slice(1).map((c) => {
      const change = { ...c };
      delete change.id;
      delete change.changedBy;
      return change;
    });
  });

  test('DELETE /changes/delete-all/:variantId', async () => {
    const response = await fetch(`${API_URL}/changes/delete-all/${variantId}`, {
      method: 'DELETE',
      headers,
    });
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.ok).toBe(true);
  });

  test('POST /changes - should recreate the changes', async () => {
    const response = await fetch(`${API_URL}/changes`, {
      method: 'POST',
      headers,
      body: JSON.stringify(allChanges),
    });
    expect(response.status).toBe(200);
    const changes = await response.json();
    expect(changes).toBeInstanceOf(Array);
    expect(changes.length).toBe(allChanges.length);
  });

  test('POST /changes - should create single change', async () => {
    const response = await fetch(`${API_URL}/changes`, {
      method: 'POST',
      headers,
      body: JSON.stringify([mockChange]),
    });
    expect(response.status).toBe(200);
    const [change] = await response.json();
    expect(change.id).toBeGreaterThan(0);
    newChange = change;
  });

  test('DELETE /changes/delete-all/:variantId', async () => {
    const response = await fetch(`${API_URL}/changes/${newChange.id}`, {
      method: 'DELETE',
      headers,
    });
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.ok).toBe(true);
  });
};
