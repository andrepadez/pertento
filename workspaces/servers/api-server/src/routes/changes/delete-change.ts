import { db, eq, Changes } from 'pertentodb';

export const deleteChangeHandler = async (c) => {
  const { changeId } = c.req.param();
  const where = eq(Changes.id, changeId);
  await db.delete(Changes).where(where);
  return c.json({ ok: true });
};

export const deleteAllChangesHandler = async (c) => {
  const { variantId } = c.req.param();
  const where = eq(Changes.variantId, variantId);
  await db.delete(Changes).where(where);

  return c.json({ ok: true });
};
