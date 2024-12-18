import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LeftNav } from './LeftNav';
import { TopNav } from './TopNav';
import { Responsiveness } from 'components/Responsiveness';
import { useAuth } from 'hooks/useAuth';
import { useOrganizations } from '@/state/useOrganizations';
import { useCheckExtension } from '@/state/useCheckExtension';
import { useWebsites } from '@/state/useWebsites';
import { cn } from 'helpers/cn';
const { VITE_BUILD_ENV } = import.meta.env;

export const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading } = useAuth();
  const { organization } = useOrganizations();
  const { website } = useWebsites();
  const { isExtensionInstalled } = useCheckExtension();

  useEffect(() => {
    if (!isLoading && !user) {
      if (!location.pathname.startsWith('/auth')) {
        navigate(`/auth/signin?from=${location.pathname}`);
      }
    }
  }, [isLoading, user]);

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  if (location.pathname.startsWith('/auth')) return children;

  return (
    <div className="flex min-h-[100vh] flex-col">
      <div className="fixed z-50 w-full">
        <TopNav />
      </div>
      <div className="my-16 flex min-h-[calc(100vh)] flex-1 flex-col dark:bg-black">
        {!isExtensionInstalled && (
          <div className="text-cent2r flex items-center justify-center bg-red-400 p-2 text-white">
            <p>
              The current Editor will soon be retired.&nbsp;
              <a
                className="text-white underline"
                target="_blank"
                href="https://chromewebstore.google.com/detail/pertento-editor/fjooappefigppfjolhadliepialebodg"
              >
                Upgrade now to our new plugin-based Editor
              </a>
              &nbsp;for an improved experience!
            </p>
          </div>
        )}
        <div>
          <div className="flex gap-3">
            <div className="flex flex-col justify-between py-10">
              <LeftNav />
            </div>
            <div className={cn('mx-5 flex-1 px-5 py-10')}>{children}</div>
          </div>
        </div>
      </div>
      {VITE_BUILD_ENV === 'development' && <Responsiveness />}
    </div>
  );
};
