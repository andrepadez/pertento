import { verify } from 'jwt';
import { getCookie } from 'hono/cookie';

export const userMiddleware = async (c, next) => {
  const authorization = getCookie(c, 'bearer_token');
  if (!authorization) {
    c.status(401);
    return c.redirect('/auth/signin');
  }

  try {
    const user = await verify(authorization);
    if (!user) {
      c.status(401);
      return c.redirect('/auth/signin');
    }
    c.user = user;
  } catch (ex) {
    c.status(401);
    return c.redirect('/auth/signin');
  }

  return next();
};
