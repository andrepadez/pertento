import { log } from 'helpers/injector/console';

const spaceRegex = /\s+/g;
const endDotRegex = /\.$/;
const doubleDotRegex = /\.+/g;

export const getFriendlySelector = (element) => {
  if (!element) return null;
  if (element.tagName.toLowerCase() == 'body') return 'body';
  let str = element.tagName.toLowerCase();

  if (element.className && element.className.split) {
    let classes = element.className.split(spaceRegex);
    for (let i = 0; i < classes.length; i++) {
      if (classes[i].trim().length > 0) {
        if (classes[i].indexOf(':') === -1 && classes[i].indexOf('[') === -1) {
          str += '.' + classes[i];
        }
      }
    }
    str = str.replace(endDotRegex, '').replace(doubleDotRegex, '.');
  }

  const id = element.getAttribute('id');
  str += !!id ? '#' + id : '';

  return getFriendlySelector(element.parentNode) + ' > ' + str;
};

export const getSelector = (element) => {
  if (!element || element === document.documentElement) {
    return '';
  }

  var selector = '';

  if (element.tagName) {
    selector = element.tagName;
  }

  if (element.parentNode) {
    var index = Array.from(element.parentNode.children).indexOf(element) + 1;
    selector += ':nth-child(' + index + ')';
  }

  var parentSelector = getSelector(element.parentNode);
  if (parentSelector) {
    selector = parentSelector + '>' + selector;
  }

  return selector.trim();
};
