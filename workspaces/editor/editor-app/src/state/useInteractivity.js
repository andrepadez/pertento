import { useEffect } from 'react';
import { useGlobal } from 'hooks/useGlobal';
import { useIframe } from './useIframe';

export const useInteractivity = () => {
  const [interactive, setInteractive] = useGlobal('INTERACTIVE', true);
  const { sendMessage } = useIframe();

  const toggleInteractive = (value) => {
    if (typeof value === 'boolean') {
      setInteractive(value);
      sendMessage('PERTENTO_TOGGLE_INTERACTIVE', { value }, '*');
    } else {
      setInteractive((curr) => {
        sendMessage('PERTENTO_TOGGLE_INTERACTIVE', { value: !curr }, '*');
        return !curr;
      });
    }
  };

  return { interactive, setInteractive: toggleInteractive };
};
