import { db, eq, Experiments, Websites, Variants, Changes } from 'pertentodb';
import { UrlTargeting, DeviceTargeting } from 'pertentodb';

export const experiments = {};

const refreshRunningExperiments = async () => {
  const dbExperiments = await db.query.Experiments.findMany({
    where: eq(Experiments.status, 'Running'),
    with: {
      website: true,
      variants: { with: { changes: true } },
      urlTargeting: { columns: { url: true, condition: true } },
      deviceTargeting: { columns: { device: true } },
      cookieTargeting: { columns: { cookieName: true, cookieValues: true } },
    },
  });

  const experimentMap = {};

  let i = 0;
  for (let dbExperiment of dbExperiments) {
    const { id: websiteId, ganMeasurementId, serverContainerUrl } = dbExperiment.website;
    const { variants, deviceTargeting, cookieTargeting } = dbExperiment;
    const experiment = { ...dbExperiment };
    experiment.ganMeasurementId = ganMeasurementId;
    experiment.serverContainerUrl = serverContainerUrl;
    experiment.cookieTargeting = cookieTargeting;
    experiment.variants = variants.reduce((acc, variant) => {
      acc[variant.id] = variant;
      return acc;
    }, {});
    experiment.deviceTargeting = deviceTargeting.map((target) => target.device);
    delete experiment.website;

    experimentMap[websiteId] = experimentMap[websiteId] || [];
    experimentMap[websiteId].push(experiment);
  }

  return experimentMap;
};

async function loop() {
  const start = performance.now();
  try {
    experiments.running = await refreshRunningExperiments();
    const count = Object.values(experiments.running).reduce((acc, values) => acc + values.length, 0);

    const websiteCount = Object.keys(experiments.running).length;
    console.log(new Date(), 'running', count, 'experiments', 'on', websiteCount, 'websites');
  } catch (ex) {
    console.error(ex);
  } finally {
    console.log('took', performance.now() - start, 'ms');
    setTimeout(loop, 30000);
  }
}

loop();
