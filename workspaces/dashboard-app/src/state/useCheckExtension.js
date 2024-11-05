import { useState, useEffect, useRef } from 'react';
import { useTimeout } from 'hooks/useTimeout';

export const useCheckExtension = () => {
  const [isExtensionInstalled, setIsExtensionInstalled] = useState(true);
  const { clear: clearTimeout } = useTimeout(() => {
    setIsExtensionInstalled(false);
  }, 500);

  useEffect(() => {
    const handleExtensionCheckResponse = (event) => {
      if (event.data.type === 'pertentoExtensionCheckResponse') {
        clearTimeout();
      }
    };

    window.addEventListener('message', handleExtensionCheckResponse);

    window.postMessage({ type: 'pertentoExtensionCheckRequest' }, '*');

    return () => {
      window.removeEventListener('message', handleExtensionCheckResponse);
    };
  }, []);

  return { isExtensionInstalled };
};
