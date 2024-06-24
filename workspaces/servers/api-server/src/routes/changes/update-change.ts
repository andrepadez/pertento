import { db, eq, Changes } from 'pertentodb';

export const updateChangeHandler = async (c) => {
  const { changeId } = c.req.param();
  const values = c.req.body;
  const where = eq(Changes.id, id);
  await db.update(Changes).set(values).where(where);
  return c.json({ ok: true });
};
