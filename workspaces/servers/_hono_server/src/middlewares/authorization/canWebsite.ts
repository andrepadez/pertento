import { db, eq, Websites } from 'pertentodb';

export const canWebsite = async (c, next) => {
  const websiteId = c.req.param('websiteId') || c.req.body?.websiteId;
  const user = c.user;

  const website = await db.query.Websites.findFirst({
    where: eq(Websites.id, websiteId),
    with: {
      company: true,
    },
  });

  const { id: companyId, parentCompanyId } = website.company;
  if (![companyId, parentCompanyId].includes(c.user.companyId)) {
    if (user.role !== 'Super Admin') {
      return res.status(403).send('FORBIDDEN');
    }
  }

  c.website = website;

  return next();
};
