import { useChanges } from './useChanges';
import { applyChanges, applyGlobals } from 'helpers/injector/apply-changes';
import { getSelector } from 'helpers/injector/get-selector';
import { log } from 'helpers/injector/console';

export const useCodeEditorMutations = (selectedElements, variant, language, closeEditor) => {
  const { addGlobalCode, saveChanges, pushChange, saveLocalChanges } = useChanges();

  const saveHTML = async (value, action) => {
    await saveLocalChanges();
    const [selected] = selectedElements;

    const changedHtml = {
      variantId: variant.id,
      selector: selected.selector,
      friendlySelector: selected.friendlySelector,
      friendlySelectorIndex: selected.friendlySelectorIndex,
      property: 'html',
      value: value,
      tagName: selected.element.tagName,
      action,
    };

    try {
      const [dbChange] = await saveChanges([changedHtml]);
      // applyChanges(iframeBody, [dbChange]);
      // pushChange(dbChange);
      // changedHtml.selector = getSelector(selected.element);
      toast.success(`Global ${language} saved successfully`);
      closeEditor();
    } catch (ex) {
      log(ex);
    }
  };

  const onSave = async (value, action) => {
    if (language === 'html') return saveHTML(value, action);
    try {
      await addGlobalCode(language, value);
      toast.success(`Global ${language} saved successfully`);
      closeEditor();
    } catch (ex) {
      toast.error('Failed to save global code');
    }
  };

  return { onSave };
};
