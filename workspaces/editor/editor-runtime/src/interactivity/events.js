import { selectedElements, setElements, addOrRemoveElement } from './selected-elements';
import { sendMessage } from '../send-message';
let currentHovered = null;
let isShiftKeyDown = false;

export const documentKeyUpDownHandler = (ev) => {
  if (['INPUT', 'TEXTAREA'].includes(ev.target.tagName)) return;
  if (ev.keyCode === 16) {
    if (ev.type === 'keydown') {
      isShiftKeyDown = true;
    } else if (ev.type === 'keyup') {
      isShiftKeyDown = false;
    }
  }
};

export const documentMouseDownHandler = (ev) => {
  ev.preventDefault();
  ev.stopPropagation();
};

export const documentClickHandler = (ev) => {
  ev.preventDefault();
  ev.stopPropagation();
  currentHovered = null;
  if (isShiftKeyDown) {
    addOrRemoveElement(ev.target);
  } else {
    setElements([ev.target]);
  }
};

export const bodyContextmenuHandler = (ev) => {
  ev.preventDefault();
  ev.stopPropagation();
};

export const bodyMouseoverHandler = (ev) => {
  if (!selectedElements.map((el) => el.element).includes(ev.target)) {
    currentHovered = ev.target;
    ev.target.style.outline = '5px solid blue';
  }
};

export const bodyMouseoutHandler = (ev) => {
  if (!selectedElements.map((el) => el.element).includes(ev.target)) {
    ev.target.style.outline = '';
  }
};

export const onContextMenu = (ev) => {
  ev.preventDefault();
  setElements([ev.target]);
  const { clientX, clientY } = ev;
  const dims = ev.target.getBoundingClientRect();
  sendMessage('PERTENTO_CONTEXT_MENU', { dims, clientX, clientY });
};
