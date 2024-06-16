import { db, eq, Users, Companies } from 'pertentodb';
import { sign, verify } from 'jwt';
import { sendMail } from 'emailer';
const { VITE_DASHBOARD_URL } = process.env;

export const forgotPasswordHandler = async (c) => {
  const { email, testing } = c.body;
  const dbUser = await db.query.Users.findFirst({ where: eq(Users.email, email) });
  if (!dbUser) return c.json({ ok: true });
  const verificationCode = await sign({ id: dbUser.id, email }, '6h');
  const url = `${VITE_DASHBOARD_URL}/auth/reset-password?verificationCode=${verificationCode}`;

  if (!testing) {
    sendMail({
      to: email,
      subject: 'Password Reset Request',
      template: 'ForgotPassword',
      data: { email, url },
    });
  }

  return c.json({ verificationCode });
};
