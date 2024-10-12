import client from 'redis-client';

export const eventsMiddleware = async (c, next) => {
  await next();
  console.log(c.req.url);
  const now = Date.now();
  const timestamp = new Date(now).toISOString();
  const nowValue = now.valueOf();

  const query = c.req.query();
  const { websiteId } = query;

  const experimentVariantMap =
    c.req.body.expSearch
      ?.split('&')
      .filter(Boolean)
      .map((item) => {
        const [expId, variant] = item.split('=');
        return { expId: expId.replace('exp-', ''), variant };
      }) || [];

  const experimentIds = experimentVariantMap.map((ev) => ev.experimentId);

  console.log('event', !!c.req.body.dataPayload, !!c.req.body, c.req.body.expSearch || 'old');
  for (let event of c.req.body.dataPayload || c.req.body) {
    if (Array.isArray(event)) {
      for (let { experimentId, variantId } of experimentVariantMap) {
        const data = JSON.stringify(event[1]);
        const key = `PERTENTO:DATALAYER:${websiteId}:${experimentId}:${variantId}:${event[0]}`;
        await client.HSET(key, nowValue, data);
        const actionField = event[1]?.actionField || event[1];
        const { revenue, value } = actionField || {};
        console.log(timestamp, 'saved', key, value || revenue);
      }
    }
  }
};

export const eventsHandler = async (c) => {
  return c.json({ ok: true });
};
