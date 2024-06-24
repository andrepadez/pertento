import { db, eq, Users, Companies } from 'pertentodb';
import { sign, verify } from 'jwt';
import argon2 from 'argon2';
import * as errors from 'custom-errors';

export const resetPasswordHandler = async (c) => {
  const { password, verificationCode, status } = c.req.body;

  const userInfo = await verify(verificationCode);
  if (!userInfo) throw errors.UNAUTHORIZED();
  const passwordHash = await argon2.hash(password);
  await db
    .update(Users)
    .set({ password: passwordHash, status: status || 'Active' })
    .where(eq(Users.id, userInfo.id));

  return c.json({ ok: true });
};
