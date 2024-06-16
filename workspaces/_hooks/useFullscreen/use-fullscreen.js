import { useState, useEffect } from 'react';
import { isFullscreen, getFullscreenElement, exitFullscreen } from './utils';

export const useFullscreen = (ref) => {
  const [elem, setElem] = useState(null);
  const [isFullscreen, setIsFullScreen] = useState(!!getFullscreenElement());

  useEffect(() => {
    if (!ref) {
      setElem(document.querySelector('body'));
    } else {
      setElem(ref.current);
    }
  }, [ref]);

  useEffect(() => {
    if (elem) {
      const fullscreenChange = (ev) => {
        const fullscreenElement = getFullscreenElement();
        setIsFullScreen(!!fullscreenElement);
      };
      elem.addEventListener('fullscreenchange', fullscreenChange);
      return () => elem.removeEventListener('fullscreenchange', fullscreenChange);
    }
  }, [elem]);

  const fullscreen = () => {
    console.log(elem);
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  };

  return { fullscreen, exitFullscreen, isFullscreen };
};

export { isFullscreen };
