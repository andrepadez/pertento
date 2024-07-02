import { verify } from 'jwt';
import { getCookie } from 'hono/cookie';

export const userAuthenticatedMiddleware = async (ctx, next) => {
  const session = ctx.get('session');
  const user = session.get('user');
  const csrf = session.get('csrf');

  if (!user) {
    ctx.status(401);
    return ctx.redirect('/auth/signin');
  }

  ctx.set('user', user);
  ctx.set('csrf', csrf);
  return next();
};
