import client from 'redis-client';

export const visitorsMiddleware = async (c, next) => {
  await next();
  const query = c.req.query();
  for (let key of Object.keys(query)) {
    if (key.startsWith('exp-')) {
      const experimentId = key.substring(4);
      const variantId = query[key];
      // console.log('adding visitor', experimentId, variantId);
      addVisitor({ experimentId, variantId });
    }
  }
};

export const visitorsHandler = async (c) => {
  return c.json({});
};

const addVisitor = async (visitor) => {
  const { experimentId, variantId } = visitor;

  // Get current visitor count for experiment and variant
  const count = await client.HGET(`PERTENTO:VISITORS:${experimentId}`, '' + variantId);

  // Increment visitor count if it exists, otherwise set it to 1
  if (count) {
    await client.HINCRBY(`PERTENTO:VISITORS:${experimentId}`, '' + variantId, 1);
  } else {
    await client.HSET(`PERTENTO:VISITORS:${experimentId}`, '' + variantId, '1');
  }
};
