import { pickRandomVariant } from './pick-random-variant';
import { experiments } from './running-experiments';
import { addVisitor } from './visitors';
import * as errors from 'custom-errors';

export const experimentVariantsHandler = async (c) => {
  try {
    const response = {};
    const { websiteId, uuid, ...query } = c.req.query();

    const keys = experiments.running && Object.keys(experiments.running);

    const theExperiments = experiments?.running?.[websiteId];
    if (!theExperiments || theExperiments.length === 0) return c.json(response);

    response.uuid = uuid || crypto.randomUUID();

    response.experiments = {};

    for (let experiment of theExperiments) {
      const { deviceTargeting } = experiment;
      let hasHitDeviceTargeting;
      if (deviceTargeting.length === 0) {
        hasHitDeviceTargeting = true;
      } else {
        hasHitDeviceTargeting = deviceTargeting.includes('All');
        if (!hasHitDeviceTargeting) {
          for (let device of deviceTargeting) {
            if (c.useragent[`is${device}`]) {
              hasHitDeviceTargeting = true;
              break;
            }
          }
        }
      }

      if (!hasHitDeviceTargeting) continue;

      const queryKey = `exp-${experiment.id}`;
      const variantId = query[queryKey] || pickRandomVariant(experiment.variants)?.id;
      if (!variantId) continue;

      response[queryKey] = variantId;
      response.ganMeasurementId = experiment.ganMeasurementId;
      response.serverContainerUrl = experiment.serverContainerUrl;

      if (!experiment.variants[variantId]) continue;
      const { globalJavascript, globalCSS } = experiment.variants[variantId];

      response.experiments[experiment.id] = {};
      const resExp = response.experiments[experiment.id];
      resExp.urlTargeting = experiment.urlTargeting;
      resExp.changes = [...experiment.variants[variantId].changes];
      resExp.globalCSS = globalCSS;
      resExp.globalJavascript = globalJavascript;
    }

    return c.json(response);
  } catch (ex) {
    throw errors.INTERNAL_SERVER_ERROR(ex.message, {});
  }
};
