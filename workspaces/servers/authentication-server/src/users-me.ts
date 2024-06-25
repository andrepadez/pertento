import { db, eq, Users, Passkeys } from 'pertentodb';

export const usersMe = async (c) => {
  const user = await db.query.Users.findFirst({
    where: eq(Users.id, c.user.id),
    columns: { password: false, invitedBy: false },
    with: { company: { with: { websites: true } }, passkeys: { where: eq(Passkeys.origin, c.origin) } },
  });

  return c.json({ ...user, passkeys: user.passkeys.length });
};
