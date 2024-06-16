import { expect, test } from 'bun:test';
import { getExperimentVariantMap, getExperimentVariantQuery } from './getExperimentVariantMap';
import { USER_AGENTS } from './helpers';
const { VITE_EXPERIMENTS_URL: EXPERIMENTS_URL } = process.env;

export const withNoDeviceTargeting = (runningExperiments) => {
  const experiment = runningExperiments.find((experiment) => experiment.deviceTargeting.length === 0);
  if (!experiment) return null;
  const headers = { 'User-Agent': USER_AGENTS.desktop };
  let experimentVariantMap = null;
  let experimentVariantString = null;

  test('should return experiment data', async () => {
    const url = `${EXPERIMENTS_URL}/experiment-data?websiteId=${experiment.websiteId}`;
    const response = await fetch(url, { headers });
    expect(response.status).toBe(200);
    const experimentData = await response.json();
    expect(experimentData).toBeObject();
    experimentVariantMap = await getExperimentVariantMap(experimentData);
    experimentVariantString = await getExperimentVariantQuery(experimentVariantMap);
  });

  test('should return different variants, on multiple fresh requests', async () => {
    const target = experiment.variants.length;
    const returnedVariants = [];

    for (let i = 0; i < experiment.variants.length * 50; i++) {
      const url = `${EXPERIMENTS_URL}/experiment-data?websiteId=${experiment.websiteId}`;
      const response = await fetch(url, { headers });
      expect(response.status).toBe(200);
      const experimentData = await response.json();
      const experimentVariantMap = await getExperimentVariantMap(experimentData);

      const chosenVariant = experimentData['exp-' + experiment.id];
      if (!returnedVariants.includes(chosenVariant)) {
        returnedVariants.push(chosenVariant);
        if (returnedVariants.length === target) {
          break;
        }
      }
    }
    expect(returnedVariants.length).toBe(target);
  });

  test('should return the same variant, on multiple requests with the same uuid', async () => {
    const queryString = `?websiteId=${experiment.websiteId}&uuid=1234&${experimentVariantString}`;
    const url = `${EXPERIMENTS_URL}/experiment-data${queryString}`;
    for (let i = 0; i < 10; i++) {
      const response = await fetch(url, { headers });
      expect(response.status).toBe(200);
      const experimentData = await response.json();
      const experimentVariantMap = await getExperimentVariantMap(experimentData);
      const chosenVariant = experimentVariantMap[experiment.id];
      expect(chosenVariant).toBe(experimentVariantMap[experiment.id]);
    }
  });
};
