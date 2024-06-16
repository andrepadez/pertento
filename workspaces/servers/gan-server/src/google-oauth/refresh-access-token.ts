export const refreshAccessToken = async (refresh_token) => {
  const body = new URLSearchParams({ ...payload, refresh_token });
  const res = await fetch(URL, { method: 'post', headers, body });
  const data = await res.json();
  return data.access_token;
};

const URL = 'https://accounts.google.com/o/oauth2/token';
const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
};
const payload = {
  client_id: process.env.GOOGLE_AUTH_CLIENT_ID,
  client_secret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
  grant_type: 'refresh_token',
  access_type: 'offline',
};
