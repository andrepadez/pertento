export const applyUndo = (element, item) => {
  if (item.property === 'html') {
    if (item.action !== 'replace') {
      item.undoElement.remove();
      return;
    }
  }
  element.replaceWith(item.clone);
};

export const applyRedo = (element, item) => {
  if (item.property === 'html') {
    const parser = new DOMParser();
    const newElement = parser.parseFromString(item.value, 'text/html').body.firstChild;

    if (item.action === 'before') {
      item.undoElement = newElement;
      element.before(newElement);
      return;
    }
    if (item.action === 'after') {
      item.undoElement = newElement;
      element.after(newElement);
      return;
    }
    if (item.action === 'append') {
      element.append(newElement);
      return;
    }
    if (item.action === 'insert') {
      item.undoElement = newElement;
      element.insertBefore(newElement, element.firstChild);
      return;
    }
  }
  element.replaceWith(item.clone);
};
