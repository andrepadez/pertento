import { expect, test, describe, beforeAll, afterAll } from 'bun:test';
import { mockUser, signin } from './helpers';
const { VITE_AUTH_URL: AUTH_URL } = process.env;

export const testInviteUser = () => {
  let verificationCode = null;
  let dbUser = null;
  const headers = {
    Authorization: ``,
  };

  test('need to sign in as the owner first', async () => {
    const response = await signin({
      email: mockUser.email,
      password: mockUser.password,
    });
    headers.Authorization = `Bearer ${response.token}`;
    dbUser = response.user;
    expect(response.token).toBeTruthy();
    expect(response.user).toBeTruthy();
  });

  test('should be able to invite a new user', async () => {
    const response = await fetch(`${AUTH_URL}/invite`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        companyId: dbUser.companyId,
        firstName: 'Invited',
        lastName: 'Test User',
        email: 'test.user+123@pertento.ai',
        role: 'Member',
        testing: true,
      }),
    });
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.verificationCode).toBeTruthy();
    verificationCode = data.verificationCode;
  });

  test('should be able to resend invitation', async () => {
    const response = await fetch(`${AUTH_URL}/resend-invite`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        email: 'test.user+123@pertento.ai',
        testing: true,
      }),
    });
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.verificationCode).toBeTruthy();
    verificationCode = data.verificationCode;
  });

  test('should be able to accept invitation', async () => {
    const response = await fetch(`${AUTH_URL}/reset-password`, {
      method: 'POST',
      body: JSON.stringify({
        verificationCode,
        password: mockUser.password,
      }),
    });
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.ok).toBe(true);
  });

  test('new user should now be able to signin', async () => {
    const response = await signin({
      email: 'test.user+123@pertento.ai',
      password: mockUser.password,
    });
    expect(response.token).toBeTruthy();
    expect(response.user).toBeTruthy();
  });

  test('should not be able to invite an existing user', async () => {
    const response = await fetch(`${AUTH_URL}/invite`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        companyId: dbUser.companyId,
        firstName: 'Invited',
        lastName: 'Test User',
        email: mockUser.email,
        role: 'Member',
        testing: true,
      }),
    });
    expect(response.status).toBe(511);
  });
};
