import { expect, test, describe, beforeAll, afterAll } from 'bun:test';
import { db, eq, Users, Companies } from 'pertentodb';
import { mockUser, createUser } from './helpers';
import { testSignup } from './signup';
import { testSignin } from './signin';
import { testInviteUser } from './invite-user';
import { testForgotPassword } from './forgot-password';
const { VITE_AUTH_URL: AUTH_URL } = process.env;

describe('Auth Server', () => {
  let dbUser = null;
  let verificationCode = null;

  beforeAll(async () => {
    try {
      await db.delete(Users).where(eq(Users.email, 'test.user+123@pertento.ai'));
      await db.delete(Users).where(eq(Users.email, mockUser.email));
      await db.delete(Companies).where(eq(Companies.name, mockUser.companyName));
      const data = await createUser(mockUser);
      dbUser = data.user;
      verificationCode = data.verificationCode;
    } catch (ex) {
      console.log(ex);
      throw new Error('Failed to create user');
    }
  });

  describe(`it's alive`, () => {
    test('should return 200', async () => {
      const response = await fetch(AUTH_URL);
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.pertentoAuthenticationServer).toBeTruthy();
    });
  });

  describe('Signin', () => {
    testSignup(verificationCode);
  });

  describe('Signup', async () => {
    testSignin();
  });

  describe('Forgot Password', () => {
    testForgotPassword();
  });

  describe('Invite User', () => {
    testInviteUser();
  });

  afterAll(async () => {
    try {
      await db.delete(Users).where(eq(Users.id, dbUser.id));
      await db.delete(Users).where(eq(Users.email, 'test.user+123@pertento.ai'));
      await db.delete(Companies).where(eq(Companies.id, dbUser.companyId));
    } catch (ex) {
      throw new Error('Failed to delete user');
    }
  });
});
