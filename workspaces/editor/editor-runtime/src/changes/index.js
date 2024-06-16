export * from './apply-globals';
import { applyChanges as applyTheChanges } from './apply-changes';
import { selectedElements, elementCleaner } from '../interactivity/selected-elements';
import { setElements, elementMapper } from '../interactivity/selected-elements';
import { getElementFromChange } from './get-element-from-change';

const theChanges = [];
const undoneChanges = [];

export const addChangeToMultiple = ({ change, isLastChange }) => {
  const lastChange = theChanges.at(-1);
  const { property, value, action, selectors } = change;
  change.prevValues = [];
  for (let i = 0; i < selectors.length; i++) {
    const element = document.querySelector(selectors[i]);
    if (!element) continue;
    const prevValue = isLastChange
      ? lastChange.prevValues[i]
      : ['src', 'textContent'].includes(property)
        ? element[property]
        : getComputedStyle(element)[property];

    getComputedStyle(element)[property];
    change.prevValues.push(prevValue);
  }

  applyTheChanges([change]);

  if (isLastChange) {
    theChanges.splice(-1, 1, change);
  } else {
    theChanges.push(change);
  }
};

export const addChange = ({ change, isLastChange }) => {
  const { property, value, action } = change;

  if (change.selectors) {
    return addChangeToMultiple({ change, isLastChange });
  }

  const element = getElementFromChange(change);
  if (!element) return;
  let prevValue = ['src', 'textContent'].includes(property) ? element[property] : getComputedStyle(element)[property];

  if (change.property === 'html') {
    prevValue = element.outerHTML;
  }

  const newChange = { ...change, ...elementMapper(element) };
  const lastChange = theChanges.at(-1);

  if (isLastChange) {
    newChange.prevValue = lastChange.prevValue;
    theChanges.splice(-1, 1, newChange);
  } else {
    newChange.prevValue = prevValue;
    theChanges.push(newChange);
  }

  applyTheChanges([newChange]);
};

export const removeChangeMultiple = (index) => {
  const change = theChanges.at(index);
  const { property, prevValues } = change;
  const multipleChanges = [];
  for (let i = 0; i < change.selectors.length; i++) {
    multipleChanges.push({
      property,
      value: prevValues[i],
      selector: change.selectors[i],
      friendlySelector: change.friendlySelectors[i],
      friendlySelectorIndex: change.friendlySelectorIndexes[i],
    });
  }

  applyTheChanges(multipleChanges);
  theChanges.splice(index, 1);
};

export const undoChange = () => {
  const index = theChanges.length - 1;
  if (theChanges[index]) {
    const change = theChanges[index];
    undoneChanges.push(change);
    removeChange(index);
  }
};

export const redoChange = () => {
  const change = undoneChanges.pop();
  if (change) {
    theChanges.push(change);
    applyTheChanges([change]);
  }
};

export const removeChange = (index) => {
  const change = theChanges.at(index);
  if (change.selectors) {
    return removeChangeMultiple(index);
  }
  const { property, value, prevValue, element, action } = change;
  if (property === 'html' && action !== 'replace') {
    removeHTMLChange(element, change);
  } else {
    const newChange = { ...change, value: prevValue, prevValue: value, element };
    applyTheChanges([newChange]);
  }
  theChanges.splice(index, 1);
};

const removeHTMLChange = (element, change) => {
  const { action } = change;
  if (action === 'before') element.previousElementSibling.remove();
  if (action === 'after') element.nextElementSibling.remove();
  if (action === 'prepend') element.firstChild.remove();
  if (action === 'append') element.lastChild.remove();
};
