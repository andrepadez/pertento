let isListening = false;

export const listenForUrlChange = (cb) => {
  let currentUrl = window.location.href;
  function listen() {
    if (window.location.href !== currentUrl) {
      currentUrl = window.location.href;
      cb && cb(currentUrl);
    }
    requestAnimationFrame(listen);
  }
  if (!isListening) {
    isListening = true;
    listen();
  }
};
