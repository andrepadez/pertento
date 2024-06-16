import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { TopNavSelectors } from './TopNavSelectors';
import { UserDropdown } from './UserDropdown';
import { ThemeToggle } from 'components/ThemeToggle';

export const TopNav = () => {
  return (
    <div className="px-8 h-16 bg-[#101828] flex justify-between items-center">
      <Menu className="text-white md:hidden" />
      <div className="flex gap-10">
        <Link to="/" className="flex items-center gap-2">
          <img className="h-16" src="/LightPertentoAI.png" alt="" />
        </Link>
        <TopNavSelectors />
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-8">
          <ThemeToggle colorLight />
          <UserDropdown />
        </div>
      </div>
    </div>
  );
};
