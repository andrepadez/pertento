import { log } from 'helpers/injector/console';

export const matchCookieTargeting = (cookie, cookieTargeting) => {
  log('checking cookieTargeting', cookie, cookieTargeting);
  if (!cookieTargeting || cookieTargeting.length === 0) return true;
  if (!cookie) return false;

  for (let targeting of cookieTargeting) {
    for (let cookieValue of cookieTargeting.cookieValues) {
      if (cookie.includes(cookieValue)) {
        return true;
      }
    }
  }

  return false;
};
