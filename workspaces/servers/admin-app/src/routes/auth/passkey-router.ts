import { Hono, userMiddleware } from 'hono-server';
import { sign } from 'jwt';
import { createChallenge, hexToString } from 'helpers/passkeys';
import { db, eq, and, Passkeys, Users } from 'pertentodb';
import * as errors from 'custom-errors';

export const passkeyRouter = new Hono();

let currentChallenges = {};

passkeyRouter.post('/challenge/:email', async (ctx) => {
  const { email } = ctx.req.param();
  const challenge = createChallenge();
  currentChallenges = { ...currentChallenges, [email]: challenge };
  return ctx.json({ challenge });
});

passkeyRouter.post('/credentials', userMiddleware, async (c) => {
  const { email } = ctx.user;
  const { challenge, credentialId, publicKey } = ctx.req.body;
  if (hexToString(challenge) !== hexToString(currentChallenges[email])) throw errors.BAD_CREDENTIALS();
  delete currentChallenges[email];
  const values = { email, credentialId, publicKey, origin: ctx.origin };
  const [passkey] = await db.insert(Passkeys).values(values).returning();
  return ctx.json({ ok: true });
});

passkeyRouter.get('/signin/:email', async (ctx) => {
  const { email } = ctx.req.param();
  const challenge = createChallenge();
  currentChallenges = { ...currentChallenges, [email]: challenge };
  const passkeys = await db.query.Passkeys.findMany({
    where: and(eq(Passkeys.email, email), eq(Passkeys.origin, ctx.origin)),
  });

  const credentialIds = passkeys.map((p) => p.credentialId);
  return ctx.json({ challenge, credentialIds });
});

passkeyRouter.post('/verify/:email', async (ctx) => {
  const { email } = ctx.req.param();
  const { credentialId, challenge } = ctx.req.body;
  if (hexToString(challenge) !== hexToString(currentChallenges[email])) throw errors.BAD_CREDENTIALS();
  delete currentChallenges[email];
  const dbPasskeys = await db.query.Passkeys.findMany({
    where: eq(Passkeys.email, email),
  });
  if (!dbPasskeys.find((p) => p.credentialId === credentialId)) throw errors.BAD_CREDENTIALS();

  const dbUser = await db.query.Users.findFirst({
    where: eq(Users.email, email),
    with: { passkeys: true },
  });

  const { id, companyId, parentCompanyId, firstName, lastName, role } = dbUser;
  const passkeys = dbUser.passkeys.length;
  const token = await sign({ id, email, companyId, parentCompanyId, firstName, lastName, role, passkeys });
  return ctx.json({ token, user: { id, email, companyId, parentCompanyId, firstName, lastName, role, passkeys } });

  return ctx.json({ email });
});
