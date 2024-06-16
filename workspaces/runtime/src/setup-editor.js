const { VITE_DASHBOARD_URL } = import.meta.env;

export const setupEditor = () => {
  const runtimeScript = document.createElement('script');
  runtimeScript.src = `${VITE_DASHBOARD_URL}/editor/editor-runtime.js`;
  document.body.appendChild(runtimeScript);
  const styleTag = document.createElement('style');
  styleTag.id = 'pertento-website-styles';
  styleTag.textContent = CSS_FOR_WEBSITE;
  document.head.appendChild(styleTag);
};

const CSS_FOR_WEBSITE = `
  body > * {
    display: none;
  }

  body > .iframe-wrapper {
    display: block;
    width: 100%;
    height: 100vh;
    z-index: 999999999;
    position: fixed;
    top: 0;
    left: 0;
  }

  .iframe-wrapper iframe {
    display: block;
    width: 100vw;
    height: 100%;
    border: none;
    background: transparent;
    pointer-events: none;
  }
`;
