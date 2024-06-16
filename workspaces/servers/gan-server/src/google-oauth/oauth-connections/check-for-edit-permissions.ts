import { db, eq, GanProperties, inArray, Websites, GanOauth, Companies } from 'pertentodb';
import { getHeadersFromOauth } from '../../google-analytics/_get-headers-for-oauth';
import { archiveAudience } from '../../google-analytics/archive-audience';
import { refreshAccessToken } from '../refresh-access-token';

const URL = 'https://analyticsadmin.googleapis.com/v1alpha/properties';

export const recheckForEditPermissions = async (ganPropertyId) => {
  const ganProperty = await db.query.GanProperties.findFirst({
    where: eq(GanProperties.id, ganPropertyId),
  });

  const oauthAccounts = await db.query.GanOauth.findMany({
    where: inArray(GanOauth.email, ganProperty.hasReadPermission),
  });

  let { hasEditPermission } = ganProperty;

  for (let oauthAccount of oauthAccounts) {
    const { email, refreshToken } = oauthAccount;
    const token = await refreshAccessToken(refreshToken);
    const canEdit = await checkForEditPermissions(ganPropertyId, token);
    if (!canEdit && hasEditPermission.includes(email)) {
      hasEditPermission = hasEditPermission.filter((e) => e !== email);
    }
    if (canEdit && !hasEditPermission.includes(email)) {
      hasEditPermission = [...hasEditPermission, email];
    }
  }

  await db.update(GanProperties).set({ hasEditPermission }).where(eq(GanProperties.id, ganPropertyId));
  return hasEditPermission;
};

export const checkForEditPermissions = async (ganPropertyId, token) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : await getHeadersFromOauth(ganPropertyId, true);

  const payload = getPayload();
  const url = `${URL}/${ganPropertyId}/audiences`;
  const res = await fetch(url, { method: 'post', headers, body: JSON.stringify(payload) });

  if (res.ok) {
    const data = await res.json();
    const audienceId = data.name.split('/').pop();
    await archiveAudience(audienceId, ganPropertyId, headers);
  } else {
    const data = await res.json();
  }

  return res.ok;
};

const getPayload = () => {
  const uuid = crypto.randomUUID();
  return {
    displayName: `Test Audience ${uuid}`,
    description: `This audience will be deleted after 1 day`,
    membershipDurationDays: 1,
    filterClauses: [
      {
        clauseType: 'INCLUDE',
        simpleFilter: {
          scope: 'AUDIENCE_FILTER_SCOPE_ACROSS_ALL_SESSIONS',
          filterExpression: {
            andGroup: {
              filterExpressions: [
                {
                  orGroup: {
                    filterExpressions: [
                      {
                        eventFilter: {
                          eventName: 'experience_impression',
                          eventParameterFilterExpression: {
                            andGroup: {
                              filterExpressions: [
                                {
                                  orGroup: {
                                    filterExpressions: [
                                      {
                                        dimensionOrMetricFilter: {
                                          fieldName: 'exp_variant_string',
                                          stringFilter: {
                                            matchType: 'EXACT',
                                            value: `PERTENTO-TEST-AUDIENCE ${uuid}`,
                                          },
                                          atAnyPointInTime: true,
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
      },
    ],
  };
};
