import { log } from 'helpers/injector/console';
import { setupSendToExperimentsServer } from './send-to-experiment-server';
let animationFrameRequest = null;

export const setupDataLayer = function (experimentData, expVariantMap, tries = 0) {
  cancelAnimationFrame(animationFrameRequest);
  if (tries++ % 25 === 0) {
    log(tries, 'setting up dataLayer', window.dataLayer);
  }
  if (!window.dataLayer) {
    if (tries > 100) return;
    setTimeout(() => setupDataLayer(experimentData, expVariantMap, tries), 100);
    return;
  }

  log('setupSendToExperimentsServer', experimentData, expVariantMap);
  const sendToExperimentsServer = setupSendToExperimentsServer(experimentData, expVariantMap);
  const initialData = window.dataLayer;

  if (initialData.length > 0) {
    sendToExperimentsServer(initialData, true);
  }

  let originalDataLayerLength = window.dataLayer.length;
  (function monitorDataLayer() {
    if (window.dataLayer.length > originalDataLayerLength) {
      const newData = window.dataLayer.slice(originalDataLayerLength);
      if (newData.length > 0) {
        sendToExperimentsServer(newData, true);
      }
      originalDataLayerLength = window.dataLayer.length;
    }
    animationFrameRequest = requestAnimationFrame(monitorDataLayer);
  })();
};
