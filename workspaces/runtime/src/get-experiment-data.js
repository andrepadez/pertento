import { log } from 'helpers/injector/console';
import { createClient } from 'hooks/useClient';
const { VITE_EXPERIMENTS_URL } = import.meta.env;

export const getExperimentData = async (websiteUrl, websiteId) => {
  const experimentsClient = createClient(VITE_EXPERIMENTS_URL);
  log('experimentsClient.baseUrl', experimentsClient.baseUrl);
  let url = `/experiment-data?websiteId=${websiteId}`;
  // check if there's already a unique visitor id in local storage
  const uuid = localStorage.getItem('PERTENTO_UUID');
  // check for exiting chosen variants in local storage
  const lsVariantsUrlSearch = localStorage.getItem('PERTENTO_VARIANTS_URL_SEARCH');
  if (uuid) url += `&uuid=${uuid}`;
  if (lsVariantsUrlSearch && lsVariantsUrlSearch !== 'null') url += lsVariantsUrlSearch;
  const response = await experimentsClient.get(url);

  if (Object.keys(response).length === 0) return {};

  if (!uuid && response.uuid) {
    localStorage.setItem('PERTENTO_UUID', response.uuid);
  }

  response.variantsUrlSearch =
    response.variantsUrlSearch ||
    Object.keys(response).reduce((acc, key) => {
      if (key.startsWith('exp-')) {
        acc += `&${key}=${response[key]}`;
      }
      return acc;
    }, '');

  if (response.variantsUrlSearch) {
    localStorage.setItem('PERTENTO_VARIANTS_URL_SEARCH', response.variantsUrlSearch);
  }

  return response;
};
