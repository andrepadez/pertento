import { verify } from 'jwt';
import { getCookie } from 'hono/cookie';

export const userMiddleware = async (c, next) => {
  const bearerToken = getCookie(c, 'bearer_token');
  if (!bearerToken) {
    c.status(401);
    return c.redirect('/auth/signin');
  }

  try {
    const user = await verify(bearerToken);
    if (!user) {
      c.status(401);
      return c.redirect('/auth/signin');
    }
    c.set('token', bearerToken);
    c.set('user', user);
  } catch (ex) {
    c.status(401);
    return c.redirect('/auth/signin');
  }

  return next();
};
