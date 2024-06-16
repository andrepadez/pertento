import { useState, useEffect, useRef } from 'react';
import { useGlobal } from 'hooks/useGlobal';

export const useIframe = () => {
  const iframeRef = useRef();
  const [topWindow] = useState(() => window.top);
  const [websiteIframeWrapper, setIframeWrapper] = useGlobal('IFRAME_WRAPPER', null); // [1
  const [websiteIframe, setWebsiteIframe] = useGlobal('WEBSITE_IFRAME', null);
  const [websiteWindow, setWebsiteWindow] = useGlobal('WEBSITE_WINDOW', null);
  const [websiteDocument, setWebsiteDocument] = useGlobal('WEBSITE_DOCUMENT', null);

  const [websiteUrl] = useState(() => window.top.location.href);

  useEffect(() => {
    if (iframeRef.current) {
      const { current: iframe } = iframeRef;
      setWebsiteIframe(iframe);
      const iframeWindow = iframe.contentWindow;
      const iframeDocument = iframe.contentDocument;
      setIframeWrapper(iframe.parentElement);
      setWebsiteWindow(iframeWindow);
      setWebsiteDocument(iframeDocument);
    }
  }, [iframeRef.current]);

  const sendMessage = (type, payload) => {
    websiteWindow?.postMessage({ type, payload }, '*');
  };

  const reload = () => {
    sendMessage('PERTENTO_RELOAD_IFRAME');
  };

  return {
    iframeRef,
    topWindow,
    websiteUrl,
    websiteIframeWrapper,
    websiteIframe,
    websiteWindow,
    websiteDocument,
    sendMessage,
    reload,
  };
};
