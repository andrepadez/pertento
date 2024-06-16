export const sendMessage = (type, payload) => {
  const topWindow = window.top;
  const editorIframe = topWindow.document.getElementById('pertento-editor-iframe');
  const editorWindow = editorIframe.contentWindow;
  editorWindow.postMessage({ type, payload }, '*');
};
