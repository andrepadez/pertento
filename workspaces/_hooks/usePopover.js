import { useState, useLayoutEffect, useRef } from 'react';

export const usePopover = () => {
  const ref = useRef();
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    if (open) {
      setTimeout(() => {
        const popover = document.querySelector('.MuiPopover-paper');
        if (!popover) return;
        let timeoutId = null;
        popover.addEventListener('mouseenter', () => {
          clearTimeout(timeoutId);
        });
        popover.addEventListener('mouseleave', () => {
          timeoutId = setTimeout(() => setOpen(false), 200);
        });
      }, 200);
    }
  }, [open]);

  return { ref, open, setOpen };
};
