import { log } from 'helpers/injector/console';
import { applyHtmlChange } from './apply-html-change';
import { getElementFromChange } from './get-element-from-change';
export * from './apply-globals';

export const applyChanges = (body = document.body, changes) => {
  log('apply-changes.js: changes', changes);
  try {
    const unfoundChanges = [];

    for (let item of changes) {
      if (item.selectors) {
        const multipleChanges = [];
        for (let i = 0; i < item.selectors.length; i++) {
          const singleChange = {
            ...item,
            selectors: null,
            friendlySelectors: null,
            friendlySelectorIndexes: null,
            selector: item.selectors[i],
            friendlySelector: item.friendlySelectors[i],
            friendlySelectorIndex: item.friendlySelectorIndexes[i],
          };
          multipleChanges.push(singleChange);
        }
        applyChanges(body, multipleChanges);
        continue;
      }
      if (item.selector) {
        const element = getElementFromChange(item, body);

        if (!element) {
          log('apply-changes.js: Element not found', item.tagName, item);
          unfoundChanges.push(item);
          continue;
          //   log('apply-changes.js: Element not found, trying again');
          //   throw Error('Element not found, trying again', item.selector);
        }

        item.element = element;
        item.clone = item.clone || element.cloneNode(true);

        if (item.property === 'html') {
          applyHtmlChange(element, item);
          continue;
        }

        if (item.property === 'src') {
          element.src = item.value;
          continue;
        }

        if (item.property === 'text') {
          element.textContent = item.value;
        }

        if (item.property === 'backgroundImage') {
          element.style.backgroundImage = `url(${item.value})`;
        }
        if (item.property === 'move') {
          let dropTarget = null;
          const foundDropTarget = body.querySelector(`[data-change-id="${item.siblingElement}"]`);

          if (!foundDropTarget) {
            return;
          }

          if (item.value === 'after') {
            foundDropTarget.parentNode.insertBefore(element, foundDropTarget.nextElementSibling);
          } else {
            foundDropTarget.parentNode.insertBefore(element, foundDropTarget);
          }

          return;
        }
        if (item.property === 'reorder') {
          let siblingElement = null;

          const foundedSiblingElement = body.querySelector(`[data-change-id="${item?.siblingElement}"]`);

          if (foundedSiblingElement) {
            siblingElement = foundedSiblingElement;
          } else {
            siblingElement = body.querySelector(item.siblingElement);
          }

          if (item.action === 'after' && element) {
            siblingElement.after(element);
          } else if (item.action === 'before' && element) {
            siblingElement.before(element);
          }

          return;
        }

        if (item.property === 'moveAnywhere') {
          element.style.position = 'relative';
          element.style.left = item.left;
          element.style.top = item.top;

          return;
        } else {
          element.style[item.property] = item.value;
        }
      }
    }

    log('unfoundChanges', unfoundChanges);
    return unfoundChanges;
  } catch (ex) {
    log('apply-changes.js: Error', ex);
  }
};
