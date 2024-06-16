import { describe } from 'bun:test';
import { withNoDeviceTargeting } from './no-device-targeting';
import { withDeviceTargeting } from './with-device-targeting';

export const experimentData = (runningExperiments) => {
  describe('no device targeting', () => {
    withNoDeviceTargeting(runningExperiments);
  });

  describe('with device targeting', () => {
    withDeviceTargeting(runningExperiments);
  });
};
