import { db, eq, and, Users, Passkeys } from 'pertentodb';
import { sign } from 'jwt';
import { createChallenge, hexToString } from 'helpers/passkeys';
import argon2 from 'argon2';
import * as errors from 'custom-errors';

export const signinHandler = async (c) => {
  const { email, password } = c.req.body;
  const dbUser = await db.query.Users.findFirst({
    where: eq(Users.email, email),
  });

  const passkeys = await db.query.Passkeys.findMany({
    where: and(eq(Passkeys.email, email), eq(Passkeys.origin, c.origin)),
  });

  if (!dbUser) throw errors.UNAUTHORIZED();
  const { status } = dbUser;
  if (status !== 'Active') throw errors.UNAUTHORIZED();
  const isValidPassword = await argon2.verify(dbUser.password, password);
  if (!isValidPassword) throw errors.UNAUTHORIZED();

  const { id, companyId, parentCompanyId, firstName, lastName, role } = dbUser;

  const tokenUser = { id, email, companyId, parentCompanyId, firstName, lastName, role, passkeys: passkeys.length };

  if (passkeys.length > 0 && !c.origin.startsWith('chrome-extension://')) {
    return c.json({ user: tokenUser });
  }

  const token = await sign(tokenUser);

  if (c.origin.startsWith('chrome-extension://')) {
    console.log('token', token);
  }

  return c.json({ token, user: tokenUser });
};
