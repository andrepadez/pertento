import { db, eq, Variants } from 'pertentodb';
import * as errors from 'custom-errors';

export const canVariant = async (c, next) => {
  const variantId = c.req.param('variantId') || c.body?.variantId;
  if (!variantId || isNaN(variantId)) return next();

  const variant = await db.query.Variants.findFirst({
    where: eq(Variants.id, +variantId),
  });

  const { companyId, parentCompanyId } = variant;
  if (![companyId, parentCompanyId].includes(c.user.companyId)) {
    if (c.user.role !== 'Super Admin') {
      throw errors.FORBIDDEN();
    }
  }

  c.variant = variant;

  return next();
};
