import { db, eq, Users, Companies } from 'pertentodb';
import { sign, verify } from 'jwt';
import argon2 from 'argon2';
import { sendMail } from 'emailer';

const { VITE_DASHBOARD_URL } = process.env;

export const signupHandler = async (ctx) => {
  const now = Date.now().valueOf();
  const newUser = {
    ...ctx.req.body,
    password: await argon2.hash(ctx.req.body.password),
    status: 'Unverified',
    role: 'Owner',
    createdAt: now,
    updatedAt: now,
  };

  const [{ dbUserId }] = await db.insert(Users).values(newUser).returning({ dbUserId: Users.id });
  const { companyName: name, companyType: type } = ctx.req.body;
  const newCompany = { name, type, createdAt: now, updatedAt: now };
  newCompany.parentCompanyId = 0;
  newCompany.ganAccountId = 0;
  newCompany.createdBy = dbUserId;

  const [{ companyId }] = await db.insert(Companies).values(newCompany).returning({ companyId: Companies.id });
  await db.update(Users).set({ companyId }).where(eq(Users.id, dbUserId));

  const verificationCode = await sign({ id: dbUserId, email: newUser.email }, '3d');

  const url = `${VITE_DASHBOARD_URL}/auth/verify?verificationCode=${verificationCode}`;

  if (!ctx.req.body.testing) {
    sendMail({
      to: newUser.email,
      subject: 'Email Confirmation - Pertento.ai',
      template: 'VerifyRegistration',
      data: { url, ...newUser },
    });
  }

  const user = await db.query.Users.findFirst({
    where: eq(Users.email, newUser.email),
  });

  return ctx.json({ ok: true, verificationCode, user });
};
