import client from 'redis-client';

export const testDataMiddleware = async (c, next) => {
  await next();
  const now = Date.now();
  const nowValue = now.valueOf();
  const { websiteId } = c.req.query();
  const data = JSON.stringify(c.req.body.data);
  await client.HSET(`PERTENTO:TESTDATA:${websiteId}`, nowValue, data);
};

export const testDataHandler = async (c) => {
  return c.json({ ok: true });
};
