import { log } from 'helpers/injector/console';

export const setupGtag = (expVariantMap, experimentData, tries = 0) => {
  const { ganMeasurementId, serverContainerUrl } = experimentData;
  if (!ganMeasurementId || Object.keys(expVariantMap).length === 0) return;

  if (++tries % 25 === 0) {
    log(tries, 'setting up gtag', window.gtag);
  }

  if (!window.dataLayer) {
    if (tries > 100) return;
    setTimeout(() => setupGtag(expVariantMap, experimentData, tries), 100);
    return;
  }

  window.gtag =
    window.gtag ||
    function gtag() {
      dataLayer.push(arguments);
    };

  reportExperimentToGtag(expVariantMap, experimentData);
};

export const reportExperimentToGtag = (expVariantMap, experimentData) => {
  const { ganMeasurementId, serverContainerUrl } = experimentData;
  if (!ganMeasurementId) return;
  log('reportExperimentToGtag', expVariantMap);
  try {
    const originalConfigTag = window.dataLayer.findLast(
      (item) => !!item[0] && item[0] === 'config',
    );
    if (serverContainerUrl) {
      log('serverContainerUrl', serverContainerUrl);
      gtag('config', ganMeasurementId, {
        server_container_url: serverContainerUrl,
      });
    } else {
      gtag('config', ganMeasurementId);
    }

    for (let expId of Object.keys(expVariantMap)) {
      const variantId = expVariantMap[expId];
      log('here', expId, variantId);

      const exp_variant_string = `PERTENTO-${expId}-${variantId}`;
      log('sending gtag event', exp_variant_string);
      gtag('event', 'pertento_experience_impression', {
        exp_variant_string,
      });
    }
    if (originalConfigTag) {
      gtag(...originalConfigTag);
    }
  } catch (ex) {
    log('error', ex);
  }
};
