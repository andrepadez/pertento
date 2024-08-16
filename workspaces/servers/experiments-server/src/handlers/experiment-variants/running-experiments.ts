import { db, eq, or, Experiments, Websites, Variants, Changes } from 'pertentodb';
import { UrlTargeting, DeviceTargeting } from 'pertentodb';

export const experiments = {};

const refreshRunningExperiments = async () => {
  const dbExperiments = await db.query.Experiments.findMany({
    where: or(eq(Experiments.status, 'Running'), eq(Experiments.status, 'Deployed')),
    with: {
      website: true,
      variants: { with: { changes: true } },
      urlTargeting: { columns: { url: true, condition: true } },
      deviceTargeting: { columns: { device: true } },
      cookieTargeting: { columns: { cookieName: true, cookieValues: true } },
    },
  });

  const experimentMap = {};

  let runningCount = 0;
  let deployedCount = 0;

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
    if (experiment.status === 'Deployed') {
      experiment.deployedVariant = variants.find((variant) => variant.deployed);
      deployedCount++;
    } else {
      runningCount++;
    }
    experiment.deviceTargeting = deviceTargeting.map((target) => target.device);
    delete experiment.website;

    experimentMap[websiteId] = experimentMap[websiteId] || [];
    experimentMap[websiteId].push(experiment);
  }

  experiments.running = experimentMap;
  return { runningCount, deployedCount };
};

async function loop() {
  const start = performance.now();
  try {
    const { runningCount, deployedCount } = await refreshRunningExperiments();

    const websiteCount = Object.keys(experiments.running).length;
    console.log(new Date(), 'running', runningCount, 'experiments', 'on', websiteCount, 'websites');
    console.log(deployedCount, 'deployed experiments');
  } catch (ex) {
    console.error(ex);
  } finally {
    console.log('took', performance.now() - start, 'ms');
    // setTimeout(loop, 30000);
  }
}

loop();
