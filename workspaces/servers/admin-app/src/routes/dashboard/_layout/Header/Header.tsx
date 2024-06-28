import { ChevronDown, Building, User, LogOut } from 'lucide-react';
import { OrgWebsiteSelectors } from './OrgWebsiteSelectors';
import { UserDropdown } from './UserDropdown';

export const Header = ({ c, user, url }) => {
  return (
    <header class="fixed z-50 w-full">
      <div class="flex h-16 items-center justify-between bg-[#101828] px-2 text-white lg:h-20 lg:px-8">
        <a class="flex-1" href="/">
          <img class="h-20" src="/pertento_dark.png" alt="pertento logo" />
        </a>
        <div className="justify-center flex-1 text-center">
          <OrgWebsiteSelectors c={c} url={url} />
        </div>
        <div class="flex flex-1 justify-end">
          <UserDropdown user={user} />
        </div>
      </div>
    </header>
  );
};
