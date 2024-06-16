import { useEffect, useRef } from 'react';

export const useDragAndDrop = () => {
  const underlayRef = useRef(null);
  const draggableRef = useRef(null);
  const triggerRef = useRef(null);

  const onMouseDown = (ev) => {
    ev.preventDefault();
    underlayRef.current.style.display = 'block';
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  const onMouseMove = (ev) => {
    const draggable = draggableRef.current;
    const trigger = triggerRef.current;
    const { clientX, clientY } = ev;
    const { width, height } = draggable.getBoundingClientRect();
    const style = window.getComputedStyle(draggable);
    const marginTop = parseInt(style.getPropertyValue('margin-top'), 10);

    draggable.style.left = clientX - trigger.clientWidth / 2 + 'px';
    draggable.style.top = clientY - trigger.clientHeight / 2 - marginTop + 'px';

    // if (width + clientX <= window.innerWidth && clientX >= 20) {
    //   draggable.style.left = clientX - 20 + 'px';
    // }
    // if (height + clientY <= window.innerHeight && clientY >= 20) {
    //   draggable.style.top = clientY + 'px';
    // }
  };
  const onMouseUp = (ev) => {
    document.removeEventListener('mousemove', onMouseMove);
    underlayRef.current.style.display = 'none';
  };

  useEffect(() => {
    const draggable = draggableRef.current;
    if (draggable) {
      window.draggable = draggable;
      const trigger = triggerRef.current;
      trigger.addEventListener('mousedown', onMouseDown);
      trigger.style.cursor = 'pointer';
      const underlay = document.getElementById('drag-and-drop-underlay');
      underlayRef.current = underlay || createUnderlay();
      document.body.appendChild(underlayRef.current);
    }
  }, [draggableRef]);

  return { draggableRef, triggerRef };
};

const createUnderlay = () => {
  const underlay = document.createElement('div');
  underlay.id = 'drag-and-drop-underlay';
  underlay.style.position = 'fixed';
  underlay.style.top = '0';
  underlay.style.left = '0';
  underlay.style.width = '100vw';
  underlay.style.height = '100vh';
  underlay.style.backgroundColor = 'rgba(0,0,0,0.0)';
  underlay.style.zIndex = 50;
  underlay.style.display = 'none';
  return underlay;
};
