import { getCookie, getSignedCookie, setCookie, setSignedCookie, deleteCookie } from 'hono/cookie';

export const authSignoutHandler = async (c) => {
  c.get('session').deleteSession();
  return c.redirect('/auth/signin');
};
