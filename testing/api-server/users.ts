import { expect, test, describe, beforeAll, afterAll } from 'bun:test';
import { mockUser } from '../auth-server/helpers';
const { VITE_API_URL: API_URL, SUPER_USER } = process.env;

export const testUsers = (headers) => {
  test('GET /me - should get current user', async () => {
    const response = await fetch(`${API_URL}/users/me`, { headers });
    expect(response.status).toBe(200);
    const user = await response.json();
    expect(user.id).toBe(1);
    expect(user.email).toBe(SUPER_USER);
  });

  test('PUT /users - should update user', async () => {
    const response = await fetch(`${API_URL}/users`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ firstName: 'Donald', lastName: 'Duck' }),
    });
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.ok).toBe(true);
  });

  test('GET /users/me - should get updated user', async () => {
    const response = await fetch(`${API_URL}/users/me`, { headers });
    expect(response.status).toBe(200);
    const user = await response.json();
    expect(user.firstName).toBe('Donald');
    expect(user.lastName).toBe('Duck');
  });

  test('/put /users - should reset user', async () => {
    const response = await fetch(`${API_URL}/users`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ firstName: 'Super', lastName: 'User' }),
    });
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.ok).toBe(true);
  });

  test('GET /users/me - should get reset user', async () => {
    const response = await fetch(`${API_URL}/users/me`, { headers });
    expect(response.status).toBe(200);
    const user = await response.json();
    expect(user.firstName).toBe('Super');
    expect(user.lastName).toBe('User');
  });

  test('GET /users/team - should get reset user', async () => {
    const response = await fetch(`${API_URL}/users/team`, { headers });
    expect(response.status).toBe(200);
    const team = await response.json();
    expect(team).toBeInstanceOf(Array);
    expect(team.find((u) => u.id === 1)).toBeTruthy();
  });
};
