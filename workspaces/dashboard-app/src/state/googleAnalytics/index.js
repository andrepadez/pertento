import useGoogleAccounts from './useGoogleAccounts';

export const useGoogleAnalytics = () => {
  const googleAccountsManager = useGoogleAccounts();

  return { ...googleAccountsManager };
};

export default useGoogleAnalytics;
