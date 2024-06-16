import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';

export const SignoutPage = () => {
  const navigate = useNavigate();
  const { signout, refreshUser } = useAuth();

  useEffect(() => {
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'SIGN_OUT',
      });
    }
    refreshUser();
    navigate('/auth/signin');
    setTimeout(signout, 100);
  }, []);

  return null;
};
