import { expect, test, describe, afterAll } from 'bun:test';
import { mockUser, signin } from './helpers';
const { VITE_AUTH_URL: AUTH_URL } = process.env;

export const testSignin = () => {
  test('should return 401 with wrong email', async () => {
    const response = await signin({
      email: 'wrong.user@gmail.com',
      password: mockUser.password,
    });
    expect(response.status).toBe(401);
  });

  test('should return 401 with wrong password', async () => {
    const response = await signin({
      email: mockUser.email,
      password: 'WRONG_PASSWORD',
    });
    expect(response.status).toBe(401);
  });

  test('should signin with right credentials', async () => {
    const response = await signin({
      email: mockUser.email,
      password: mockUser.password,
    });
    const { token } = response;
    expect(token).toBeTruthy();
  });
};
