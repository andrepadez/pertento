import client from 'redis-client';

export const addVisitor = async (visitor) => {
  const { visitorId, experimentId, variantId } = visitor;
  console.log('adding visitor', visitorId, experimentId, variantId);

  // Get current visitor count for experiment and variant
  const count = await client.HGET(`PERTENTO:VISITORS:${experimentId}`, '' + variantId);

  // Increment visitor count if it exists, otherwise set it to 1
  if (count) {
    await client.HINCRBY(`PERTENTO:VISITORS:${experimentId}`, '' + variantId, 1);
  } else {
    await client.HSET(`PERTENTO:VISITORS:${experimentId}`, '' + variantId, '1');
  }
};
