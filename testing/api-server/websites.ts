import { expect, test, describe, beforeAll, afterAll } from 'bun:test';
import { db, eq, Websites } from 'pertentodb';
import { mockWebsite, companyId, websiteId } from './helpers';
const { VITE_API_URL: API_URL, SUPER_USER } = process.env;

export const testWebsites = (headers) => {
  let newWebsite = null;
  test('GET /websites/:companyId', async () => {
    const response = await fetch(`${API_URL}/websites/${companyId}`, { headers });
    expect(response.status).toBe(200);
    const websites = await response.json();
    expect(websites).toBeInstanceOf(Array);
    expect(websites.length).toBeGreaterThan(0);
  });

  test('GET /websites/:websiteId/experiments', async () => {
    const response = await fetch(`${API_URL}/websites/${websiteId}/experiments`, { headers });
    expect(response.status).toBe(200);
    const experiments = await response.json();
    expect(experiments).toBeInstanceOf(Array);
  });

  test('POST /websites', async () => {
    const response = await fetch(`${API_URL}/websites`, {
      method: 'POST',
      headers,
      body: JSON.stringify(mockWebsite),
    });
    expect(response.status).toBe(200);
    const website = await response.json();
    expect(website.url).toBe(mockWebsite.url);
    newWebsite = website;
  });

  test('DELETE /websites/:websiteId', async () => {
    const response = await fetch(`${API_URL}/websites/${newWebsite.id}`, {
      method: 'DELETE',
      headers,
    });
    expect(response.status).toBe(200);
    const website = await response.json();
    expect(website.deleted).toBe(true);
    await db.delete(Websites).where(eq(Websites.id, newWebsite.id));
  });
};
