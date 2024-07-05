import { db, eq, Users, Companies } from 'pertentodb';
import { sign, verify } from 'jwt';
import argon2 from 'argon2';
import { AccountPasswordForm } from './AccountPasswordForm';

export const accountPasswordHandler = async (ctx) => {
  const { user: sessionUser } = ctx.var;
  const { oldPassword, password, confirmPassword } = await ctx.req.parseBody();
  const now = Date.now().valueOf();

  const dbUser = await db.query.Users.findFirst({
    where: eq(Users.email, sessionUser.email),
    columns: { password: true },
  });

  const isCorrectOldPassword = await argon2.verify(dbUser.password, oldPassword);
  if (!isCorrectOldPassword) {
    return ctx.html(<AccountPasswordForm user={sessionUser} error="Incorrect old password" />, 401);
  }

  const newPasswordHash = await argon2.hash(password);
  const values = { password: newPasswordHash, updatedAt: now };
  await db.update(Users).set(values).where(eq(Users.id, sessionUser.id));

  return ctx.html(<AccountPasswordForm user={sessionUser} />);
};
