import { Card } from '@/Components/Card';
import { Hono } from 'hono-server';
import { exists, unlink } from 'node:fs/promises';
import path from 'node:path';
import { Users, db, eq } from 'pertentodb';
import { UserDropdown } from '../_layout/Header/UserDropdown';
import { AccountForm } from './AccountForm';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const accountRouter = new Hono();
const avatarsPath = path.resolve(__dirname, '../../../..', 'public');

accountRouter.get('/', async (ctx) => {
  const { user } = ctx.var;
  return ctx.render(
    <div class="grid gap-3">
      <h1 class="">Account</h1>
      <Card class="grid grid-cols-2 p-5">
        <div class="flex-1">
          <h3>Settings</h3>
        </div>
        <AccountForm user={user} />
      </Card>
    </div>,
  );
});

accountRouter.put('/', async (ctx) => {
  return db.transaction(async (tx) => {
    const { avatar, firstName, lastName } = await ctx.req.parseBody();
    const session = ctx.get('session');
    const sessionUser = session.get('user');
    const dbValues = { firstName, lastName };

    if (avatar) {
      const fileName = `/user-avatars/${crypto.randomUUID()}.${avatar.type.split('/')[1]}`;
      await Bun.write(`public/${fileName}`, avatar);

      const oldAvatar = sessionUser.avatar;
      if (oldAvatar) {
        const oldFilename = oldAvatar.slice(1);
        const oldAvatarPath = path.resolve(avatarsPath, oldFilename);
        const avatarExists = await exists(oldAvatarPath);
        if (avatarExists) await unlink(oldAvatarPath);
        dbValues.avatar = fileName;
      }
      sessionUser.avatar = fileName;
    }

    await tx.update(Users).set(dbValues).where(eq(Users.id, sessionUser.id));

    sessionUser.firstName = firstName;
    sessionUser.lastName = lastName;
    session.set('user', { ...sessionUser });
    ctx.set('user', { ...sessionUser });

    await wait(3000);

    return ctx.html(
      <>
        <UserDropdown ctx={ctx} user={sessionUser} hx-swap-oob="outerHTML:#user-dropdown" />
        <AccountForm user={ctx.get('user')} />
      </>,
    );
  });
});
