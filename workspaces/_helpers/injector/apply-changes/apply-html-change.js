import { log } from 'helpers/injector/console';

export const applyHtmlChange = (element, item) => {
  try {
    if (element.tagName.toLowerCase() === 'img') {
      log('applyHtmlChange', element, item);
    }

    const parser = new DOMParser();
    const newElement = parser.parseFromString(item.value, 'text/html').body.firstChild;

    if (item.action === 'replace') {
      element.replaceWith(newElement);
    } else {
      item.undoElement = newElement;
      if (item.action === 'after') {
        element.after(newElement);
      } else if (item.action === 'before') {
        element.before(newElement);
      } else if (item.action === 'append') {
        element.append(newElement);
      } else if (item.action === 'insert') {
        element.insertBefore(newElement, element.firstChild);
      }
    }
  } catch (error) {
    log('applyHtmlChange error', error);
  }
};
