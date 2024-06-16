import { getSelector, getFriendlySelector } from 'helpers/injector/get-selector';
import { sendMessage } from '../send-message';

export const selectedElements = [];

export const addOrRemoveElement = (element) => {
  clearOutlined();
  const index = selectedElements.findIndex((el) => el.element === element);
  if (index > -1) {
    selectedElements.splice(index, 1);
  } else {
    selectedElements.push(elementMapper(element));
  }
  updateOutlined();
  notifySelectedElementsChanged();
};

export const setElements = (elems) => {
  clearOutlined();
  selectedElements.length = 0;
  selectedElements.push(...elems.map(elementMapper));
  updateOutlined();
  notifySelectedElementsChanged();
};

export const selectByChange = (change) => {
  const { selectors, selector, friendlySelector, friendlySelectorIndex } = change;
  if (selectors) {
    const elements = selectors.map((selector, index) => {
      const element = document.querySelector(selector);
      return element;
    });
    setElements(elements);
  } else {
    const element =
      document.querySelector(selector) || document.querySelectorAll(friendlySelector)[friendlySelectorIndex];
    setElements([element]);
  }
};

export const clearElements = () => {
  clearOutlined();
  selectedElements.length = 0;
  notifySelectedElementsChanged();
};

export const selectHierarchyMember = ({ index }) => {
  const [elem] = selectedElements;
  const member = elem.hierarchy[index];
  const element = document.querySelector(member.selector);
  clearOutlined();
  updateOutlined(element);
};

const notifySelectedElementsChanged = () => {
  const elements = selectedElements.map(elementCleaner);
  sendMessage('PERTENTO_SELECTED_ELEMENTS', { elements });
};

export const updateOutlined = (element) => {
  if (element) {
    element.classList.add('pertento-editor-selected');
    return;
  }
  for (let elem of selectedElements) {
    elem?.element?.classList.add('pertento-editor-selected');
  }
};

export const clearOutlined = () => {
  for (let elem of selectedElements) {
    elem?.element?.classList.remove('pertento-editor-selected');
  }

  if (selectedElements.length === 1) {
    const [elem] = selectedElements;
    if (elem?.hierarchy) {
      for (let member of elem.hierarchy) {
        member.element.classList.remove('pertento-editor-selected');
      }
    }
  }
};

export const elementCleaner = (element) => {
  const newElement = { ...element };
  delete newElement.element;
  const newHierarchy = [];
  if (element?.hierarchy) {
    for (let elem of element.hierarchy) {
      const newHierarchyElement = { ...elem };
      delete newHierarchyElement.element;
      newHierarchy.push(newHierarchyElement);
    }
  }
  newElement.hierarchy = newHierarchy;
  return newElement;
};

export const elementMapper = (element) => {
  console.log('elementMapper', element);
  if (!element) return;
  const body = document.body;
  const dims = element.getBoundingClientRect();
  const friendlySelector = getFriendlySelector(element);
  const foundElements = Array.from(body.querySelectorAll(friendlySelector));
  const friendlySelectorIndex = foundElements.indexOf(element);
  const clone = getCleanClone(element);
  const outerHTML = clone.outerHTML;
  const hierarchy = getHierarchy(element);

  return {
    element,
    dims,
    tagName: element.tagName,
    selector: getSelector(element),
    friendlySelector,
    friendlySelectorIndex,
    hierarchy,
    outerHTML,
  };
};

const getHierarchy = (element) => {
  const hierarchy = [];
  let currentElement = element;
  while (currentElement && currentElement.tagName !== 'HTML') {
    const friendlySelector = getFriendlySelector(currentElement);
    const foundElements = Array.from(document.body.querySelectorAll(friendlySelector));
    const friendlySelectorIndex = foundElements.indexOf(currentElement);
    const clone = getCleanClone(currentElement);
    const outerHTML = clone.outerHTML;

    hierarchy.unshift({
      element: currentElement,
      dims: currentElement.getBoundingClientRect(),
      tagName: currentElement.tagName,
      selector: getSelector(currentElement),
      friendlySelector,
      friendlySelectorIndex,
      outerHTML,
    });
    currentElement = currentElement.parentNode;
  }
  return hierarchy;
};

const getCleanClone = (element, deep = 0) => {
  const clone = deep === 0 ? element : element.cloneNode(true);
  clone.classList.remove('pertento-editor-selected');
  clone.style.removeProperty('outline');
  if (clone.style.cssText === '') {
    clone.removeAttribute('style');
  }
  const children = Array.from(clone.children);
  for (let child of children) {
    getCleanClone(child, ++deep);
  }
  return clone;
};
