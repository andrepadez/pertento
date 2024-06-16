import { db, eq, GanProperties, GanOauth, inArray } from 'pertentodb';
import { refreshAccessToken } from '../google-oauth/refresh-access-token';

export const getHeadersFromOauth = async (ganPropertyId, isForEdit = false) => {
  let where = eq(GanProperties.id, ganPropertyId);
  const [dbGanProperty] = await db.select().from(GanProperties).where(where);
  const emails = isForEdit ? dbGanProperty.hasEditPermission : dbGanProperty.hasReadPermission;
  console.log({ emails });
  where = inArray(GanOauth.email, emails);
  const oauths = await db.select().from(GanOauth).where(where);

  for (let oauth of oauths) {
    const access_token = await refreshAccessToken(oauth.refreshToken);
    if (!access_token) continue;

    const headers = {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json; charset utf-8',
    };
    return headers;
  }
};
