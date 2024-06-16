import { ThemeToggle } from 'components/ThemeToggle';
import { useTheme } from 'shadcn/ThemeProvider';
import { Responsiveness } from 'components/Responsiveness';
const { VITE_BUILD_ENV } = import.meta.env;

export const AuthLayout = ({ children }) => {
  if (!window.location.pathname.startsWith('/auth')) return children;

  return (
    <div className="min-h-[100vh] dark:bg-[#0a1018]">
      <div className="absolute right-5 top-5">
        <ThemeToggle />
      </div>
      <div className="flex items-center justify-center gap-10">
        <img className="h-24 dark:hidden" src="/pertento_light.png" alt="pertento" />
        <img className="hidden h-24 dark:inline" src="/pertento_dark.png" alt="pertento" />
      </div>

      <div className="flex justify-center">{children}</div>
      {VITE_BUILD_ENV === 'development' && <Responsiveness />}
    </div>
  );
};
