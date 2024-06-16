import client from 'redis-client';

export const eventsMiddleware = async (c, next) => {
  await next();
  const now = Date.now();
  const timestamp = new Date(now).toISOString();
  const nowValue = now.valueOf();

  const query = c.req.query();
  const { websiteId } = query;

  const experimentVariantMap = Object.keys(query)
    .filter((key) => key.startsWith('exp-'))
    .map((key) => ({ experimentId: +key.replace('exp-', ''), variantId: query[key] }));

  const experimentIds = experimentVariantMap.map((ev) => ev.experimentId);

  for (let event of c.body) {
    if (Array.isArray(event)) {
      // if (event[0] === 'purchase') {
      for (let { experimentId, variantId } of experimentVariantMap) {
        const data = JSON.stringify(event[1]);
        const key = `PERTENTO:DATALAYER:${websiteId}:${experimentId}:${variantId}:${event[0]}`;
        await client.HSET(key, nowValue, data);
        console.log(timestamp, 'saved', key);
      }
      // }
    }
  }
};

export const eventsHandler = async (c) => {
  return c.json({ ok: true });
};
