import { get as idbGet, set as idbSet } from './idb-keyval.js';
import { changeExtensionIcon } from './change-extension-icon.js';
import { onTabOrWindowChanged } from './onTabOrWindowChanged.js';
console.log('service worker loaded');
let bearerToken = null;

self.addEventListener('message', async (event) => {
  if (event.data && event.data.type === 'SIGN_IN') {
    bearerToken = event.data.token;
    idbSet('PERTENTO_BEARER_TOKEN', event.data.token);
    changeExtensionIcon(true);
  }
  if (event.data && event.data.type === 'SIGN_OUT') {
    idbSet('PERTENTO_BEARER_TOKEN', null);
    changeExtensionIcon(false);
  }
});

// This event is fired when the service worker is activated
self.addEventListener('activate', async (event) => {
  // console.log('Service worker activating...');
  bearerToken = await idbGet('PERTENTO_BEARER_TOKEN');
});

chrome.windows.onFocusChanged.addListener(async (windowId) => {
  // onTabOrWindowChanged({ windowId, bearerToken });
});

// chrome.tabs.onActivated.addListener(async ({ tabId, windowId }) => {
//   // console.log('chrome.tabs.onActivated', tabId, windowId);
//   onTabOrWindowChanged({ tabId, bearerToken });
// });
// chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
//   // console.log('chrome.tabs.onUpdated', tabId, changeInfo, tab);
//   const { status, url } = changeInfo;
//   if (status === 'complete') {
//     onTabOrWindowChanged({ tabId, bearerToken });
//   }
// });
