import { db, eq, Websites, Companies } from 'pertentodb';
import { TOKENS, COMPANIES } from '@/cache';
const { BUILD_ENV } = process.env;
const isProduction = BUILD_ENV === 'production';

export const orgAndWebsiteMiddleware = async (c, next) => {
  const { user, token } = c.var;
  const referer = c.req.header('referer');
  const refererUrl = referer && new URL(c.req.header('referer'));
  const org = c.req.query('org') || refererUrl?.searchParams.get('org');
  const ws = c.req.query('ws') || refererUrl?.searchParams.get('ws');

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

  if (!org) {
    const url = new URL(c.req.url);
    url.searchParams.set('org', companies[0].id);
    url.searchParams.set('ws', companies[0].websites[0]?.id);
    url.protocol = isProduction ? 'https' : 'http';
    return c.redirect(url.toString());
  } else if (!ws) {
    const url = new URL(c.req.url);
    url.protocol = isProduction ? 'https' : 'http';
    const company = companies.find((company) => company.id === +org);
    url.searchParams.set('ws', company?.websites[0]?.id);
    return c.redirect(url.toString());
  } else {
    const company = companies.find((company) => company.id === +org);
    const website = company.websites.find((website) => website.id === +ws) || company.websites[0];
    c.set('company', company);
    c.set('website', website);
  }
  return next();
};
