export const applyGlobals = ({ globalJavascript, globalCSS }) => {
  if (globalJavascript !== undefined) {
    document.querySelector('#pertento-global-javascript')?.remove();
    if (globalJavascript) {
      const script = document.createElement('script');
      script.id = 'pertento-global-javascript';
      script.innerHTML = globalJavascript;
      document.body.appendChild(script);
    }
  }

  if (globalCSS !== undefined) {
    document.querySelector('#pertento-global-css')?.remove();
    if (globalCSS) {
      const style = document.createElement('style');
      style.id = 'pertento-global-css';
      style.innerHTML = globalCSS;
      document.head.appendChild(style);
    }
  }
};
