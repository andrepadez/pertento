import { useState, useEffect } from 'react';
import { getSelector, getFriendlySelector } from 'helpers/injector/get-selector';
import { removeOutline } from 'helpers/injector/remove-outline';
import { useIframe } from '@/state/useIframe';
import { useGlobal } from 'hooks/useGlobal';

export const useSelectedElements = () => {
  const [hierarchyMember, setHierarchyMember] = useGlobal('HIERARCHY_MEMBER', null);
  const [selectedElements, setSelectedElements] = useGlobal('SELECTED_ELEMENTS', []);
  const [cachedElements, setCachedElements] = useState([]);
  const { sendMessage } = useIframe();

  useEffect(() => {
    if (selectedElements?.length === 1) {
      const [selectedElement] = selectedElements;
      setHierarchyMember(selectedElement.hierarchy.length - 1);
    } else {
      setHierarchyMember(null);
    }
  }, [selectedElements]);

  const selectByChange = (change) => {
    sendMessage('PERTENTO_SELECT_BY_CHANGE', { change });
  };

  const clearSelected = () => {
    sendMessage('PERTENTO_CLEAR_SELECTED_ELEMENTS');
  };

  const selectMember = (index) => {
    setHierarchyMember(index);
    sendMessage('PERTENTO_SELECT_HIERARCHY_MEMBER', { index });
  };

  const selectedElement = selectedElements?.length === 1 ? selectedElements[0] : null;

  return {
    selectedElements,
    selectedElement,
    hierarchyMember,
    selectMember,
    setSelectedElements,
    selectByChange,
    clearSelected,
  };
};
