import { useEffect, useRef } from 'react';
import { useEditorData } from './useEditorData';
import { useGlobal } from 'hooks/useGlobal';
import { useChangesMutations } from './useChangesMutations';
import { useSelectedElements } from './useSelectedElements';
import { useIframe } from './useIframe';

export const useChanges = () => {
  const [dbChanges, setDbChanges] = useGlobal('DB_CHANGES', []);
  const [localChanges, setLocalChanges] = useGlobal('LOCAL_CHANGES', []);
  const [undone, setUndone] = useGlobal('UNDONE_CHANGES', []);
  const { variantId } = useEditorData();
  const changesMutations = useChangesMutations();
  const { sendMessage } = useIframe();
  const { selectedElements, hierarchyMember } = useSelectedElements();

  const applyDbChanges = (dbChanges) => {
    for (let change of dbChanges) {
      sendMessage('PERTENTO_ADD_CHANGE', { change });
    }
    setDbChanges(dbChanges);
  };

  const saveAndAddChange = async (change) => {
    const newDbChanges = await changesMutations.saveChanges([change]);
    setDbChanges((curr) => [...curr, ...newDbChanges]);
    sendMessage('PERTENTO_ADD_CHANGE', { change });
  };

  const addChange = (change) => {
    const lastChange = localChanges.at(-1);

    if (hierarchyMember !== null) {
      const [selectedElement] = selectedElements;
      const element = selectedElement.hierarchy[hierarchyMember];
      change.selector = element.selector;
      change.friendlySelector = element.friendlySelector;
      change.friendlySelectorIndex = element.friendlySelectorIndex;
    } else if (selectedElements.length === 1) {
      change.selector = selectedElements[0].selector;
      change.friendlySelector = selectedElements[0].friendlySelector;
      change.friendlySelectorIndex = selectedElements[0].friendlySelectorIndex;
    } else {
      change.selectors = selectedElements.map((item) => item.selector);
      change.friendlySelectors = selectedElements.map((item) => item.friendlySelector);
      change.friendlySelectorIndexes = selectedElements.map((item) => item.friendlySelectorIndex);
    }

    const isLastChange = compareChanges(lastChange, change);
    sendMessage('PERTENTO_ADD_CHANGE', { change, isLastChange });

    if (isLastChange) {
      setLocalChanges((curr) => [...curr.slice(0, -1), change]);
    } else {
      setLocalChanges((curr) => [...curr, change]);
    }
  };

  const saveLocalChanges = async () => {
    if (localChanges.length === 0) return;
    const newDbChanges = await changesMutations.saveChanges(localChanges);
    setDbChanges((curr) => [...curr, ...newDbChanges]);
    setLocalChanges([]);
  };

  const removeChange = async (change) => {
    const index = [...dbChanges, ...localChanges].findIndex((c) => c === change);
    const isDbChange = change.id;
    if (isDbChange) {
      await changesMutations.deleteChange(change.id);
      setDbChanges((curr) => curr.filter((c) => c !== change));
    } else {
      setLocalChanges((curr) => curr.filter((c) => c !== change));
    }

    sendMessage('PERTENTO_REMOVE_CHANGE', { index });
  };

  const undoChange = async () => {
    const lastChange = [...dbChanges, ...localChanges].pop();
    if (!lastChange) return;
    sendMessage('PERTENTO_UNDO_CHANGE');
    const isDbChange = dbChanges.includes(lastChange);
    if (isDbChange) {
      await changesMutations.deleteChange(lastChange.id);
      delete lastChange.id;
      setDbChanges((curr) => curr.filter((c) => c !== lastChange));
    } else {
      setLocalChanges((curr) => curr.filter((c) => c !== lastChange));
    }
    setUndone((curr) => [...curr, lastChange]);
  };

  const redoChange = () => {
    sendMessage('PERTENTO_REDO_CHANGE');
    const lastUndone = undone.pop();
    if (!lastUndone) return;
    setUndone((curr) => curr.filter((c) => c !== lastUndone));
    setLocalChanges((curr) => [...curr, lastUndone]);
  };

  const removeAllChanges = () => {
    const allChanges = [...dbChanges, ...localChanges];
    for (let i = allChanges.length - 1; i >= 0; i--) {
      const change = allChanges[i];
      sendMessage('PERTENTO_REMOVE_CHANGE', { index: i });

      if (change.id) {
        changesMutations.deleteChange(change.id);
      }
    }

    setDbChanges([]);
    setLocalChanges([]);
  };

  return {
    changes: [...dbChanges, ...localChanges],
    dbChanges,
    localChanges,
    undone,
    applyDbChanges,
    addChange,
    saveAndAddChange,
    saveLocalChanges,
    removeChange,
    undoChange,
    redoChange,
    removeAllChanges,
    ...changesMutations,
  };
};

const compareChanges = (a, b) => {
  if (!a || !b) return false;
  const isMultiple = a.selectors;
  if (isMultiple) {
    return (
      a.property === b.property &&
      a.action === b.action &&
      a.selectors?.every((selector, idx) => selector === b.selectors?.[idx])
    );
  } else {
    return a.element === b.element && a.property === b.property;
  }
};
