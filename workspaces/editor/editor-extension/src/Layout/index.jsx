import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PasskeysPage } from '../Auth/PasskeysPage';
import { ScrollArea } from 'shadcn/scroll-area';
import { Header } from './Header';
import { Footer } from './Footer';
import { useAuth } from 'hooks/useAuth';

export const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      if (!location.pathname.startsWith('/auth')) {
        navigate(`/auth/signin?from=${location.pathname}`);
      }
    }
  }, [isLoading, user]);

  if (isLoading) return null;

  if (user?.passkeys === 0 && !location.pathname.startsWith('/auth')) {
    return (
      <div className="flex h-[600px] w-[740px] flex-col py-0">
        <Header />
        <PasskeysPage />
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex h-[600px] w-[740px] flex-col py-0">
      <Header />
      <ScrollArea className="flex flex-1 flex-col items-center justify-center">{children}</ScrollArea>
      <Footer />
    </div>
  );
};
