import { sql, statisticsdb, Statistics } from 'statisticsdb';

export const getRawData = async (experimentId, goal, currency) => {
  let query = null;
  switch (goal) {
    case 'Conversions':
      query = sql`
        SELECT 
          ${Statistics.variantId}, 
          ${Statistics.from}, 
          SUM(${Statistics.count}) AS conversions
        FROM 
          ${Statistics}
        WHERE 
          ${Statistics.experimentId} = ${experimentId} 
        GROUP BY 
          ${Statistics.variantId}, 
          ${Statistics.from}
        ORDER BY 
          ${Statistics.from} ASC;
      `;
      break;

    case 'Revenue':
      query = sql`
        SELECT 
          ${Statistics.variantId}, 
          ${Statistics.currencyCode}, 
          ${Statistics.from}, 
          SUM(${Statistics.value}) AS revenue
        FROM 
          ${Statistics}
        WHERE 
          ${Statistics.experimentId} = ${experimentId}
          AND ${Statistics.currencyCode} = ${currency}
        GROUP BY 
          ${Statistics.variantId}, 
          ${Statistics.currencyCode},
          ${Statistics.from}
        ORDER BY 
          ${Statistics.from} ASC;
    `;
  }

  const data = await statisticsdb.execute(query);
  return data;
};
