import { Hono } from 'hono-server';
import { Card } from '@/Components/Card';
import { accountInfoHandler, AccountInfoForm } from './AccountInfo';
import { accountPasswordHandler, AccountPasswordForm } from './AccountPassword';

export const accountRouter = new Hono();

accountRouter.get('/', async (ctx) => {
  const { user } = ctx.var;
  return ctx.render(
    <div class="grid gap-5">
      <h1 class="">Account</h1>
      <Card class="grid grid-cols-1 p-5 lg:grid-cols-2">
        <h3 class="mb-3">Settings</h3>
        <AccountInfoForm user={user} />
      </Card>
      <Card class="grid grid-cols-1 p-5 lg:grid-cols-2">
        <h3 class="mb-3">Change Password</h3>
        <AccountPasswordForm user={user} />
      </Card>
    </div>,
  );
});

accountRouter.put('/', accountInfoHandler);
accountRouter.put('/password', accountPasswordHandler);
