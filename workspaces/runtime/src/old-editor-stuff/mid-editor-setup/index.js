import { applyGlobals, addChange, removeChange } from './changes';
import { undoChange, redoChange } from './changes';
import { toggleInteractive, selectHierarchyMember } from './interactivity';
import { selectByChange, clearElements } from './interactivity/selected-elements';
import { checkCssQuery, selectByCssQuery } from './interactivity/query-selector';
import { setupStyles } from './setup-styles';
import { sendMessage } from './send-message';
import { log } from 'helpers/injector/console';
let startedSetup = { value: false };

export const midEditorSetup = () => {
  log('MIDDLE EDITOR RUNTIME (v1.1.2) SCRIPT LOADED!!!');
  setupStyles();
  window.addEventListener('message', (ev) => {
    const { data: message } = ev;
    const { type, payload } = message;
    if (!type?.startsWith('PERTENTO_')) return;

    if (type === 'PERTENTO_START_SETUP') {
      startedSetup.value = true;
      console.log('PERTENTO_START_SETUP');
      toggleInteractive(false);
    }

    if (type === 'PERTENTO_APPLY_GLOBALS') {
      applyGlobals(payload.globals);
    }

    if (type === 'PERTENTO_ADD_CHANGE') {
      addChange(payload);
    }

    if (type === 'PERTENTO_REMOVE_CHANGE') {
      removeChange(payload.index);
    }

    if (type === 'PERTENTO_UNDO_CHANGE') {
      undoChange();
    }

    if (type === 'PERTENTO_REDO_CHANGE') {
      redoChange();
    }

    if (type === 'PERTENTO_TOGGLE_INTERACTIVE') {
      toggleInteractive(message.value);
    }

    if (type === 'PERTENTO_SELECT_HIERARCHY_MEMBER') {
      selectHierarchyMember(payload);
    }

    if (type === 'PERTENTO_SELECT_BY_CHANGE') {
      selectByChange(payload.change);
    }

    if (type === 'PERTENTO_CLEAR_SELECTED_ELEMENTS') {
      clearElements();
    }

    if (type === 'PERTENTO_RELOAD_IFRAME') {
      window.location.reload();
    }

    if (type === 'PERTENTO_CHECK_CSS_QUERY') {
      checkCssQuery(payload.query);
    }

    if (type === 'PERTENTO_SELECT_BY_CSS_QUERY') {
      selectByCssQuery(payload.query);
    }
  });

  (function tryStartSetup() {
    if (!startedSetup.value) {
      sendMessage('PERTENTO_IFRAME_READY');
      requestAnimationFrame(tryStartSetup);
    }
  })();
};
