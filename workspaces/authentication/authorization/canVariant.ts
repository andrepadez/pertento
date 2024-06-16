import { db, eq, Variants } from 'pertentodb';

export const canVariant = async (req, res, next) => {
  const variantId = req.params.variantId || req.body.variantId;
  if (!variantId || isNaN(variantId)) return next();

  const variant = await db.query.Variants.findFirst({
    where: eq(Variants.id, variantId),
  });

  const { companyId, parentCompanyId } = variant;

  if (![companyId, parentCompanyId].includes(req.user.companyId)) {
    if (req.user.role !== 'Super Admin') {
      return res.status(403).send('FORBIDDEN');
    }
  }

  req.variant = variant;

  return next();
};
