import { db, eq, Changes } from 'pertentodb';

export const createChangeHandler = async (c) => {
  const changes = c.req.body.map((change) => {
    change.userId = change.userId || c.user.id;
    return change;
  });

  if (changes.length === 0) {
    return c.json([]);
  }

  const newChanges = await db.insert(Changes).values(changes).returning();
  return c.json(newChanges);
};
