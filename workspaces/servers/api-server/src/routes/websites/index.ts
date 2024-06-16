import { Hono } from 'hono-server';
import { db, eq, isNull, and, desc, inArray } from 'pertentodb';
import { GanEventTags, GanProperties, Websites, Experiments, VisitorCount } from 'pertentodb';

export const websitesRouter = new Hono();

websitesRouter.get('/:companyId', async (c) => {
  const { companyId } = c.req.param();

  const websites = await db.query.Websites.findMany({
    where: and(eq(Websites.companyId, companyId), eq(Websites.deleted, false)),
    with: { ganProperty: true, ganPropertyTags: true },
  });

  return c.json(websites);
});

websitesRouter.post('/', async (c) => {
  const [website] = await db.insert(Websites).values(c.body).returning();
  return c.json(website);
});

websitesRouter.get('/:websiteId/experiments', async (c) => {
  const { websiteId } = c.req.param();

  const experiments = await db.query.Experiments.findMany({
    where: and(eq(Experiments.websiteId, websiteId), isNull(Experiments.deleted)),
    orderBy: desc(Experiments.createdAt),
    with: { visitorCounts: true, variants: true },
  });

  for (let experiment of experiments) {
    experiment.sessions = experiment.visitorCounts.reduce((acc, vc) => acc + vc.count, 0);
  }

  return c.json(experiments);
});

websitesRouter.delete('/:websiteId', async (c) => {
  const { websiteId } = c.req.param();
  const [website] = await db.update(Websites).set({ deleted: true }).where(eq(Websites.id, websiteId)).returning();
  return c.json(website);
});
