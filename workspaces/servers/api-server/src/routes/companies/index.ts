import { Hono } from 'hono-server';
import { db, eq, Companies, Websites } from 'pertentodb';

export const companiesRouter = new Hono();

companiesRouter.get('/:companyId/clients', async (c) => {
  const { companyId } = c.req.param();

  const companies = await db.query.Companies.findMany({
    where: eq(Companies.parentCompanyId, companyId),
    orderBy: [Companies.name],
    with: {
      websites: {
        where: eq(Websites.deleted, false),
        with: { ganProperty: true, ganPropertyTags: true },
      },
    },
  });

  return c.json(companies);
});

companiesRouter.post('/', async (c) => {
  const newCompany = { ...c.req.body };
  newCompany.friendlyName = c.req.body.name;
  if (!newCompany.parentCompanyId) {
    newCompany.parentCompanyId = c.user.company.id;
  }

  const [dbCompany] = await db.insert(Companies).values(newCompany).returning();
  return c.json(dbCompany);
});

companiesRouter.put('/:companyId', async (c) => {
  const companyId = +c.req.param('companyId');
  const [dbCompany] = await db.update(Companies).set(c.req.body).where(eq(Companies.id, companyId)).returning();
  return c.json(dbCompany);
});

companiesRouter.delete('/:companyId', async (c) => {
  const companyId = +c.req.param('companyId');
  await db.delete(Companies).where(eq(Companies.id, companyId));
  return c.json({ ok: true });
});
