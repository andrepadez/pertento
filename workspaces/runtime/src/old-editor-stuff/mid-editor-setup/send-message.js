export const sendMessage = (type, payload) => {
  const topWindow = window.top;
  topWindow.postMessage({ type, payload }, '*');
};
