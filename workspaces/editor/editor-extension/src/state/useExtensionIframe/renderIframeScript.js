export const renderIframeScript = (token, htmlForEditorIframe, cssForWebsite, VITE_DASHBOARD_URL) => {
  const bodyChildren = Array.from(document.body.childNodes);
  const headChildren = Array.from(document.head.childNodes);
  [...bodyChildren, ...headChildren].forEach((child) => {
    if (child.id !== 'pertentoScript') child.remove();
  });

  const styleTag = document.createElement('style');
  styleTag.id = 'pertento-website-styles';
  styleTag.textContent = cssForWebsite;
  document.head.appendChild(styleTag);

  const editorIframeWrapper = document.createElement('div');
  editorIframeWrapper.className = 'pertento-iframe-wrapper';
  editorIframeWrapper.id = 'pertento-editor-iframe-wrapper';
  const editorIframe = document.createElement('iframe');
  editorIframe.id = 'pertento-editor-iframe';
  editorIframe.seamless = true;
  editorIframe.srcdoc = htmlForEditorIframe;
  editorIframeWrapper.appendChild(editorIframe);
  document.body.appendChild(editorIframeWrapper);

  editorIframe.onload = () => {
    window.top.postMessage({ type: 'PERTENTO_SETUP_EDITOR', token }, '*');
  };
};
