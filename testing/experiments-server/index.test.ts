import { expect, test, describe, beforeAll, afterAll } from 'bun:test';
import { db, eq, and, Users, Experiments } from 'pertentodb';
import { experimentData } from './experiment-data';
const { VITE_EXPERIMENTS_URL: EXPERIMENTS_URL } = process.env;

describe('Experiments Server', () => {
  let runningExperiments = null;

  beforeAll(async () => {
    const experiments = await db.query.Experiments.findMany({
      where: and(eq(Experiments.status, 'Running'), eq(Experiments.websiteId, 2993)),
      with: {
        website: true,
        variants: { with: { changes: true } },
        urlTargeting: { columns: { url: true, condition: true } },
        deviceTargeting: { columns: { device: true } },
      },
    });
    runningExperiments = experiments;
  });

  describe(`it's alive`, () => {
    test('should return 200', async () => {
      const response = await fetch(EXPERIMENTS_URL);
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.pertentoExperimentsServer).toBeTruthy();
    });
  });

  describe('experiment-data', () => {
    experimentData(runningExperiments);
  });
});
