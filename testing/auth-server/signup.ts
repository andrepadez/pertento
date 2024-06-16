import { expect, test, describe } from 'bun:test';
import { mockUser } from './helpers';
import { db, eq, Users, Companies } from 'pertentodb';
const { VITE_AUTH_URL: AUTH_URL } = process.env;

export const testSignup = (verificationCode) => {
  let dbUser = null;
  test('user should exist in the database', async () => {
    const user = await db.query.Users.findFirst({
      where: eq(Users.email, mockUser.email),
    });
    expect(user).toBeTruthy();
    expect(user.role).toBe('Owner');
    expect(user.status).toBe('Unverified');
    dbUser = user;
  });

  test('correct company should have been created', async () => {
    const company = await db.query.Companies.findFirst({
      where: eq(Companies.id, dbUser.companyId),
    });
    expect(company).toBeTruthy();
  });

  test('verification process should be working', async () => {
    const response = await fetch(`${AUTH_URL}/verify`, {
      method: 'POST',
      body: JSON.stringify({ verificationCode }),
    });
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.ok).toBeTruthy();

    const user = await db.query.Users.findFirst({
      where: eq(Users.id, dbUser.id),
    });
    expect(user.status).toBe('Prospect');

    // TODO: this should be an api call from an admin to activate user
    const [updatedUser] = await db.update(Users).set({ status: 'Active' }).where(eq(Users.id, dbUser.id)).returning();
    expect(updatedUser.status).toBe('Active');
  });
};
