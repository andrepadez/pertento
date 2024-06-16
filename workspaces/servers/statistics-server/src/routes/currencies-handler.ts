import { statisticsdb, sql, Statistics } from 'statisticsdb';

export const currenciesHandler = async (c) => {
  const { experimentId } = c.req.param();

  const query = sql`
    SELECT DISTINCT ${Statistics.currencyCode} 
      FROM ${Statistics} 
      WHERE ${Statistics.experimentId} = ${experimentId};`;

  const currencies = await statisticsdb.execute(query);
  return c.json(currencies.map((currency) => currency.currency_code));
};
