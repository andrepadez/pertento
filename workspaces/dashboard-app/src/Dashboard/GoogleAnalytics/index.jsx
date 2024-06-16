import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleAnalyticsScreenContent } from './GoogleAnalyticsScreen';
const { VITE_GOOGLE_AUTH_CLIENT_ID } = import.meta.env;

export const GoogleAnalyticsScreen = () => {
  return (
    <GoogleOAuthProvider clientId={VITE_GOOGLE_AUTH_CLIENT_ID}>
      <GoogleAnalyticsScreenContent />
    </GoogleOAuthProvider>
  );
};
