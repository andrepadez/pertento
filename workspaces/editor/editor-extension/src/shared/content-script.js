window.addEventListener('message', (event) => {
  if (event.source !== window) return;

  if (event.data.type === 'pertentoExtensionCheckRequest') {
    chrome.runtime.sendMessage({ type: 'pertentoExtensionCheckRequest' }, (response) => {
      window.postMessage({ type: 'pertentoExtensionCheckResponse', installed: true }, '*');
    });
  }
});
