export const removeOutline = (elements) => {
  if (!elements) return;
  if (!Array.isArray(elements)) elements = [elements];
  for (let element of elements) {
    element.style.outline = '';
    if (!element.style[0]) element.removeAttribute('style');
    removeOutline(Array.from(element.children));
  }
};
