import { getCookie, getSignedCookie, setCookie, setSignedCookie, deleteCookie } from 'hono/cookie';

export const authSignoutHandler = async (c) => {
  deleteCookie(c, 'bearer_token');
  return c.redirect('/auth/signin');
};
