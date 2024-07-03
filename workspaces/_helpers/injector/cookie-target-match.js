import { log } from 'helpers/injector/console';

export const matchCookieTargeting = (cookie, cookieTargeting) => {
  if (!cookieTargeting || cookieTargeting.length === 0) return true;
  if (!cookie) return false;
  log('checking cookieTargeting', cookie, cookieTargeting);

  for (let targeting of cookieTargeting) {
    for (let cookieValue of targeting.cookieValues) {
      if (cookie.includes(cookieValue)) {
        return true;
      }
    }
  }

  return false;
};
