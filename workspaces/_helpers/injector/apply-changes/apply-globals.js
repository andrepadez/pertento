import { log } from 'helpers/injector/console';

export const applyGlobals = (body, { globalJavascript, globalCSS, id: experimentId }) => {
  log('applyGlobals', { experimentId });
  try {
    if (globalJavascript) {
      const id = `pertento-global-javascript-${experimentId}`;
      const existingScript = document.querySelector(id);
      const script = document.createElement('script');
      script.id = id;
      script.innerHTML = `;(function(){${globalJavascript}})();`;

      if (existingScript) existingScript.remove();
      document.body.appendChild(script);
    }

    if (globalCSS) {
      const id = `pertento-global-css-${experimentId}`;
      const existingStyle = document.querySelector(id);
      const style = document.createElement('style');
      style.id = id;
      style.innerHTML = globalCSS;
      if (existingStyle) existingStyle.remove();
      document.head.appendChild(style);
    }
  } catch (error) {
    console.error('applyGlobals error', error);
  }
};
