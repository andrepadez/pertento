import { get as idbGet, set as idbSet, del as idbDel } from 'idb-keyval';
import { log } from 'helpers/injector/console';
import { createClient } from 'hooks/useClient';
const { VITE_EXPERIMENTS_URL } = import.meta.env;

export const registerVisitor = async function ({ websiteId, expVariantMap }) {
  log('registerVisitor');
  const experimentsClient = createClient(VITE_EXPERIMENTS_URL);
  let url = `/visitors?websiteId=${websiteId}`;

  let count = 0;
  for (let [expId, variantId] of Object.entries(expVariantMap)) {
    const lsKey = 'PERTENTO-VISITED-' + expId;
    log(lsKey);
    const hasVisited = (await idbGet(lsKey)) || localStorage.getItem(lsKey);
    idbSet(lsKey, true);
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
