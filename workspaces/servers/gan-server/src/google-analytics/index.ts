import { Hono } from 'hono-server';
import { db, eq, GanEventTags, Variants } from 'pertentodb';
import { refreshPropertyTags } from './property-tags';
import { createAudienceForVariant } from './create-audience';

export const googleAnalyticsRouter = new Hono();

googleAnalyticsRouter.post('/refresh-property-tags/:ganPropertyId', async (c) => {
  const { ganPropertyId } = c.req.param();
  await refreshPropertyTags(ganPropertyId);
  const where = eq(GanEventTags.ganPropertyId, ganPropertyId);
  const updatedTags = await db.select().from(GanEventTags).where(where);
  return c.json(updatedTags);
});

googleAnalyticsRouter.post('/create-audiences/:experimentId', async (c) => {
  const { experimentId } = c.req.param();
  const variants = await db.select().from(Variants).where(eq(Variants.experimentId, experimentId));
  for (let variant of variants) {
    const ganAudienceId = await createAudienceForVariant(variant.id);
    await db.update(Variants).set({ ganAudienceId }).where(eq(Variants.id, variant.id));
  }
  return c.json({ ok: true });
});
