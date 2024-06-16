import { expect, test, describe, beforeAll, afterAll } from 'bun:test';
import { mockDeviceTargeting } from './helpers';
const { VITE_API_URL: API_URL, SUPER_USER } = process.env;

export const testDeviceTargeting = (headers) => {
  let newDeviceTargeting = null;
  test('POST /device-targeting', async () => {
    const response = await fetch(`${API_URL}/device-targeting`, {
      method: 'POST',
      headers,
      body: JSON.stringify(mockDeviceTargeting),
    });
    expect(response.status).toBe(200);
    const deviceTargeting = await response.json();
    expect(deviceTargeting.id).toBeGreaterThan(0);
    expect(deviceTargeting.device).toBe(mockDeviceTargeting.device);
    newDeviceTargeting = deviceTargeting;
  });

  test('DELETE /device-targeting/:deviceTargetingId', async () => {
    const response = await fetch(`${API_URL}/device-targeting/${newDeviceTargeting.id}`, {
      method: 'DELETE',
      headers,
      body: JSON.stringify({ testing: true }),
    });
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.ok).toBe(true);
  });
};
