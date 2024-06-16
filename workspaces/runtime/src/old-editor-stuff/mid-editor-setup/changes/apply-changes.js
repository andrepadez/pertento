import { log } from 'helpers/injector/console';
import { applyHtmlChange } from './apply-html-change';
import { getElementFromChange } from './get-element-from-change';
export * from './apply-globals';

export const applyChanges = async (changes) => {
  const body = document.body;
  const parser = new DOMParser();

  const unfoundChanges = [];

  for (let item of changes) {
    let siblingElement = null;

    if (item?.siblingElementSelector) {
      const foundDropTarget = body.querySelector(item.siblingElementSelector);
      if (foundDropTarget) {
        siblingElement = foundDropTarget;
      } else {
        siblingElement = body.querySelector(item.newSiblingElement);
      }
    }

    if (item?.originalSiblingElementSelector) {
      const originalSiblingElement = body.querySelector(item.originalSiblingElementSelector);

      if (originalSiblingElement) {
        originalSiblingElement.setAttribute('data-change-id', item.originalSiblingElement);
      }
    }

    if (item?.originalParentSelector) {
      const parentElement = body.querySelector(item.originalParentSelector);

      if (parentElement) {
        parentElement.setAttribute('data-change-id', item.originalParent);
      }
    }

    if (siblingElement) {
      siblingElement.setAttribute('data-change-id', item.siblingElement);
    }
  }

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
      applyChanges(multipleChanges);
      continue;
    }
    if (item.selector) {
      const element = getElementFromChange(item, body);

      if (!element) {
        log('apply-changes.js: Element not found', item.tagName, item);
        unfoundChanges.push(item);
        continue;
      }

      item.element = element;

      if (item.property === 'html') {
        applyHtmlChange(element, item);
        continue;
      }

      if (item.property === 'src') {
        element.src = item.value;
        continue;
      }

      if (item.property === 'textContent') {
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

        const foundedSiblingElement = body.querySelector(
          `[data-change-id="${item?.siblingElement}"]`,
        );

        if (foundedSiblingElement) {
          siblingElement = foundedSiblingElement;
        } else {
          siblingElement = body.querySelector(item.siblingElement);
        }

        if (item.action === 'after' && element) {
          siblingElement.after(element);
        } else if (item.action === 'before' && element) {
          siblingElement.before(element);
        } else if (item.action === 'append' && element) {
          siblingElement.appendChild(element);
        } else if (item.action === 'prepend' && element) {
          siblingElement.prepend(element);
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

  if (unfoundChanges.length > 0) {
    log('waiting for unfound Changes', unfoundChanges);

    const mutationObserver = new MutationObserver((mutations) => {
      log('MutationObserver fired', mutations);
      const newFoundChanges = [];
      setTimeout(() => {
        for (let i = 0; i < unfoundChanges.length; i++) {
          const change = unfoundChanges[i];
          const element = getElementFromChange(change, body);
          if (element) {
            unfoundChanges.splice(i, 1);
            newFoundChanges.push(change);
          }
        }
        if (newFoundChanges.length > 0) {
          log('newFoundChanges', newFoundChanges);
          applyChanges(body, newFoundChanges);
        }

        if (unfoundChanges.length === 0) {
          log('disconnecting MutationObserver');
          mutationObserver.disconnect();
        }
      });
    });

    mutationObserver.observe(body, {
      subtree: true,
      childList: true,
    });
  }

  return true;
};
