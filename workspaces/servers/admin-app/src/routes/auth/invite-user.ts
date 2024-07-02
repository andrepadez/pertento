import { db, eq, Users, Companies } from 'pertentodb';
import { sign, verify } from 'jwt';
import { sendMail } from 'emailer';
import * as errors from 'custom-errors';

const { VITE_DASHBOARD_URL } = process.env;

export const inviteUserHandler = async (ctx) => {
  const { id: invitedBy } = ctx.user;
  const now = Date.now().valueOf();
  const values = { ...ctx.req.body, status: 'Invited', invitedBy, createdAt: now, updatedAt: now };

  return db.transaction(async (tx) => {
    const existingUser = await db.query.Users.findFirst({
      where: eq(Users.email, ctx.req.body.email),
    });
    let dbUserId = null;
    if (existingUser) {
      throw errors.USER_ALREADY_EXISTS();
    } else {
      const newUser = { ...ctx.req.body, status: 'Invited', invitedBy, createdAt: now, updatedAt: now };
      await db.insert(Users).values(values);
      const dbUser = await db.query.Users.findFirst({
        where: eq(Users.email, ctx.req.body.email),
        with: { company: true, inviter: true },
      });
      const verificationCode = await sendInvite(dbUser, ctx.req.body.testing);
      return ctx.json({ ok: true, verificationCode });
    }
  });
};

export const resendInvitationHandler = async (ctx) => {
  const { email } = ctx.req.body;
  const dbUser = await db.query.Users.findFirst({
    where: eq(Users.email, ctx.req.body.email),
    with: { company: true, inviter: true },
  });
  if (!dbUser) throw errors.NOT_FOUND();
  const verificationCode = await sendInvite(dbUser, ctx.req.body.testing);
  return ctx.json({ ok: true, verificationCode });
};

const sendInvite = async (dbUser, isTesting) => {
  const { id, email, invitedBy, company, inviter } = dbUser;
  const verificationCode = await sign({ id, email }, '3d');
  const url = `${VITE_DASHBOARD_URL}/auth/accept-invitation?verificationCode=${verificationCode}`;
  const { firstName, lastName } = inviter;

  if (!isTesting) {
    await sendMail({
      to: email,
      subject: 'Invitation to Pertento.ai',
      template: 'UserInvite',
      data: { companyName: company.name, url, invitedBy: `${firstName} ${lastName}` },
    });
  }

  return verificationCode;
};
