import { expect, test, describe, beforeAll, afterAll } from 'bun:test';
import { mockUrlTargeting } from './helpers';
const { VITE_API_URL: API_URL, SUPER_USER } = process.env;

export const testUrlTargeting = (headers) => {
  let newUrlTargeting = null;

  test('POST /url-targeting', async () => {
    const response = await fetch(`${API_URL}/url-targeting`, {
      method: 'POST',
      headers,
      body: JSON.stringify(mockUrlTargeting),
    });
    expect(response.status).toBe(200);
    const urlTargeting = await response.json();
    expect(urlTargeting.condition).toBe(mockUrlTargeting.condition);
    expect(urlTargeting.url).toBe(mockUrlTargeting.url);
    newUrlTargeting = urlTargeting;
  });

  test('PUT /url-targeting/:urlTargetingId', async () => {
    const response = await fetch(`${API_URL}/url-targeting/${newUrlTargeting.id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ url: 'https://converdiant.com', testing: true }),
    });
    expect(response.status).toBe(200);
    const urlTargeting = await response.json();
    expect(urlTargeting.id).toBe(newUrlTargeting.id);
    expect(urlTargeting.url).toBe('https://converdiant.com');
  });

  test('DELETE /url-targeting/:urlTargetingId', async () => {
    const response = await fetch(`${API_URL}/url-targeting/${newUrlTargeting.id}`, {
      method: 'DELETE',
      headers,
      body: JSON.stringify({ testing: true }),
    });
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.ok).toBe(true);
  });
};
