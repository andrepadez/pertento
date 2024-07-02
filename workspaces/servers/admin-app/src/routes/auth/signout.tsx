import { getCookie, getSignedCookie, setCookie, setSignedCookie, deleteCookie } from 'hono/cookie';

export const authSignoutHandler = async (ctx) => {
  ctx.get('session').deleteSession();
  return ctx.redirect('/auth/signin');
};
