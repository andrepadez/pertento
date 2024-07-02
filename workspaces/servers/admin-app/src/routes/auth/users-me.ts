import { db, eq, Users, Passkeys } from 'pertentodb';

export const usersMe = async (ctx) => {
  const user = await db.query.Users.findFirst({
    where: eq(Users.id, ctx.user.id),
    columns: { password: false, invitedBy: false },
    with: { company: true, passkeys: { where: eq(Passkeys.origin, c.origin) } },
  });

  return ctx.json({ ...user, passkeys: user.passkeys.length });
};
