import { useState, useEffect, useRef } from 'react';
import { useChanges } from '@/state/useChanges';
import { useSelectedElements } from '@/state/useSelectedElements';
import { useDevices } from '@/state/useDevices';
import { useIframe } from '@/state/useIframe';
import { useGlobal } from 'hooks/useGlobal';

export const useContextMenu = () => {
  const contextMenuRef = useRef(null);
  const [isContextOpen, setIsContextOpen] = useGlobal('CONTEXT_MENU_OPEN', false);
  const [hasCopiedSelectors, setCopiedSelectors] = useState(false);
  const { selectedElements, setSelectedElements, hierarchyMember } = useSelectedElements();
  const { websiteIframe } = useIframe();
  const { addChange } = useChanges();

  const openContextMenu = ({ dims, clientX, clientY, isHierarchy }) => {
    const { x, y, width, height } = dims || {};
    let left = clientX ? clientX - 25 : x + width / 2;
    if (left < 0) left = 0;
    if (left > window.innerWidth - 200) left = window.innerWidth - 200;
    let top = clientY ? clientY - 25 : y + height / 2;
    if (top < 0) top = 0;
    if (top > window.innerHeight - 250) top = window.innerHeight - 250;
    const margins = isHierarchy
      ? { left: 0, top: 0 }
      : {
          left: websiteIframe.offsetLeft,
          top: websiteIframe.offsetTop,
        };

    setIsContextOpen({ left: left + margins.left, top: top + margins.top });
  };

  useEffect(() => {
    const { current: contextMenu } = contextMenuRef;
    if (isContextOpen && contextMenu) {
      setTimeout(() => {
        const radixPopover = document.body.querySelector('[data-radix-popper-content-wrapper]');
        if (radixPopover) {
          radixPopover.style.transform = '';
          radixPopover.style.top = `${isContextOpen.top}px`;
          radixPopover.style.left = `${isContextOpen.left}px`;
        }
      }, 0);
    }
  }, [isContextOpen]);

  const removeElement = () => {
    setIsContextOpen(false);
    setTimeout(() => {
      addChange({ property: 'display', value: 'none' });
      setSelectedElements([]);
    });
  };

  const copySelectors = async () => {
    const [selectedElement] = selectedElements;
    const element = hierarchyMember ? selectedElement.hierarchy[hierarchyMember] : selectedElement;

    const text = `const element = document.querySelector('${element.selector}');

// or (choose one or the other, otherwise this will cause a javascript error)

const element = document.querySelector('${element.friendlySelector}');`;
    await navigator.clipboard.writeText(text);
    setCopiedSelectors(true);
    setTimeout(() => setCopiedSelectors(false), 1000);
  };

  return {
    contextMenuRef,
    isContextOpen,
    setIsContextOpen,
    removeElement,
    copySelectors,
    openContextMenu,
    hasCopiedSelectors,
  };
};
