import { expect, test, describe, beforeAll, afterAll } from 'bun:test';
import { db, eq, ne, and, Variants } from 'pertentodb';
import { mockVariant } from './helpers';
const { VITE_API_URL: API_URL, SUPER_USER } = process.env;

export const testVariants = (headers) => {
  let newVariant = null;
  let allVariants = null;

  test('setting up', async () => {
    allVariants = await db.query.Variants.findMany({
      where: eq(Variants.experimentId, mockVariant.experimentId),
    });
  });

  test('POST /variants', async () => {
    const response = await fetch(`${API_URL}/variants`, {
      method: 'POST',
      headers,
      body: JSON.stringify(mockVariant),
    });
    expect(response.status).toBe(200);
    const variant = await response.json();
    expect(variant.name).toBe(mockVariant.name);
    newVariant = variant;
  });

  test('PUT /variants/:variantId', async () => {
    const response = await fetch(`${API_URL}/variants/${newVariant.id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ name: 'Green Variant', testing: true }),
    });
    expect(response.status).toBe(200);
    const variant = await response.json();
    expect(variant.id).toBe(newVariant.id);
    expect(variant.name).toBe('Green Variant');
  });

  test('PUT /variants/:variantId/change-name', async () => {
    const response = await fetch(`${API_URL}/variants/${newVariant.id}/change-name`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ name: 'Red Variant', testing: true }),
    });
    expect(response.status).toBe(200);
    const variant = await response.json();
    expect(variant.id).toBe(newVariant.id);
    expect(variant.name).toBe('Red Variant');
  });

  test('PUT /variants/:variantId/change-weight', async () => {
    const response = await fetch(`${API_URL}/variants/${newVariant.id}/change-weight`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ weight: 6000, testing: true }),
    });
    expect(response.status).toBe(200);
    const variant = await response.json();
    expect(variant.id).toBe(newVariant.id);
    expect(variant.weight).toBe(6000);
  });

  test('PUT /variants/:variantId/reset-weight', async () => {
    const response = await fetch(`${API_URL}/variants/${newVariant.id}/reset-weight`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ weight: 6000, testing: true }),
    });
    expect(response.status).toBe(200);
    const variant = await response.json();
    expect(variant.weight).toBe(null);
  });

  test('PUT /variants/:variantId/set-max-weight', async () => {
    const response = await fetch(`${API_URL}/variants/${newVariant.id}/set-max-weight`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ weight: 6000, testing: true }),
    });
    expect(response.status).toBe(200);
    const variant = await response.json();
    expect(variant.weight).toBe(10000);
    const variants = await db.query.Variants.findMany({
      where: and(eq(Variants.experimentId, mockVariant.experimentId), ne(Variants.id, newVariant.id)),
    });
    expect(variants.every((v) => v.weight === null)).toBe(true);

    for (let initialVariant of allVariants) {
      await db
        .update(Variants)
        .set({ name: initialVariant.name, weight: initialVariant.weigth })
        .where(eq(Variants.id, initialVariant.id));
    }
  });

  test('DELETE /variants/:variantId', async () => {
    const response = await fetch(`${API_URL}/variants/${newVariant.id}`, {
      method: 'DELETE',
      headers,
      body: JSON.stringify({ testing: true }),
    });
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.ok).toBe(true);
  });
};
