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

      const isDeployed = experiment.status === 'Deployed';

      const queryKey = `exp-${experiment.id}`;

      const variantId = isDeployed
        ? experiment.deployedVariant.id
        : query[queryKey] || pickRandomVariant(experiment.variants)?.id;
      if (!variantId) continue;

      response[queryKey] = variantId;

      if (!isDeployed) {
        response.ganMeasurementId = experiment.ganMeasurementId;
      }
      response.serverContainerUrl = experiment.serverContainerUrl;

      if (!experiment.variants[variantId]) continue;
      const { globalJavascript, globalCSS } = experiment.variants[variantId];

      const variant = experiment.variants[variantId];

      response.experiments[experiment.id] = {};
      const resExp = response.experiments[experiment.id];
      resExp.type = experiment.type;
      resExp.urlTargeting = experiment.urlTargeting;
      resExp.cookieTargeting = experiment.cookieTargeting;

      if (experiment.type === 'URL Redirect') {
        resExp.redirectUrl = variant.redirectUrl;
      }
      resExp.changes = [...variant.changes];
      resExp.globalCSS = globalCSS;
      resExp.globalJavascript = globalJavascript;

      if (isDeployed) {
        resExp.deployed = true;
      }
    }

    return c.json(response);
  } catch (ex) {
    throw errors.INTERNAL_SERVER_ERROR(ex.message, {});
  }
};
