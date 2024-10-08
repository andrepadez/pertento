import { db, eq, Users, Companies } from 'pertentodb';
import { sign, verify } from 'jwt';
import argon2 from 'argon2';
import * as errors from 'custom-errors';

export const verifyHandler = async (ctx) => {
  const { verificationCode } = ctx.req.body;

  const userInfo = await verify(verificationCode);
  if (!userInfo) throw errors.BAD_REQUEST();

  await db.update(Users).set({ status: 'Prospect' }).where(eq(Users.id, userInfo.id));

  return ctx.json({ ok: true });
};
