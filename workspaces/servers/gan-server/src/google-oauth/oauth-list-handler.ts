import { db, eq, asc, GanOauth } from 'pertentodb';

export const oauthListHandler = async (c) => {
  const oAuthAccounts = await db.query.GanOauth.findMany({
    where: eq(GanOauth.companyId, c.user.companyId),
    orderBy: asc(GanOauth.name),
  });

  return c.json(oAuthAccounts);
};
