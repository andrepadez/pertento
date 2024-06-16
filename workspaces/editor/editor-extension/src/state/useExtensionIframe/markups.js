const { VITE_DASHBOARD_URL } = import.meta.env;

export const getEditorAppHtml = (variantId, token) => {
  return `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pertento Editor</title>
    <style>body { background: transparent!important; }</style>
  </head>
  <body data-pertento-variant="${variantId}" data-pertento-bearer-token="${token}">
    <div id="pertento-editor-root"></div>
  </body>
</html>
`;
};

export const getWebsiteStyles = () => {
  return `
  body > * {
    display: none;
  }

  body {
    margin: 0;
    padding: 0;
  }

  .pertento-iframe-wrapper {
    display: block;
    width: 100%;
    height: 100vh;
  }

  .pertento-iframe-wrapper > iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }
  `;
};
