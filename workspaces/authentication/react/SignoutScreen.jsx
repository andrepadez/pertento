import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';

export const SignoutScreen = () => {
  const navigate = useNavigate();
  const { signout, refreshUser } = useAuth();

  useEffect(() => {
    signout();
    navigate('/auth/signin');
  }, []);

  return null;
};
