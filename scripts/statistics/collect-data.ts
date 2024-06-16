import { statisticsdb, ExperimentData } from 'statisticsdb';
import redisClient from 'redis-client';

const collectData = async () => {
  const start = performance.now();
  const keys = await redisClient.keys('PERTENTO:DATALAYER:*');
  keys.sort((a, b) => +a.split(':').at(2) - +b.split(':').at(2));

  let latestWebsiteId = null;
  let websiteCount = 0;
  let itemCount = 0;
  for (let key of keys) {
    const [, , websiteId, experimentId, variantId, event] = key.split(':');
    if (websiteId !== latestWebsiteId) {
      latestWebsiteId = websiteId;
      websiteCount++;
    }
    // console.log(websiteId);
    const byVariant = await redisClient.HGETALL(key);
    for (let [timestamp, item] of Object.entries(byVariant)) {
      const data = JSON.parse(item);
      await statisticsdb.insert(ExperimentData).values({ timestamp, websiteId, experimentId, variantId, event, data });
      await redisClient.HDEL(key, timestamp);
      itemCount++;
    }
  }
  console.log('Collected ExperimentData', { websiteCount, itemCount });
  const end = performance.now();
  console.log('took', end - start, 'ms');
};

const start = performance.now();
console.log('----------------- Collecting Data -----------------');
try {
  await collectData();
  console.log('Time taken:', performance.now() - start);
  console.log(new Date().toLocaleString());
  console.log('----------------- Finished Collecting Data -----------------\n\n');
} catch (ex) {
  console.log('error', ex);
}
console.log('');
console.log('');
