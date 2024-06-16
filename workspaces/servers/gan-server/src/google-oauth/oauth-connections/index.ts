import { db, eq, and, not, inArray, notInArray } from 'pertentodb';
import { GanOauth, GanOauthSelect, Websites, Companies, GanProperties } from 'pertentodb';
import { refreshAccessToken } from '../refresh-access-token';
import { upsertAccounts } from './upsert-accounts';
import { upsertProperties } from './upsert-properties';
import { google } from 'googleapis';

const { GOOGLE_AUTH_CLIENT_ID, GOOGLE_AUTH_CLIENT_SECRET } = process.env;
const auth = new google.auth.OAuth2(GOOGLE_AUTH_CLIENT_ID, GOOGLE_AUTH_CLIENT_SECRET);

export const handleOauthAccountConnection = async (oauthAccount) => {
  console.log('refreshing oauth connection', oauthAccount.email);
  const start = performance.now();
  const { email, refreshToken: refresh_token, companyId } = oauthAccount;
  console.log('--------------- refreshing access token for', email, '---------------');
  const access_token = await refreshAccessToken(refresh_token);
  auth.setCredentials({ access_token, refresh_token });
  const analyticsAdmin = google.analyticsadmin({ version: 'v1beta', auth });
  const accountSummaryRes = await analyticsAdmin.accountSummaries.list({ pageSize: 1000 });
  const { accountSummaries } = accountSummaryRes.data;
  const { clientAccounts } = await upsertAccounts(accountSummaries, companyId);
  await upsertProperties({ accountSummaries, clientAccounts, analyticsAdmin, oauthAccount });
  const accountsCount = accountSummaries.filter((as) => as.propertySummaries?.length > 0).length;
  const lastRefreshed = new Date().valueOf();
  const refreshCount = oauthAccount.refreshCount ? oauthAccount.refreshCount + 1 : 1;
  const values = { lastRefreshed, refreshCount, accountsCount };
  await db.update(GanOauth).set(values).where(eq(GanOauth.email, oauthAccount.email));
  const end = performance.now();
  const diff = ((end - start) / 1000).toFixed(2);
  console.log(`--------------- finished processing for ${email} in ${diff}s ---------------`);
};

export const handleOauthAccountDisconnection = async (oauthAccount) => {};
