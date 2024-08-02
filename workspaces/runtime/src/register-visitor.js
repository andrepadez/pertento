import { log } from 'helpers/injector/console';
import { createClient } from 'hooks/useClient';
const { VITE_EXPERIMENTS_URL } = import.meta.env;

export const registerVisitor = async function ({ websiteId, expVariantMap, rawExperimentData }) {
  log('registerVisitor');
  const experimentsClient = createClient(VITE_EXPERIMENTS_URL);
  let url = `/visitors?websiteId=${websiteId}`;

  let count = 0;
  for (let [expId, variantId] of Object.entries(expVariantMap)) {
    const lsKey = 'PERTENTO-VISITED-' + expId;
    log(lsKey);
    let hasVisited = localStorage.getItem(lsKey);
    const rawExperiment = rawExperimentData[expId];
    if (hasVisited === 'true' && rawExperiment.deployed) {
      log('Register Visitor Deployed', { expId, variantId });
      localStorage.setItem(lsKey, 'deployed');
      url += `&exp-${expId}=${variantId}`;
      count++;
    }
    localStorage.setItem(lsKey, true);
    if (!hasVisited) {
      url += `&exp-${expId}=${variantId}`;
      count++;
    }
  }

  if (count > 0) {
    experimentsClient.post(url);
  }
};
