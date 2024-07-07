import redisClient from 'redis-client';
import { db, eq, VisitorCount } from 'pertentodb';

const increment = (column, value = 1) => {
  return sql`${column} + ${value}`;
};

const updateVisitorCount = async () => {
  const keys = await redisClient.keys('PERTENTO:VISITORS:*');
  let variantCount = 0;
  for (let key of keys) {
    const byExperiment = await redisClient.HGETALL(key);
    for (let [variantId, count] of Object.entries(byExperiment)) {
      variantCount++;
      await db
        .update(VisitorCount)
        .set({ count: increment(VisitorCount.count, +count) })
        .where(eq(VisitorCount.variantId, +variantId));
    }
    await redisClient.DEL(key);
  }

  return { experiments: keys.length, variants: variantCount };
};

const start = performance.now();
console.log('----------------- Updating Visitor Counts -----------------');
try {
  const { experiments, variants } = await updateVisitorCount();
  console.log('Experiments:', experiments, 'Variants:', variants);
  console.log('Time taken:', performance.now() - start);
  console.log(new Date().toLocaleString());
  console.log('----------------- Updated Visitor Counts -----------------\n\n');
} catch (ex) {
  console.log('error Updating Visitor Counts', ex);
}
