import { db, eq, Experiments, Variants, Websites } from 'pertentodb';
import { getHeadersFromOauth } from './_get-headers-for-oauth';

const URL = 'https://analyticsadmin.googleapis.com/v1alpha/properties/';

export const createAudienceForVariant = async (variantId) => {
  let where = eq(Variants.id, variantId);
  const [variant] = await db.select().from(Variants).where(where);
  where = eq(Experiments.id, variant.experimentId);
  const [experiment] = await db.select().from(Experiments).where(where);
  where = eq(Websites.id, experiment.websiteId);
  const [website] = await db.select().from(Websites).where(where);

  const headers = await getHeadersFromOauth(website.ganPropertyId, true);

  const payload = getPayload(variant, experiment);

  const url = `${URL}${website.ganPropertyId}/audiences`;
  const res = await fetch(url, { method: 'post', headers, body: JSON.stringify(payload) });
  if (res.error) throw res.error.message;
  const data = await res.json();
  const id = data.name.split('/').pop();
  return id;
};

const getPayload = (variant, exp) => {
  const { name, id, experimentId } = variant;
  const rand = Math.floor(Math.random() * 1000000);

  const exp_variant_string = `PERTENTO-${experimentId}-${id}`;
  console.log('creating Audience for exp_variant_string:', exp_variant_string);

  return {
    displayName: `Pertento exp: ${exp.id} - v: ${variant.id} - ${rand}`,
    description: `${exp.name} - ${name}`,
    membershipDurationDays: 50,
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
                          eventName: 'pertento_experience_impression',
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
                                            value: exp_variant_string,
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
