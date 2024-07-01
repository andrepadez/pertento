import { verify } from 'jwt';
import { getCookie } from 'hono/cookie';

export const userAuthenticatedMiddleware = async (c, next) => {
  const session = c.get('session');
  const user = session.get('user');
  const csrf = session.get('csrf');

  if (!user) {
    c.status(401);
    return c.redirect('/auth/signin');
  }

  c.set('user', user);
  c.set('csrf', csrf);
  return next();
};
