import { Stripe } from 'stripe';
import { db, eq, Users, Companies, Subscriptions } from 'pertentodb';
import { sign, verify } from 'jwt';
import argon2 from 'argon2';
import { sendMail } from 'emailer';

const { VITE_DASHBOARD_URL, STRIPE_SECRET_KEY } = process.env;

const stripe = new Stripe(STRIPE_SECRET_KEY);

export const signupHandler = async (c) => {
  return db.transaction(async (tx) => {
    const now = Date.now().valueOf();
    const newUser = {
      ...c.req.body,
      password: await argon2.hash(c.req.body.password),
      status: 'Unverified',
      role: 'Owner',
      createdAt: now,
      updatedAt: now,
    };

    const [{ dbUserId }] = await tx.insert(Users).values(newUser).returning({ dbUserId: Users.id });
    const { companyName: name, companyType: type } = c.req.body;
    const newCompany = { name, type, createdAt: now, updatedAt: now };
    newCompany.friendlyName = name;
    newCompany.parentCompanyId = 0;
    newCompany.ganAccountId = 0;
    newCompany.createdBy = dbUserId;

    const [{ companyId }] = await tx.insert(Companies).values(newCompany).returning({ companyId: Companies.id });
    await tx.update(Users).set({ companyId }).where(eq(Users.id, dbUserId));

    const stripeCustomer = await stripe.customers.create({
      email: newUser.email,
      name,
      metadata: {
        companyId,
      },
    });

    await tx.insert(Subscriptions).values({
      companyId,
      customerId: stripeCustomer.id,
      email: newUser.email,
    });

    const verificationCode = await sign({ id: dbUserId, email: newUser.email }, '3d');

    const url = `${VITE_DASHBOARD_URL}/auth/verify?verificationCode=${verificationCode}`;

    if (!c.req.body.testing) {
      sendMail({
        to: newUser.email,
        subject: 'Email Confirmation - Pertento.ai',
        template: 'VerifyRegistration',
        data: { url, ...newUser },
      });
    }

    const user = await tx.query.Users.findFirst({
      where: eq(Users.email, newUser.email),
    });

    return c.json({ ok: true, verificationCode, user });
  });
};
