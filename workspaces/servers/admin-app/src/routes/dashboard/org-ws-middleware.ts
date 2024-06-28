import { db, eq, Websites, Companies } from 'pertentodb';
import { TOKENS, COMPANIES } from '@/sessions';

export const orgAndWebsiteMiddleware = async (c, next) => {
  const { user, token } = c.var;
  const { org, ws } = c.req.query();
  const isAgency = !user.parentCompanyId;

  let key = TOKENS.get(token);
  if (!key) {
    key = Symbol(token);
    TOKENS.set(token, key);
    setTimeout(
      () => {
        TOKENS.delete(token);
        COMPANIES.delete(key);
      },
      1000 * 60 * 60,
    );
  }

  let companies = COMPANIES.get(key);
  if (!companies) {
    console.log('querying database for companies');
    if (isAgency) {
      companies = await db.query.Companies.findMany({
        where: eq(Companies.parentCompanyId, user.companyId),
        orderBy: [Companies.name],
        with: {
          websites: {
            where: eq(Websites.deleted, false),
            with: { ganProperty: true, ganPropertyTags: true },
          },
        },
      });
    } else {
      companies = await db.query.Companies.findFirst({
        where: eq(Companies.id, user.companyId),
        with: {
          websites: {
            where: eq(Websites.deleted, false),
            with: { ganProperty: true, ganPropertyTags: true },
          },
        },
      });
    }
  }

  COMPANIES.set(key, companies);

  c.set(isAgency ? 'companies' : 'company', companies);

  if (!c.req.query('org')) {
    const url = new URL(c.req.url);
    url.searchParams.set('org', companies[0].id);
    url.searchParams.set('ws', companies[0].websites[0]?.id);
    return c.redirect(url.toString());
  } else {
    c.set('org', c.req.query('org'));
    c.set('ws', c.req.query('ws'));
  }
  return next();
};
