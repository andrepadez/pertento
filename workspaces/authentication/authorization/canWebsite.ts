import { db, eq, Websites } from 'pertentodb';

export const canWebsite = async (req, res, next) => {
  const websiteId = req.params.websiteId || req.body.websiteId;
  const user = req.user;

  const website = await db.query.Websites.findFirst({
    where: eq(Websites.id, websiteId),
    with: {
      company: true,
    },
  });

  const { id: companyId, parentCompanyId } = website.company;
  if (![companyId, parentCompanyId].includes(req.user.companyId)) {
    if (user.role !== 'Super Admin') {
      return res.status(403).send('FORBIDDEN');
    }
  }

  req.website = website;

  return next();
};
