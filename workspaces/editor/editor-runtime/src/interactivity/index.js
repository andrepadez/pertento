import { documentClickHandler, documentMouseDownHandler, documentKeyUpDownHandler } from './events';
import { bodyMouseoverHandler, bodyMouseoutHandler, onContextMenu } from './events';
import { clearElements } from './selected-elements';
export * from './selected-elements';

export const toggleInteractive = (isInteractive) => {
  const body = document.body;
  if (isInteractive) {
    body.style.cursor = 'inherit';
    body.removeEventListener('mouseover', bodyMouseoverHandler, true);
    body.removeEventListener('mouseout', bodyMouseoutHandler, true);
    body.removeEventListener('mouseleave', bodyMouseoutHandler, true);
    document.removeEventListener('click', documentClickHandler, true);
    document.removeEventListener('mousedown', documentMouseDownHandler, true);
    document.removeEventListener('contextmenu', onContextMenu, true);
    window.top.removeEventListener('keydown', documentKeyUpDownHandler, true);
    window.top.removeEventListener('keyup', documentKeyUpDownHandler, true);
    clearElements();
  } else {
    body.style.cursor = 'grab';
    body.addEventListener('mouseover', bodyMouseoverHandler, true);
    body.addEventListener('mouseout', bodyMouseoutHandler, true);
    body.addEventListener('mouseleave', bodyMouseoutHandler, true);
    document.addEventListener('click', documentClickHandler, true);
    document.addEventListener('mousedown', documentMouseDownHandler, true);
    document.addEventListener('contextmenu', onContextMenu, true);
    window.top.addEventListener('keydown', documentKeyUpDownHandler, true);
    window.top.addEventListener('keyup', documentKeyUpDownHandler, true);
  }
};
