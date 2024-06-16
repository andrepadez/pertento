import { useRef } from 'react';
import jsBeautify from 'js-beautify';
import { removeOutline } from 'helpers/injector/remove-outline';
import { useGlobal } from 'hooks/useGlobal';
import { useEditorData } from './useEditorData';
import { useSelectedElements } from './useSelectedElements';
import { useCodeEditorMutations } from './useCodeEditorMutations';
import { useChanges } from './useChanges';
import { HTML_CODE_EDITOR_ACTIONS } from 'misc';

export const useCodeEditor = () => {
  const [language, setLanguage] = useGlobal('CODE_EDITOR_LANGUAGE', null);
  const [codeEditorOpen, setCodeEditorOpen] = useGlobal('CODE_EDITOR_OPEN', false);
  const [value, setValue] = useGlobal('CODE_EDITOR_VALUE', null);
  const [action, setAction] = useGlobal('CODE_EDITOR_ACTION', 'replace');
  const editorRef = useRef(null);
  const { variant, globals } = useEditorData();
  const { addGlobalCode, addChange, saveAndAddChange } = useChanges();
  const { selectedElements, hierarchyMember } = useSelectedElements();

  const openEditor = (lang) => {
    const { globalJavascript, globalCSS } = globals;
    const values = { js: globalJavascript, css: globalCSS };
    setValue(lang === 'html' ? '' : values[lang] || '');
    setCodeEditorOpen(true);
    setLanguage(lang);
    if (lang === 'html') changeAction(action);
  };

  const closeEditor = () => {
    setCodeEditorOpen(false);
    setLanguage(null);
    setValue(null);
    setAction('replace');
  };

  const changeAction = (action) => {
    if (action === 'replace') {
      const element =
        hierarchyMember !== null
          ? selectedElements[0].hierarchy[hierarchyMember]
          : selectedElements[0];
      const html = jsBeautify.html(element.outerHTML, { indent_size: 2 });
      setValue(html);
    } else {
      setValue('');
      editorRef.current?.setValue('');
    }
    setAction(action);
  };

  const handleSave = async () => {
    if (language === 'html') {
      const element =
        hierarchyMember !== null
          ? selectedElements[0].hierarchy[hierarchyMember]
          : selectedElements[0];

      const change = {
        ...element,
        property: 'html',
        action,
        value,
      };
      await saveAndAddChange(change);
    } else {
      await addGlobalCode(language, value);
    }
    closeEditor();
  };

  const handleFormat = () => {
    let formattedValue = value;
    if (language === 'css') {
      formattedValue = jsBeautify.css(value, { indent_size: 2 });
    } else if (language === 'js') {
      formattedValue = jsBeautify(value, { indent_size: 2 });
    } else if (language === 'html') {
      formattedValue = jsBeautify.html(value, { indent_size: 2 });
    }
    setValue(formattedValue);
  };

  const mutations = useCodeEditorMutations(selectedElements, variant, language, closeEditor);

  return {
    language,
    codeEditorOpen,
    setCodeEditorOpen,
    value,
    editorRef,
    HTML_CODE_EDITOR_ACTIONS,
    action,
    setValue,
    changeAction,
    openEditor,
    closeEditor,
    handleFormat,
    handleSave,
    ...mutations,
  };
};
