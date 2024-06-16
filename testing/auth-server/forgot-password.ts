import { expect, test } from 'bun:test';
import { mockUser, signin } from './helpers';
const { VITE_AUTH_URL: AUTH_URL } = process.env;

export const testForgotPassword = () => {
  let verificationCode = null;

  test('should get verification code', async () => {
    const response = await fetch(`${AUTH_URL}/forgot-password`, {
      method: 'POST',
      body: JSON.stringify({ email: mockUser.email, testing: true }),
    });
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.verificationCode).toBeTruthy();
    verificationCode = data.verificationCode;
  });

  test('should not be able to reset with wrong verification code', async () => {
    const response = await fetch(`${AUTH_URL}/reset-password`, {
      method: 'POST',
      body: JSON.stringify({
        verificationCode: 'WRONG_VERIFICATION_CODE',
        password: 'NEW_PASSWORD',
        testing: true,
      }),
    });
    expect(response.status).toBe(401);
  });

  test('should reset password with correct verification code', async () => {
    const response = await fetch(`${AUTH_URL}/reset-password`, {
      method: 'POST',
      body: JSON.stringify({
        verificationCode,
        password: mockUser.password + '123',
        testing: true,
      }),
    });
    expect(response.status).toBe(200);
  });

  test('should not be able to signin with old password', async () => {
    const response = await signin({
      email: mockUser.email,
      password: mockUser.password,
      testing: true,
    });
    expect(response.status).toBe(401);
  });

  test('should be able to signin with new password', async () => {
    const response = await signin({
      email: mockUser.email,
      password: mockUser.password + '123',
      testing: true,
    });
    expect(response.token).toBeTruthy(200);
  });

  test('should revert to original password', async () => {
    const res1 = await fetch(`${AUTH_URL}/forgot-password`, {
      method: 'POST',
      body: JSON.stringify({ email: mockUser.email, testing: true }),
    });
    const { verificationCode } = await res1.json();

    const res2 = await fetch(`${AUTH_URL}/reset-password`, {
      method: 'POST',
      body: JSON.stringify({
        verificationCode,
        password: mockUser.password,
        testing: true,
      }),
    });

    const signedIn = await signin(mockUser);
    expect(signedIn.token).toBeTruthy();
  });
};
