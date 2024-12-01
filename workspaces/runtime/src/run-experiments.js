import { log } from 'helpers/injector/console';
import { applyChanges, applyGlobals } from 'helpers/injector/apply-changes';
import { checkUrlTargeting } from 'helpers/url-match';
import { matchCookieTargeting } from 'helpers/injector/cookie-target-match';
import { listenForUrlChange } from 'helpers/listen-for-url-changes';
import { registerVisitor } from './register-visitor';
let mutationObserver = null;

export const runExperiments = (experimentData = {}, websiteId) => {
  mutationObserver?.disconnect();
  const data = getExperimentsByUrlTarget(experimentData);
  const { expVariantMap, experimentsToCount } = data;

  const allChanges = [];
  for (let experiment of experimentsToCount) {
    log('experiment.type', experiment.id, experiment.type);
    if (experiment.type === 'URL Redirect') {
      const variantId = expVariantMap[experiment.id];
      registerVisitor({ websiteId, expVariantMap, rawExperimentData: experimentData.experiments });
      return window.location.replace(experiment.redirectUrl);
    }
    applyGlobals(document.body, experiment);
    allChanges.push(...experiment.changes);
  }

  let unfoundChanges = applyChanges(document.body, allChanges);

  if (unfoundChanges.length > 0) {
    mutationObserver = new MutationObserver(() => {
      unfoundChanges = applyChanges(document.body, unfoundChanges);
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });
  }

  registerVisitor({ websiteId, expVariantMap, rawExperimentData: experimentData.experiments });

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
    log('hasHitUrlTargeting', expId, hasHitUrlTargeting, experiment.urlTargeting);
    const variantId = experimentData['exp-' + expId];
    log('variantId', expId, variantId);
    allExpVariantMap[expId] = variantId;
    if (!hasHitUrlTargeting) continue;
    const cookieMatch = matchCookieTargeting(document.cookie, experiment.cookieTargeting);
    log('cookieMatch', expId, cookieMatch);
    if (!cookieMatch) continue;
    experimentsToCount.push({ ...experiment, id: expId });
    expVariantMap[expId] = variantId;
  }

  return { expVariantMap, experimentsToCount, allExpVariantMap };
};
