import { ChevronDown, Building, User, LogOut } from 'lucide-react';
import { UserDropdown } from './UserDropdown';

export const Header = ({ user }) => {
  return (
    <header class="fixed z-50 w-full">
      <div class="flex h-20 items-center justify-between bg-[#101828] px-8 text-white">
        <div>
          <img class="h-16 lg:h-20" src="/pertento_dark.png" alt="pertento logo" />
        </div>
        <UserDropdown user={user} />
      </div>
    </header>
  );
};
