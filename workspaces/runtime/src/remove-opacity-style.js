import { log } from 'helpers/injector/console';

export const removeOpacityStyle = (ms = 0) => {
  setTimeout(() => {
    const styleTag = document.getElementById('pertento-style-opacity');
    log('XXXXXXX removeOpacityStyle', ms, { styleTag });
    if (styleTag) {
      styleTag.remove();
    }
  }, ms);
};
