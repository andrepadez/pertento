import { Hono, canActOnUser } from 'hono-server';
import { db, eq, Users, Companies, Roles, Passkeys } from 'pertentodb';
const { CLIENT_URL } = process.env;

export const usersRouter = new Hono();

usersRouter.get('/me', async (c) => {
  const user = await db.query.Users.findFirst({
    where: eq(Users.id, c.user.id),
    columns: { password: false, invitedBy: false },
    with: { company: true, passkeys: true },
  });

  return c.json({ ...user, passkeys: user.passkeys.length });
});

usersRouter.put('/', async (c) => {
  await db.update(Users).set(c.body).where(eq(Users.id, c.user.id)).returning();
  return c.json({ ok: true });
});

usersRouter.put('/block/:userId', canActOnUser, async (c) => {
  const { userId } = c.req.param();
  await db.update(Users).set({ status: 'Blocked', statusBy: c.user.id }).where(eq(Users.id, userId));
  return c.json({ ok: true });
});

usersRouter.put('/unblock/:userId', canActOnUser, async (c) => {
  const { userId } = c.req.param();
  await db.update(Users).set({ status: 'Active', statusBy: c.user.id }).where(eq(Users.id, userId));
  return c.json({ ok: true });
});

usersRouter.put('/ban/:userId', canActOnUser, async (c) => {
  const { userId } = c.req.param();
  await db.update(Users).set({ status: 'Banned', statusBy: c.user.id }).where(eq(Users.id, userId));
  return c.json({ ok: true });
});

usersRouter.delete('/:userId', canActOnUser, async (c) => {
  const { userId } = c.req.param();
  await db.delete(Users).where(eq(Users.id, userId));
  return c.json({ ok: true });
});

usersRouter.get('/team/:companyId', async (c) => {
  const { companyId } = c.req.param();
  const teamMembers = await db.query.Users.findMany({
    where: eq(Users.companyId, companyId),
    columns: { password: false, invitedBy: false },
  });

  return c.json(teamMembers);
});
