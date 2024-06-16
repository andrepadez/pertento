import { useEffect, useState } from 'react';
import { get as idbGet, set as idbSet } from 'idb-keyval';
import { useGlobal } from 'hooks/useGlobal';
import { useAuth } from 'hooks/useAuth';
import { useExtensionData } from '@/state/useExtensionData';
import { renderIframeScript } from './renderIframeScript';
import { getEditorAppHtml, getWebsiteStyles } from './markups';
const { VITE_DASHBOARD_URL } = import.meta.env;

export const useExtensionIframe = () => {
  const { user } = useAuth();
  const { experiment, websiteId, variantId, tabId } = useExtensionData();
  const [isOpen, setIsOpen] = useGlobal('PERTENTO_EDITOR_OPEN', false);
  const htmlForEditorIframe = getEditorAppHtml(variantId, user.token);
  const cssForWebsite = getWebsiteStyles();

  useEffect(() => {
    const checkOpen = async () => {
      const isOpen = await idbGet(`PERTENTO:EDITOR:OPEN:${tabId}`);
      if (isOpen) {
        setIsOpen(true);
        renderIframe();
      }
    };
    checkOpen();
  }, []);

  const toggleOpen = async () => {
    if (isOpen) {
      setIsOpen(false);
      await idbSet(`PERTENTO:EDITOR:OPEN:${tabId}`, false);
      destroyIframe();
    } else {
      await idbSet(`PERTENTO:EDITOR:OPEN:${tabId}`, true);
      renderIframe();
      setIsOpen(true);
    }
  };

  const renderIframe = () => {
    chrome.scripting.executeScript({
      target: { tabId },
      args: [user.token, htmlForEditorIframe, cssForWebsite, VITE_DASHBOARD_URL],
      func: renderIframeScript,
    });
  };

  const destroyIframe = () => {
    chrome.scripting.executeScript({
      target: { tabId },
      func: () => {
        const wrappers = document.querySelectorAll('.pertento-iframe-wrapper');
        const styleTag = document.getElementById('pertento-website-styles');
        [...wrappers, styleTag].forEach((el) => el?.remove());
        window.location.reload();
      },
    });
  };

  return { isOpen, toggleOpen };
};
