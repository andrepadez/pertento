import { db, eq, and, gte, lt, desc, asc } from 'pertentodb';
import { statisticsdb, Statistics, ExperimentData } from 'statisticsdb';

const aggregateData = async () => {
  const now = new Date().valueOf();
  const max = new Date();
  const firstItem = await statisticsdb.query.ExperimentData.findFirst({ orderBy: asc(ExperimentData.timestamp) });
  const lastStatistics = await statisticsdb.query.Statistics.findFirst({ orderBy: desc(Statistics.from) });
  const min = new Date(lastStatistics?.from || firstItem.timestamp);

  min.setHours(min.getHours(), 0, 0, 0, 0);

  let currentTime = min.valueOf();
  const lastTime = now.valueOf();

  while (currentTime < lastTime) {
    currentTime += 1000 * 60 * 60;
    const items = await statisticsdb.query.ExperimentData.findMany({
      where: and(
        gte(ExperimentData.timestamp, currentTime - 1000 * 60 * 60),
        lt(ExperimentData.timestamp, currentTime),
      ),
    });

    const theData = {};

    for (let item of items) {
      const { timestamp, websiteId, experimentId, variantId, event, data } = item;
      if (!data) continue;

      theData[websiteId] = theData[websiteId] || {};
      const websiteData = theData[websiteId];
      websiteData[experimentId] = websiteData[experimentId] || {};
      const experimentData = websiteData[experimentId];
      experimentData[variantId] = experimentData[variantId] || {};
      const variantData = experimentData[variantId];

      const currencyCode = data.currencyCode || data.currency || 'nill';
      variantData[currencyCode] = variantData[currencyCode] || { count: 0, value: 0 };
      const currencyData = variantData[currencyCode];

      const { revenue, value, tax, shipping } = data.actionField || data;

      const theRevenue = safeSum(+(revenue || value), +tax, +shipping);
      currencyData.count++;
      currencyData.value += theRevenue;
    }

    let insertCount = 0;
    for (let [websiteId, websiteData] of Object.entries(theData)) {
      for (let [experimentId, experimentData] of Object.entries(websiteData)) {
        for (let [variantId, variantData] of Object.entries(experimentData)) {
          for (let [currencyCode, currencyData] of Object.entries(variantData)) {
            const { count, value } = currencyData;
            const dbItem = {
              from: currentTime,
              websiteId,
              experimentId,
              variantId,
              currencyCode,
              value,
              count,
            };

            await statisticsdb.insert(Statistics).values(dbItem);
            insertCount++;
          }
        }
      }
    }
  }

  console.log('Inserted Statistics', { insertCount, websiteCount });
};

const multiplyByHundred = (number) => (isNaN(number) ? 0 : +(+(number || 0).toFixed(2).replace('.', '')));

const safeSum = (...args) => args.reduce((acc, val) => acc + multiplyByHundred(val), 0);

const start = performance.now();
console.log('----------------- Aggregating Data -----------------');
try {
  await aggregateData();
  console.log('Time taken:', performance.now() - start);
  console.log(new Date().toLocaleString());
  console.log('----------------- Finished Aggregating Data -----------------\n\n');
} catch (ex) {
  console.log('error Aggregating Data Counts', ex);
}
