import { getHeadersFromOauth } from './_get-headers-for-oauth';

const GOOGLE_API_URL = `https://analyticsdata.googleapis.com/v1beta/properties`;

const getExperimentData = async (ganPropertyId) => {
  const headers = await getHeadersFromOauth(ganPropertyId);
  const payload = buildPayload(ganPropertyId);
  const data = await fetchExperimentDataFromGoogle(ganPropertyId, payload, headers);
  if (data.error) {
    console.error(data.error);
  } else {
    console.log(JSON.stringify(data));
  }
};

const fetchExperimentDataFromGoogle = async (ganPropertyId, payload, headers) => {
  const url = `${GOOGLE_API_URL}/${ganPropertyId}:runReport`;
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  return data;
};
const buildPayload = (ganPropertyId) => {
  return {
    dimensions: [
      {
        name: 'eventName',
      },
      {
        name: 'date',
      },
    ],
    metrics: [
      {
        name: 'eventValue',
      },
      {
        name: 'taxAmount',
      },
      {
        name: 'eventCount',
      },
    ],
    dateRanges: [
      {
        startDate: '30daysAgo',
        endDate: 'today',
      },
      // {
      //   startDate: '2023-08-01',
      //   endDate: '2023-09-01',
      // },
    ],
    dimensionFilter: {
      orGroup: {
        expressions: [
          {
            filter: {
              fieldName: 'eventName',
              stringFilter: {
                value: 'session_start',
                matchType: 'EXACT',
              },
            },
          },
          // {
          //   filter: {
          //     fieldName: 'eventName',
          //     stringFilter: {
          //       value: 'experiment_impression',
          //       matchType: 'EXACT',
          //     },
          //   },
          // },
        ],
      },
    },
  };
};
