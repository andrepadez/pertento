import { log } from 'helpers/injector/console';
import { applyChanges, applyGlobals } from 'helpers/injector/apply-changes';
import { checkUrlTargeting } from 'helpers/url-match';
import { listenForUrlChange } from 'helpers/listen-for-url-changes';
import { registerVisitor } from './register-visitor';

export const runExperiments = (experimentData = {}, websiteId) => {
  log('runExperiments');
  const data = getExperimentsByUrlTarget(experimentData);
  const { expVariantMap, experimentsToCount } = data;

  for (let experiment of experimentsToCount) {
    applyGlobals(document.body, experiment);
    applyChanges(document.body, experiment.changes);
  }

  registerVisitor({ websiteId, expVariantMap });

  listenForUrlChange((url) => {
    log('url changed', url);
    runExperiments(experimentData, websiteId);
  });

  return data;
};

const getExperimentsByUrlTarget = (experimentData) => {
  const { experiments } = experimentData;
  if (!experiments) return { expVariantMap: {}, experimentsToCount: [] };

  const allExpVariantMap = {};
  const expVariantMap = {};
  const experimentsToCount = [];

  for (let [expId, experiment] of Object.entries(experiments)) {
    const hasHitUrlTargeting = checkUrlTargeting(experiment.urlTargeting);
    log('hasHitUrlTargeting', expId, hasHitUrlTargeting);
    const variantId = experimentData['exp-' + expId];
    log('variantId', expId, variantId);
    allExpVariantMap[expId] = variantId;
    if (!hasHitUrlTargeting) continue;
    experimentsToCount.push(experiment);
    expVariantMap[expId] = variantId;
  }

  return { expVariantMap, experimentsToCount, allExpVariantMap };
};
