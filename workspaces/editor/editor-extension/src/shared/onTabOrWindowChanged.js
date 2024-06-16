import { set as idbSet, del as idbDel } from './idb-keyval.js';
import { retrieveWebsiteId } from '../retrieve-website-id.js';
import { changeExtensionIcon } from '../change-extension-icon.js';

// export const onTabOrWindowChanged = async ({ windowId, tabId, bearerToken }) => {};

export const onTabOrWindowChanged = async ({ windowId, tabId, bearerToken }) => {
  // console.log('onTabOrWindowChanged', { windowId, tabId, bearerToken });
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log('tab.url', tab?.url);
  if (!tab || tab.url.startsWith('chrome://')) return changeExtensionIcon(false);

  try {
    const { websiteId } = await retrieveWebsiteId(tabId || tab.id);
    console.log('websiteId', websiteId);
    await idbSet('PERTENTO_WEBSITE_ID', websiteId || null);
    changeExtensionIcon(websiteId > 0);
  } catch (ex) {
    console.log('error', ex);
    await idbSet('PERTENTO_WEBSITE_ID', null);
    changeExtensionIcon(false);
  }
};

// let tab;
//   console.log('windowId', windowId, chrome.windows.WINDOW_ID_NONE);
//   if (windowId) {
//     if (windowId === chrome.windows.WINDOW_ID_NONE) {
//       await idbSet('PERTENTO_WEBSITE_ID', null);
//       return changeExtensionIcon(false);
//     }
//     const tabs = await chrome.tabs.query({ active: true, windowId });
//     tab = tabs[0];
//   } else {
//     tab = await chrome.tabs.get(tabId);
//     if (!tab) {
//       await idbSet('PERTENTO_WEBSITE_ID', null);
//       return changeExtensionIcon(false);
//     }
//   }
