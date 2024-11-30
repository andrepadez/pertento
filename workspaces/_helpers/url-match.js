import { log } from 'helpers/injector/console';

export const checkUrlTargeting = function (urlTargeting, url) {
  const pageUrl = (url || window.location.href).replace(/\/$/, '');
  let hasHitTargetUrl = urlTargeting.length === 0;
  let reason = null;

  for (let target of urlTargeting) {
    const targetUrl = target.url.replace(/\/$/, '');
    if (target.condition === 'does not contain') {
      if (pageUrl.indexOf(targetUrl) > -1) {
        hasHitTargetUrl = false;
        return false;
      } else {
        hasHitTargetUrl = true;
      }
    }

    if (target.condition === 'matches regex') {
      hasHitTargetUrl = testRegex(targetUrl, pageUrl);
    }

    if (target.condition === 'starts with') {
      if ((pageUrl + '/').indexOf(targetUrl) === 0) {
        hasHitTargetUrl = true;
      }
    }

    if (target.condition === 'contains') {
      if (pageUrl.indexOf(targetUrl) > -1) {
        hasHitTargetUrl = true;
      }
    }

    if (target.condition === 'ends with') {
      if (pageUrl.endsWith(targetUrl)) {
        hasHitTargetUrl = true;
      }
    }

    if (target.condition === 'not equals') {
      if (pageUrl !== targetUrl) {
        hasHitTargetUrl = true;
      }
    }

    if (target.condition === 'equals') {
      if (pageUrl === targetUrl) {
        hasHitTargetUrl = true;
        return true;
      }
    }
  }
  return hasHitTargetUrl;
};

export const testRegex = (regexStr, url) => {
  const regex = new RegExp(regexStr.replace(/^\//, '').replace(/\/$/, ''));
  return regex.test(url);
};

['equals', 'starts with', 'contains', 'ends with', 'matches regex', 'not equals', 'does not contain'];
