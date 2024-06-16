import { useState, useEffect, useCallback } from 'react';
import { useDragAndDrop } from 'hooks/useDragAndDrop';
import { useGlobal } from 'hooks/useGlobal';
import { useForm } from 'hooks/useForm';
import { useChanges } from '@/state/useChanges';
import { useSelectedElements } from '@/state/useSelectedElements';
import { useInteractivity } from '@/state/useInteractivity';
import { debounce } from 'helpers/debounce';
import { throttle } from 'helpers/throttle';
import { useDebounce } from 'hooks/useDebounce';

export const useSettingsMenu = () => {
  const [settingsOpen, setSettingsOpen] = useGlobal('SETTINGS_MENU_OPEN', true);
  const dragAndDrop = useDragAndDrop();
  const formManager = useForm();
  const [openAccordionItems, setOpenAccordionItems] = useState([]);
  const changesManager = useChanges();
  const { interactive } = useInteractivity();
  const { selectedElements } = useSelectedElements();
  const [selected] = selectedElements;
  const [change, setChange] = useState(null);

  useDebounce(() => changesManager.addChange(change), 50, [change]);

  formManager.onChange = (ev) => {
    const { name, value } = ev.target;
    if (!name || !value) return;
    setChange({ property: name, value });
    // addChangeDebounced({ property: name, value });
  };

  formManager.onSave = async () => {
    await changesManager.saveLocalChanges();
    formManager.formRef.current.reset();
  };

  formManager.isDisabled = selectedElements.length === 0;

  useEffect(() => {
    if (selectedElements.length === 0) {
      setOpenAccordionItems([]);
    }
  }, [selectedElements]);

  return {
    dragAndDrop,
    formManager,
    openAccordionItems,
    setOpenAccordionItems,
    changesManager,
    interactive,
    selectedElements,
    settingsOpen,
    toggleSettingsOpen: () => setSettingsOpen((prev) => !prev),
  };
};
