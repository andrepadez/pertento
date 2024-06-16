import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from 'hooks/useAuth';
const { VITE_DASHBOARD_URL, VITE_BUILD_ENV } = import.meta.env;

export const Header = () => {
  const navigate = useNavigate();
  const { user, signout } = useAuth();

  const onSignout = () => {
    navigate('/auth/signout');
  };

  return (
    <div className="grid grid-cols-3 bg-[#101828] text-primary-foreground items-center px-2">
      <img className="h-16" src="https://app.pertento.ai/pertento_dark.png" alt="pertento logo" />
      {VITE_BUILD_ENV !== 'production' ? <h6>dev</h6> : <h6>&nbsp;</h6>}
      {user && (
        <div className="flex items-center justify-end gap-5 text-right">
          {user && <h6 className="w-full text-center">{user.email}</h6>}
          <LogOut className="w-8 h-8 pr-3 cursor-pointer" onClick={onSignout} />
        </div>
      )}
    </div>
  );
};
