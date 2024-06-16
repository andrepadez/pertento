const { VITE_DASHBOARD_URL } = import.meta.env;

export const setupForEditorExtension = () => {
  window.addEventListener('message', (event) => {
    if (event.data.type === 'PERTENTO_SETUP_EDITOR') {
      const editorIframe = document.getElementById('pertento-editor-iframe');
      const editorWindow = editorIframe.contentWindow;
      const editorDocument = editorIframe.contentDocument;

      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = `${VITE_DASHBOARD_URL}/editor/editor-app.css`;
      editorDocument.head.appendChild(style);

      const script = document.createElement('script');
      script.src = `${VITE_DASHBOARD_URL}/editor/editor-app.js`;
      editorDocument.body.appendChild(script);

      const lookForIframe = () => {
        const editorWebsiteIframe = editorDocument.getElementById('pertento-website-iframe');
        if (!editorWebsiteIframe) {
          return requestAnimationFrame(lookForIframe);
        }
        editorWebsiteIframe.onload = () => {
          const editorWebsiteDocument = editorWebsiteIframe.contentDocument;
          const editorRuntimeScript = document.createElement('script');
          editorRuntimeScript.src = `${VITE_DASHBOARD_URL}/editor/editor-runtime.js`;
          editorWebsiteDocument.body.appendChild(editorRuntimeScript);
        };
      };

      lookForIframe();
    }
  });
};
