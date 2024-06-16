import { db, GanOauth } from 'pertentodb';
import { jwtDecode } from 'jwt-decode';

const { GOOGLE_AUTH_CLIENT_ID, GOOGLE_AUTH_CLIENT_SECRET, VITE_DASHBOARD_URL } = process.env;

export const connectAccountHandler = async (c) => {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      ...c.body,
      client_id: GOOGLE_AUTH_CLIENT_ID,
      client_secret: GOOGLE_AUTH_CLIENT_SECRET,
      redirect_uri: VITE_DASHBOARD_URL,
      grant_type: 'authorization_code',
    }),
  });

  const data = await response.json();
  const identity = jwtDecode(data.id_token);
  const { companyId } = c.user;
  const { refresh_token } = data;
  const { email, picture, given_name, family_name } = identity;

  const ganAccount = await db.insert(GanOauth).values({
    email,
    companyId,
    name: `${given_name} ${family_name}`,
    image: picture,
    refreshToken: refresh_token,
  });

  return c.json({ ok: true });
};
