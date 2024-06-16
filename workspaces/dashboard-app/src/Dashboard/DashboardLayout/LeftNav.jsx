import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from 'shadcn/button';
import { getLinks } from './links';
import { cn } from 'helpers/cn';
import { useAuth } from 'hooks/useAuth';
import { TopNavSelectors } from './TopNav/TopNavSelectors';

export const LeftNav = () => {
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showIconText, setShowIconText] = useState(!isCollapsed);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const rootPath = '/' + pathname.split('/')[1];

  if (!user) return null;

  const links = getLinks(user);

  return (
    <div
      className={cn(
        '-mt-6 relative bg-secondary w-[16rem] Xtransition-all Xduration-500 Xease-in-out',
        isCollapsed && 'w-[2rem]',
      )}
    >
      <div className="fixed flex flex-col h-full gap-10 pt-10 pr-2">
        {links.map((item, idx) => {
          const Icon = item.icon;
          const isSelected = rootPath === item.href;
          return (
            <div key={idx}>
              <Button
                asChild
                className={cn(
                  'flex justify-start w-full gap-5 pl-2 ml-2 text-base text-black dark:text-white',
                  isCollapsed && 'pr-2',
                  isSelected && 'text-white',
                )}
                size="lg"
                variant={isSelected ? 'default' : 'ghost'}
              >
                <Link to={item.href}>
                  <Icon title={isCollapsed ? item.title : null} />
                  {!isCollapsed && <span>{item.title}</span>}
                </Link>
              </Button>
            </div>
          );
        })}
        <div>{/* <TopNavSelectors /> */}</div>
      </div>
      <Button
        onClick={() => setIsCollapsed((curr) => !curr)}
        className="fixed bottom-4"
        variant="ghost"
      >
        {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
      </Button>
    </div>
  );
};
