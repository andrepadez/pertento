import { db, eq, Websites, Companies } from 'pertentodb';
import { companiesCache } from '@/cache';
const { BUILD_ENV } = process.env;
const isProduction = BUILD_ENV === 'production';

export const orgAndWebsiteMiddleware = async (ctx, next) => {
  const { user, token, nextUrl } = ctx.var;
  const referer = ctx.req.header('referer');
  const refererUrl = referer && new URL(ctx.req.header('referer'));
  const org = ctx.req.query('org') || refererUrl?.searchParams.get('org');
  const ws = ctx.req.query('ws') || refererUrl?.searchParams.get('ws');

  const isAgency = !user.parentCompanyId;

  let companies = companiesCache.get(user.companyId);

  if (!companies) {
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

  companiesCache.set(user.companyId, companies);

  ctx.set(isAgency ? 'companies' : 'company', companies);

  if (!org) {
    const url = new URL(nextUrl);
    url.searchParams.set('org', companies[0].id);
    url.searchParams.set('ws', companies[0].websites[0]?.id);
    url.protocol = isProduction ? 'https' : 'http';
    return ctx.redirect(url.toString());
  } else {
    const url = new URL(nextUrl);
    const company = companies.find((company) => company.id === +org);
    const websiteIsWs = company.websites.find((website) => website.id === +ws);
    if (!websiteIsWs) {
      const website = company.websites[0];
      url.searchParams.set('org', org);
      url.searchParams.set('ws', website.id);
      return ctx.redirect(url.toString());
    } else {
      const website = company.websites.find((site) => site.id === +ws);
      ctx.set('company', company);
      ctx.set('website', website);
      return next();
    }
  }
  return next();
};

// if (ws) {
//   const url = new URL(ctx.req.url);
//   url.protocol = isProduction ? 'https' : 'http';
//   const company = companies.find((company) => company.id === +org);
//   url.searchParams.set('ws', company?.websites[0]?.id);
//   // return ctx.redirect(url.toString());
// } else {
//   const company = companies.find((company) => company.id === +org);
//   const website = company.websites.find((website) => website.id === +ws) || company.websites[0];
//   ctx.set('company', company);
//   ctx.set('website', website);
// }
