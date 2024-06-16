export const applyGlobals = (body, { globalJavascript, globalCSS }) => {
  try {
    if (globalJavascript) {
      const existingScript = document.querySelector('#pertento-global-javascript');
      const script = document.createElement('script');
      script.id = 'pertento-global-javascript';
      script.innerHTML = globalJavascript;

      if (existingScript) existingScript.remove();
      document.body.appendChild(script);
    }

    if (globalCSS) {
      const existingStyle = document.querySelector('#pertento-global-css');
      const style = document.createElement('style');
      style.id = 'pertento-global-css';
      style.innerHTML = globalCSS;
      if (existingStyle) existingStyle.remove();
      document.head.appendChild(style);
    }
  } catch (error) {
    console.error('applyGlobals error', error);
  }
};
