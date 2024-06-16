import { log } from '@/helpers/console';
import parseEditorUrl from '@/helpers/parse-editor-url';

export const checkIfOldEditor = function () {
  try {
    const body = document.querySelector('body');
    const searchParams = new URLSearchParams(window.top.location.search);
    const script = document.getElementById('pertentoScript');
    const websiteUrl = window.top.location.href;
    const websiteId = new URL(script.src).searchParams.get('website-id');
    window.top.pertentoSearchParams = searchParams;
    if (window.top.pertentoEditor) {
      return true;
    }

    const pertentoToken = searchParams.get('pertentoToken') || searchParams.get('pertentotoken');

    log('checkIfOldEditor', pertentoToken);

    if (pertentoToken) {
      log('calling prepareForEditor');
      setTimeout(prepareForEditor, 300);
      localStorage.setItem('PERTENTO_EDITOR_AUTH_TOKEN', pertentoToken);

      return true;
    }

    return false;
  } catch (ex) {
    return false;
  }
};

export const prepareForEditor = (variantId) => {
  log('prepareForEditor called');
  if (window.top.pertentoPreparedForEditor) return;
  window.top.pertentoPreparedForEditor = true;
  log('prepareForEditor executing');

  const runtimeScript = document.getElementById('pertentoScript');
  const scriptSrc = runtimeScript.src;
  const title = document.title;

  Array.from(document.children).forEach((child) => child.remove());
  const html = document.createElement('html');
  document.appendChild(html);
  html.appendChild(document.createElement('head'));
  const documentBody = document.createElement('body');
  html.appendChild(documentBody);

  document.title = title + ' - Pertento Editor';
  documentBody.style.margin = '0';

  const iframe = document.createElement('iframe');
  const search = window.location.search;
  let theSearch = search ? search + '&pertentoEditor=true' : '?pertentoEditor=true';
  if (variantId) {
    theSearch += '&pertentoVariantId=' + variantId;
  }
  const source = window.location.href.replace(window.location.search, theSearch);
  const [sourceUrl, pertentoData] = parseEditorUrl(window.location.href);

  iframe.src = sourceUrl;
  iframe.setAttribute('id', 'pertento-iframe');
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  const iframeDiv = document.createElement('div');
  iframeDiv.style = 'display: flex; width: 100%; justify-content: center; align-items: center;';
  iframeDiv.appendChild(iframe);

  documentBody.appendChild(iframeDiv);

  const onIframeLoad = function () {
    log('iframe.contentWindow onIframeLoad', iframe.contentWindow);
    Object.entries(pertentoData).forEach(([key, val]) => {
      iframe.contentWindow[key] = val;
    });

    iframe.contentWindow.pertentoEditor = true;

    const scriptExists = document.getElementById('pertentoEditor');
    if (scriptExists) return;
    const editorScript = document.createElement('script');
    editorScript.id = 'pertentoEditor';
    log('scriptSrc', scriptSrc);
    editorScript.src = scriptSrc.replace(/pertentoRuntime(-beta)?/, 'theEditor/pertentoEditor');
    log('editorScript.src', editorScript.src);
    documentBody.appendChild(editorScript);
  };

  iframe.onload = onIframeLoad;
  setTimeout(onIframeLoad, 2000);

  const editorRoot = document.createElement('div');
  editorRoot.id = 'pertento-editor-root';
  documentBody.appendChild(editorRoot);

  const loadingOverlay = document.createElement('div');
  loadingOverlay.id = 'pertento-loading-overlay';
  loadingOverlay.style.position = 'absolute';
  loadingOverlay.style.zIndex = '9999';
  loadingOverlay.style.top = '0';
  loadingOverlay.style.left = '0';
  loadingOverlay.style.width = '100%';
  loadingOverlay.style.height = '100vh';
  loadingOverlay.style.backgroundColor = '#000';
  loadingOverlay.style.opacity = '0.8';
  documentBody.appendChild(loadingOverlay);
};
