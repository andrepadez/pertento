import { ChevronDown, Building, User, LogOut } from 'lucide-react';
import { Details } from '@/Components/Details';
import { OrgWebsiteSelectors } from './OrgWebsiteSelectors';
import { UserDropdown } from './UserDropdown';

export const Header = ({ c, user, url }) => {
  const { company, website } = c.var;
  return (
    <header class="fixed z-50 w-full">
      <div>
        <div class="flex h-16 items-center justify-between bg-[#101828] px-2 text-white lg:h-20 lg:px-8">
          <a class="flex-1" href={`/?org=${company.id}&ws=${website.id}`}>
            <img class="h-20" src="/pertento_dark.png" alt="pertento logo" />
          </a>
          <Details class="flex-2 group ml-4 gap-2 text-sm text-white lg:hidden">
            <summary class="flex list-none items-center gap-2 [&::-webkit-details-marker]:hidden">
              <span>{company.friendlyName}</span>{' '}
              <i class="size-4 text-white transition-all group-open:rotate-180" data-lucide="chevron-down" />
            </summary>
            <div className="fixed left-0 top-16 flex w-[100vw] justify-center bg-[#101828]">
              <OrgWebsiteSelectors c={c} url={url} />
            </div>
          </Details>
          <div className="justify-center flex-1 hidden text-center lg:block">
            <OrgWebsiteSelectors c={c} url={url} />
          </div>
          <div class="flex flex-1 justify-end">
            <UserDropdown c={c} user={user} />
          </div>
        </div>
      </div>
    </header>
  );
};
