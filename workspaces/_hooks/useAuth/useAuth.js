import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useClient } from 'hooks/useClient';
import { useGlobal } from 'hooks/useGlobal';
import { usePasskeys } from './usePasskeys';

const { VITE_AUTH_URL, VITE_API_URL } = import.meta.env;

export const useAuth = (authUrl = VITE_AUTH_URL, apiUrl = VITE_API_URL) => {
  const queryClient = useQueryClient();
  const [user, setUser, refreshUser] = useGlobal('CURRENT_USER', null);
  const authClient = useClient(authUrl);
  const passKeyManager = usePasskeys(user);

  const { data, isLoading } = useQuery({
    queryKey: ['CURRENT_USER'],
    queryFn: async () => {
      const token =
        window.pertentoBearerToken ||
        document.body.dataset.pertentoBearerToken ||
        new URL(window.location.href).searchParams.get('pertentoToken') ||
        localStorage.getItem('PERTENTO_EDITOR_AUTH_TOKEN') ||
        localStorage.getItem('BEARER_TOKEN') ||
        sessionStorage.getItem('BEARER_TOKEN');
      if (!token) {
        setUser(null);
        return null;
      }

      try {
        const dbUser = await authClient.get('/me');
        setUser({ ...dbUser, token });
        return { ...dbUser, token };
      } catch (err) {
        return null;
        // localStorage.removeItem('BEARER_TOKEN');
      }
    },
  });

  const signin = async ({ email, password }) => {
    localStorage.removeItem('BEARER_TOKEN');
    const data = await authClient.post('/signin', { email, password });

    const { user, token } = data;

    if (!token && user.passkeys > 0) {
      const res = await passKeyManager.signinWithPasskey(user);
      console.log(res);
      return;
    }

    localStorage.setItem('BEARER_TOKEN', data.token);
    queryClient.invalidateQueries({ queryKey: ['CURRENT_USER'] });
    return data.token;
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem('BEARER_TOKEN');
    localStorage.removeItem('CURRENT_USER');
  };

  const signup = async (newUser) => {
    const data = await authClient.post('/signup', newUser);
  };

  const resetPassword = async (payload) => {
    await authClient.post('/reset-password', payload);
  };

  const verify = async (verificationCode) => {
    await authClient.post('/verify', { verificationCode });
  };

  const updateUser = async (payload) => {
    await apiClient.put('/users', payload);
    localStorage.removeItem('CURRENT_USER');
    refreshUser();
    queryClient.invalidateQueries({ queryKey: ['CURRENT_USER'] });
  };

  const changePassword = async (payload) => {
    const hasChanged = await authClient.post('/change-password', payload);
  };

  const forgotPassword = async ({ email }) => {
    await authClient.post('/forgot-password', { email });
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    refreshUser,
    signin,
    signout,
    signup,
    verify,
    resetPassword,
    updateUser,
    changePassword,
    forgotPassword,
    ...passKeyManager,
  };
};
