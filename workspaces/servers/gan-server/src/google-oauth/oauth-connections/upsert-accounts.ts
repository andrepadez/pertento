import { db, eq, sql, GanAccounts, Companies } from 'pertentodb';

export const upsertAccounts = async (accountSummaries, companyId) => {
  const dbGanAccountIds = await db.execute(sql`SELECT DISTINCT ${Companies.ganAccountId} FROM ${Companies}`);

  const ganAccountIds = new Set(dbGanAccountIds.map((ga) => +ga.gan_account_id));

  for (let ganAccount of accountSummaries) {
    const { displayName } = ganAccount;
    const [, ganAccountId] = ganAccount.name.split('/');

    const exists = ganAccountIds.has(+ganAccountId);
    if (exists || ganAccount.propertySummaries?.length === 0 || !ganAccount.propertySummaries) {
      continue;
    }

    const newCompany = {
      name: displayName,
      friendlyName: displayName,
      ganAccountId: +ganAccountId,
      parentCompanyId: companyId,
    };

    await db.insert(Companies).values(newCompany);
  }

  const clientAccounts = await db.query.Companies.findMany({
    where: eq(Companies.parentCompanyId, companyId),
  });

  return { clientAccounts };
};
