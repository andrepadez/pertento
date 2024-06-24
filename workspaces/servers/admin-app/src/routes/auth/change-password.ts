import { db, eq, Users, Companies } from 'pertentodb';
import { sign, verify } from 'jwt';
import argon2 from 'argon2';
import * as errors from 'custom-errors';

export const changePasswordHandler = async (c) => {
  const now = Date.now().valueOf();
  const { password, newPassword } = c.req.body;

  const dbUser = await db.query.Users.findFirst({
    where: eq(Users.id, c.user.id),
    columns: { password: true },
  });

  const isCorrectOldPassword = await argon2.verify(dbUser.password, password);
  if (!isCorrectOldPassword) {
    throw errors.createError(403, 'Incorrect old password');
  }

  const newPasswordHash = await argon2.hash(newPassword);
  const values = { password: newPasswordHash, updatedAt: now };
  await db.update(Users).set(values).where(eq(Users.id, c.user.id));

  return c.json({ ok: true });
};
