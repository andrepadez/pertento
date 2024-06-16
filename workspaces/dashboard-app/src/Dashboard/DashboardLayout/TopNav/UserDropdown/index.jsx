import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import { Avatar } from 'components/Avatar';
import { Popover, PopoverContent, PopoverTrigger } from 'shadcn/popover';
import { NavigationMenuLink } from 'shadcn/navigation-menu';
import { Separator } from 'shadcn/separator';
import { Button } from 'shadcn/button';
import { ChevronDown, Building, User, LogOut } from 'lucide-react';

export const UserDropdown = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) return null;

  const { firstName, lastName, company } = user;

  const onSignout = () => {
    window.location.href = '/auth/signout';
  };

  return (
    <div className="hidden lg:block">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="flex items-center gap-4 cursor-pointer">
            <Avatar src={user.avatar} />
            <div className="text-left flex flex-col w-[6rem] gap-1 justify-center">
              <div className="text-xs text-[#98a2b3]">{company.friendlyName}</div>
              <div className="text-sm text-white">{`${firstName} ${lastName}`}</div>
            </div>
            <ChevronDown className="h-6 w-6 text-[#98a2b3]" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="mt-4 mr-2">
          <div className="flex flex-col gap-3">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <Avatar />
                <span>{company.friendlyName}</span>
              </div>
              <Separator />
            </div>
            <div className="items-center p-2 radius hover:bg-accent hover:text-accent-foreground">
              <Link to="/organization">
                <div className="flex items-center gap-4 mb-2 cursor-pointer">
                  <Building className="w-6 h-6 text-gray-400" />
                  <span>Organization</span>
                </div>
              </Link>
              <Separator />
            </div>

            <div className="items-center p-2 radius hover:bg-accent hover:text-accent-foreground">
              <Link to="/account">
                <div className="flex items-center gap-4 mb-2 cursor-pointer">
                  <User className="w-6 h-6 text-gray-400" />
                  <span>Account</span>
                </div>
              </Link>
              <Separator />
            </div>
            <div className="items-center p-2 radius hover:bg-accent hover:text-accent-foreground">
              <Link onClick={onSignout}>
                <div className="flex items-center gap-4 mb-2 cursor-pointer">
                  <LogOut className="w-6 h-6 text-gray-400" />
                  <span>Signout</span>
                </div>
              </Link>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
