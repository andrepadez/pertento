import { db, eq, GanProperties, inArray, Websites } from 'pertentodb';
import { checkForEditPermissions } from './check-for-edit-permissions';
import { refreshAccessToken } from '../refresh-access-token';

export const upsertProperties = async (args) => {
  const { accountSummaries, clientAccounts, analyticsAdmin, oauthAccount } = args;

  const accessTokens = {};

  const websites = await db.query.Websites.findMany({
    where: eq(Websites.companyId, oauthAccount.companyId),
  });

  const ganPropertyIds = accountSummaries.reduce((array, item) => {
    if (!item.propertySummaries) return array;
    array.push(...item.propertySummaries.map((prop) => +prop.property.replace('properties/', '')));
    return array;
  }, []);

  if (ganPropertyIds.length === 0) {
    return;
  }

  const dbGanProperties = await db.query.GanProperties.findMany({
    where: inArray(GanProperties.id, ganPropertyIds),
  });

  const perAccount = 100 / accountSummaries.length;
  let percentDone = 0;

  let count = 0;
  for (let ganAccount of accountSummaries) {
    if (!ganAccount.propertySummaries) continue;
    const [, accountId] = ganAccount.name.split('/');
    const perProperty = perAccount / ganAccount.propertySummaries.length;

    for (let ganProperty of ganAccount.propertySummaries) {
      const [, id] = ganProperty.property.split('/');
      percentDone += perProperty;

      const { displayName: name, propertyType: type } = ganProperty;
      let dbGanProperty = dbGanProperties.find((prop) => prop.id === +id);

      const { data: dataStreamData } = await analyticsAdmin.properties.dataStreams.list({
        parent: ganProperty.property,
      });

      if (!dataStreamData.dataStreams || dataStreamData.dataStreams.length === 0) {
        continue;
      }

      const { email } = oauthAccount;
      let accessToken = accessTokens[email];
      if (!accessToken) {
        accessToken = await refreshAccessToken(oauthAccount.refreshToken);
        accessTokens[email] = accessToken;
      }

      const canEdit = await checkForEditPermissions(id, accessToken);

      if (!dbGanProperty) {
        const hasReadPermission = [email];
        const hasEditPermission = canEdit ? [email] : [];
        const values = { id, accountId, name, type, hasReadPermission, hasEditPermission };
        [dbGanProperty] = await db.insert(GanProperties).values(values).returning();
      } else {
        const hasReadPermission = dbGanProperty.hasReadPermission;
        const hasEditPermission = dbGanProperty.hasEditPermission;
        const values = {};
        if (!hasReadPermission.includes(email)) {
          values.hasReadPermission = [...hasReadPermission, email];
        }
        if (!hasEditPermission.includes(email) && canEdit) {
          values.hasEditPermission = [...hasEditPermission, email];
        }
        if (hasEditPermission.includes(email) && !canEdit) {
          values.hasEditPermission = hasEditPermission.filter((p) => p !== email);
        }
        if (Object.keys(values).length > 0) {
          await db.update(GanProperties).set(values).where(eq(GanProperties.id, id));
        }
      }

      const clientAccount = clientAccounts.find((ca) => ca.ganAccountId === +accountId);

      for (let dataStream of dataStreamData.dataStreams) {
        if (!dataStream.webStreamData) continue;
        const { measurementId, defaultUri } = dataStream.webStreamData;

        const dbWebsite = await db.query.Websites.findFirst({
          where: eq(Websites.ganMeasurementId, measurementId),
        });

        if (!!dbWebsite) continue;

        const newWebsite = {
          companyId: clientAccount.id,
          ganPropertyId: id,
          ganMeasurementId: measurementId,
          url: defaultUri,
        };

        await db.insert(Websites).values(newWebsite);
      }
    }
  }
  return {};
};
