import { getHeadersFromOauth } from './_get-headers-for-oauth';

const URL = 'https://analyticsadmin.googleapis.com/v1alpha/properties/';

export const archiveAudience = async (audienceId, ganPropertyId, oauthHeaders) => {
  const headers = oauthHeaders || (await getHeadersFromOauth(ganPropertyId, true));

  const url = `${URL}${ganPropertyId}/audiences/${audienceId}:archive`;
  const res = await fetch(url, {
    method: 'post',
    headers,
  });
  const data = await res.json();
  return data;
};
