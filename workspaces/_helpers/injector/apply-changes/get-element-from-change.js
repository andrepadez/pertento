import { log } from 'helpers/injector/console';

export const getElementFromChange = (change, body = document.body) => {
  try {
    let element = body.querySelector(change.selector);
    if (element) {
      log('found element from selector', element);
      return element;
    }

    if (!change.friendlySelector) return null;
    try {
      const elements = body.querySelectorAll(change.friendlySelector);
      if (elements.length === 1) {
        log('found element from friendly selector', elements[0]);
        return elements[0];
      }
      if (elements.length > 1) {
        log('found more than one element, looking for index', change.friendlySelectorIndex);
        if (elements[change.friendlySelectorIndex]) {
          log('found friendlySelector index', change.friendlySelectorIndex);
          return elements[change.friendlySelectorIndex];
        }
      }
    } catch (ex) {
      log('error getting element from friendly selector', ex);
    }
  } catch (ex) {
    log('error getElementFromChange', ex);
  }
  return null;
};
