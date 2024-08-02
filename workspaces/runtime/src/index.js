import { log } from 'helpers/injector/console';
import { runExperiments } from './run-experiments';
import { getExperimentData } from './get-experiment-data';
import { setupGtag } from './setup-gtag';
import { setupDataLayer } from './setup-datalayer';
import { removeOpacityStyle } from './remove-opacity-style';
import { checkIfOldEditor } from './old-editor-stuff';
import { midEditorSetup } from './old-editor-stuff/mid-editor-setup';
import { setupForEditorExtension } from './setup-for-editor-extension';
const { VITE_DASHBOARD_URL } = import.meta.env;

(async function main() {
  setupForEditorExtension();
  try {
    const isEditor = window.top !== window.self;
    if (isEditor) {
      try {
      } catch (ex) {
        midEditorSetup();
        return removeOpacityStyle();
      }
    }
  } catch (ex) {}

  try {
    log('Runtime (Live 2024.08.02.2) script loaded!!!');
    const script = document.getElementById('pertentoScript');
    const websiteUrl = window.top.location.href;
    const websiteId = new URL(script.src).searchParams.get('website-id');
    const body = document.body;
    if (checkIfOldEditor()) return;

    const experimentData = await getExperimentData(websiteUrl, websiteId);

    log('experimentData', experimentData);
    const { expVariantMap, experimentsToCount, allExpVariantMap } = runExperiments(experimentData, websiteId);

    log({ allExpVariantMap, expVariantMap });

    setupGtag(expVariantMap, experimentData);
    setupDataLayer(experimentData, allExpVariantMap);

    const opacityDelay = localStorage.getItem('PERTENTO_OPACITY_DELAY');
    log('removing opacity with delay', +opacityDelay);
    removeOpacityStyle(opacityDelay ? +opacityDelay : 0);
  } catch (ex) {
    removeOpacityStyle();
    log('exception', ex);
  }
})();
