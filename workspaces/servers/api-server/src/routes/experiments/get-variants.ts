import { db, eq, asc, Variants, Changes } from 'pertentodb';

export const getVariantsHandler = async (c) => {
  const { experimentId } = c.req.param();
  const where = eq(Variants.experimentId, experimentId);

  const variants = await db.query.Variants.findMany({
    where: eq(Variants.experimentId, experimentId),
    orderBy: asc(Variants.createdAt),
    with: { changes: { columns: { id: true } } },
  });

  return c.json(variants);
};
