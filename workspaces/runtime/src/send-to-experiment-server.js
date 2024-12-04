import { log } from 'helpers/injector/console';
import { createClient } from 'hooks/useClient';
const { VITE_EXPERIMENTS_URL } = import.meta.env;
const WEBSITES_TO_LISTEN = [];

export const setupSendToExperimentsServer = (experimentData, allExpVariantMap) => {
  const experimentsClient = createClient(VITE_EXPERIMENTS_URL);
  const script = document.getElementById('pertentoScript');
  const websiteId = new URL(script.src).searchParams.get('website-id');
  const uuid = experimentData.uuid;
  const expSearch =
    (allExpVariantMap &&
      Object.keys(allExpVariantMap)
        .map((key) => `&exp-${key}=${allExpVariantMap[key]}`)
        .join('')) ||
    '';
  const experimentIds = Array.from(new URLSearchParams(expSearch).keys()).map((key) => +key.split('-').at(1));

  return async (data) => {
    log('sending test data?', websiteId, WEBSITES_TO_LISTEN);
    if (WEBSITES_TO_LISTEN.includes(+websiteId)) {
      console.log('sending test-data to experiments server');
      let url = `/test-data`;
      url += `?websiteId=${websiteId}`;
      experimentsClient.post(url, { data: JSON.stringify(data) });
    }

    const dataToSend = data
      .filter(
        (item) =>
          ['purchase', 'ga4_purchase'].includes(item.event?.toLowerCase()) ||
          item.ecommerce?.purchase ||
          (item[0] === 'event' && item[1] === 'purchase'),
      )

      .map((item) => {
        if (['purchase', 'ga4_purchase'].includes(item.event?.toLowerCase())) {
          return ['purchase', item.ecommerce];
        } else if (item.ecommerce?.purchase) {
          return ['purchase', item.ecommerce.purchase];
        } else if (item[0] === 'event') {
          return [item[1], item[2]];
        }
      });

    if (dataToSend.length === 0) return;
    log('sending data to experiments server', dataToSend);

    let url = `/events`;
    url += `?websiteId=${websiteId}`;
    url += !!uuid ? `&uuid=${uuid}` : '';

    const theExpSearch = expSearch
      .split('&')
      .filter(Boolean)
      .map((item) => item.match(/exp\-(\d+)/)[1])
      .filter((item) => !!localStorage.getItem(`PERTENTO-VISITED-${item}`))
      .map((item) => `&exp-${item}=${allExpVariantMap[item]}`)
      .join('&');

    url += theExpSearch;
    log('posting to', url);
    experimentsClient.post(url, { dataPayload: dataToSend, expSearch: theExpSearch });
  };
};
