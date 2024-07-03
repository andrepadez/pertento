export const matchCookieTargeting = (cookie, cookieTargeting) => {
  console.log(checkingCookieTargeting, cookie, cookieTargeting);
  if (!cookieTargeting || cookieTargeting.length === 0) return true;
  if (!cookie) return false;

  for (let targeting of cookieTargeting) {
    if (cookie.includes(cookieTargeting.cookieValues)) {
      return true;
    }
  }

  return false;
};
