import path from 'node:path';
import { exists, unlink } from 'node:fs/promises';
import { Users, db, eq } from 'pertentodb';
import { AccountInfoForm } from './AccountInfoForm';
import { UserDropdown } from '../../_layout/Header/UserDropdown';
const avatarsPath = path.resolve(__dirname, '../../../..', 'public');

export const accountInfoHandler = async (ctx) => {
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

    return ctx.html(
      <>
        <UserDropdown ctx={ctx} user={sessionUser} hx-swap-oob="outerHTML:#user-dropdown" />
        <AccountInfoForm user={ctx.get('user')} />
      </>,
    );
  });
};
