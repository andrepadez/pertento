import { useEffect, useRef } from 'react';
import { useAuth } from 'hooks/useAuth';
import { useEditorData } from '@/state/useEditorData';
import { useInteractivity } from '@/state/useInteractivity';
import { useIframe } from '@/state/useIframe';
import { useChanges } from '@/state/useChanges';
import { useContextMenu } from '@/state/useContextMenu';
import { useSelectedElements } from '@/state/useSelectedElements';
import { useQuerySelector } from '@/state/useQuerySelector';

export const useEditorSetup = () => {
  const { user } = useAuth();
  const { applyDbChanges } = useChanges();
  const { setInteractive } = useInteractivity();
  const { websiteWindow, sendMessage } = useIframe();
  const { openContextMenu } = useContextMenu();
  const { onCheckCssQuery } = useQuerySelector();
  const { setSelectedElements } = useSelectedElements();
  const { experiment, changes, globals, isLoaded } = useEditorData();

  const onMessage = (ev) => {
    const { data: message } = ev;
    const { type, payload } = message;
    if (!type) return;
    if (type === 'PERTENTO_CONTEXT_MENU') openContextMenu(payload);
    if (type === 'PERTENTO_SELECTED_ELEMENTS') setSelectedElements(payload.elements);
    if (type === 'PERTENTO_CSS_QUERY_CHECKED') onCheckCssQuery(payload.quantity);
  };

  useEffect(() => {
    if (changes && websiteWindow) {
      window.addEventListener('message', (ev) => {
        if (ev.data.type === 'PERTENTO_IFRAME_READY') {
          sendMessage('PERTENTO_START_SETUP');
          applyDbChanges(changes);
          sendMessage('PERTENTO_APPLY_GLOBALS', { globals });
          setInteractive(false);
        } else {
          onMessage(ev);
        }
      });
    }
  }, [changes, websiteWindow]);

  return { experiment, user, isLoaded };
};
