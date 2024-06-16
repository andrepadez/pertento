import { db, eq, GanOauth } from 'pertentodb';
import { handleOauthAccountConnection } from './oauth-connections';
import { QueueManager } from 'helpers/QueueManager';
import { sendMail } from 'emailer';
import * as errors from 'custom-errors';

const queueManager = new QueueManager();

export const refreshEmailHandler = async (c) => {
  const { email } = c.body;
  console.log('refreshEmailHandler', email);

  const oauthAccount = await db.query.GanOauth.findFirst({
    where: eq(GanOauth.email, email),
  });

  if (c.user.companyId !== oauthAccount.companyId) {
    if (c.user.role !== 'Super Admin') {
      throw errors.FORBIDDEN();
    }
  }
  const added = queueManager.add({
    key: email,
    fn: async () => {
      await handleOauthAccountConnection(oauthAccount);
    },
    onSuccess: async () => {
      sendMail({
        to: c.user.email,
        subject: `Google Analytics Account ${email} is now up to date`,
        template: 'GanFinishRefresh',
        data: { email },
      });
    },
    onError: async (ex) => {
      console.log('Error refreshing GAN account', email, ex);
    },
    onResolved: async () => {
      // console.log('Resolved', email);
    },
  });

  if (added.error) {
    throw errors.createError(400, added.error);
  }

  return c.json({ ok: true });
};
