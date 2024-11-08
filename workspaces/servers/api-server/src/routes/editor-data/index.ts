import { Hono, canVariant, canExperiment, canWebsite } from 'hono-server';
import { db, eq, and, asc, desc, inArray, Experiments, Variants, Changes, Users } from 'pertentodb';
import * as errors from 'custom-errors';
export const editorDataRouter = new Hono();

editorDataRouter.get('/variant/:variantId', canVariant, async (c) => {
  return c.json(c.variant);
});

editorDataRouter.get('/variant/:variantId/changes', canVariant, async (c) => {
  const { variantId } = c.req.param();
  const variant = c.variant;
  if (!variant) throw errors.NOT_FOUND();
  const { globalJavascript, globalCSS } = variant;

  const changes = await db.query.Changes.findMany({
    where: eq(Changes.variantId, variantId),
    orderBy: asc(Changes.id),
    with: {
      user: {
        columns: { id: true, firstName: true, lastName: true },
      },
    },
  });

  return c.json([
    { globalJavascript, globalCSS },
    ...changes
      .toSorted((a, b) => (a.property === 'html' ? 1 : b.property === 'html' ? -1 : 0))
      .map((change) => {
        const user = change.user;
        const { firstName, lastName } = user;
        delete change.user;
        return { ...change, changedBy: `${firstName} ${lastName}` };
      }),
  ]);
});

editorDataRouter.get('/experiment/:experimentId', canExperiment, async (c) => {
  const { experimentId } = c.req.param();
  const experiment = await db.query.Experiments.findFirst({
    where: eq(Experiments.id, +experimentId),
  });

  return c.json(experiment);
});

editorDataRouter.get('/variants/:experimentId', canExperiment, async (c) => {
  const { experimentId } = c.req.param();
  const where = eq(Variants.experimentId, experimentId);
  const variants = await db.query.Variants.findMany({
    where: eq(Variants.experimentId, experimentId),
  });
  return c.json(variants);
});

editorDataRouter.get('/websites/:websiteId/experiments', canWebsite, async (c) => {
  const { websiteId } = c.req.param();
  const experiments = await db.query.Experiments.findMany({
    where: and(eq(Experiments.websiteId, websiteId)),
    with: { variants: { with: { changes: true } } },
    orderBy: desc(Experiments.id),
  });
  return c.json(experiments);
});
