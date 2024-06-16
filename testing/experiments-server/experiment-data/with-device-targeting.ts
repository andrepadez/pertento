import { expect, test } from 'bun:test';
import { getExperimentVariantMap, getExperimentVariantQuery } from './getExperimentVariantMap';
import { USER_AGENTS } from './helpers';
const { VITE_EXPERIMENTS_URL: EXPERIMENTS_URL } = process.env;

export const withDeviceTargeting = (runningExperiments) => {
  const mobileExperiment = runningExperiments.find((experiment) => {
    if (experiment.deviceTargeting.length !== 1) return false;
    return experiment.deviceTargeting.find((target) => target.device === 'Mobile');
  });
  const desktopExperiment = runningExperiments.find((experiment) => {
    if (experiment.deviceTargeting.length !== 1) return false;
    return experiment.deviceTargeting.find((target) => target.device === 'Desktop');
  });
  const tabletExperiment = runningExperiments.find((experiment) => {
    if (experiment.deviceTargeting.length !== 1) return false;
    return experiment.deviceTargeting.find((target) => target.device === 'Tablet');
  });

  test('Mobile target / mobile user-agent', async () => {
    const url = `${EXPERIMENTS_URL}/experiment-data?websiteId=${mobileExperiment.websiteId}`;
    const response = await fetch(url, { headers: { 'User-Agent': USER_AGENTS.mobile } });
    expect(response.status).toBe(200);
    const experimentData = await response.json();
    expect(experimentData).toBeObject();
    expect(experimentData.uuid).toBeString();
    const variantIds = mobileExperiment.variants.map((variant) => variant.id);
    expect(variantIds).toContain(experimentData[`exp-${mobileExperiment.id}`]);
  });

  test('Mobile target / desktop user-agent', async () => {
    const url = `${EXPERIMENTS_URL}/experiment-data?websiteId=${mobileExperiment.websiteId}`;
    const headers = { 'User-Agent': USER_AGENTS.desktop };
    const response = await fetch(url, { headers });
    expect(response.status).toBe(200);
    const experimentData = await response.json();
    expect(experimentData).toBeObject();
    expect(experimentData[`exp-${mobileExperiment.id}`]).toBeFalsy();
  });

  test('Tablet target / tablet user-agent', async () => {
    const url = `${EXPERIMENTS_URL}/experiment-data?websiteId=${tabletExperiment.websiteId}`;
    const response = await fetch(url, { headers: { 'User-Agent': USER_AGENTS.tablet } });
    expect(response.status).toBe(200);
    const experimentData = await response.json();
    expect(experimentData).toBeObject();
    expect(experimentData.uuid).toBeString();
    const variantIds = tabletExperiment.variants.map((variant) => variant.id);
    expect(variantIds).toContain(experimentData[`exp-${tabletExperiment.id}`]);
  });

  test('Tablet target / mobile user-agent', async () => {
    const url = `${EXPERIMENTS_URL}/experiment-data?websiteId=${tabletExperiment.websiteId}`;
    const response = await fetch(url, { headers: { 'User-Agent': USER_AGENTS.desktop } });
    expect(response.status).toBe(200);
    const experimentData = await response.json();
    expect(experimentData).toBeObject();
    expect(experimentData[`exp-${mobileExperiment.id}`]).toBeFalsy();
  });

  test('Desktop target / desktop user-agent', async () => {
    const url = `${EXPERIMENTS_URL}/experiment-data?websiteId=${desktopExperiment.websiteId}`;
    const response = await fetch(url, { headers: { 'User-Agent': USER_AGENTS.desktop } });
    expect(response.status).toBe(200);
    const experimentData = await response.json();
    expect(experimentData).toBeObject();
    expect(experimentData.uuid).toBeString();
    const variantIds = desktopExperiment.variants.map((variant) => variant.id);
    expect(variantIds).toContain(experimentData[`exp-${desktopExperiment.id}`]);
  });

  test('Desktop target / mobile user-agent', async () => {
    const url = `${EXPERIMENTS_URL}/experiment-data?websiteId=${desktopExperiment.websiteId}`;
    const response = await fetch(url, { headers: { 'User-Agent': USER_AGENTS.mobile } });
    expect(response.status).toBe(200);
    const experimentData = await response.json();
    expect(experimentData).toBeObject();
    expect(experimentData[`exp-${desktopExperiment.id}`]).toBeFalsy();
  });

  test('Desktop target / tablet user-agent', async () => {
    const url = `${EXPERIMENTS_URL}/experiment-data?websiteId=${desktopExperiment.websiteId}`;
    const response = await fetch(url, { headers: { 'User-Agent': USER_AGENTS.mobile } });
    expect(response.status).toBe(200);
    const experimentData = await response.json();
    expect(experimentData).toBeObject();
    expect(experimentData[`exp-${desktopExperiment.id}`]).toBeFalsy();
  });
};
