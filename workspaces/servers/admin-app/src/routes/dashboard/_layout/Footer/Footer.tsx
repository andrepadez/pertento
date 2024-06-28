import { cn } from 'helpers/cn';

export const Footer = ({ user, url }) => {
  return (
    <nav class="fixed bottom-0 w-full text-center">
      <div class="flex h-16 w-full items-center justify-between gap-2 bg-[#101828] px-2">
        {LINKS.map((link) => {
          const isActive = link.href === '/' ? url.pathname === '/' : url.pathname.startsWith(link.href);
          return (
            <a
              href={link.href}
              class={cn(
                'flex w-full flex-col items-center justify-center gap-1 py-1 text-center text-white',
                link.large && 'hidden lg:flex',
              )}
            >
              <i class={cn('h-6 w-6', isActive && 'font-bold')} data-lucide={link.icon}></i>
              <span class={cn('tab tab-home block text-xs', isActive && 'font-bold')}>{link.label}</span>
              <div class="w-full">
                <div
                  className={cn(
                    'mx-auto w-[75%] border-b-2 border-white lg:w-[25%] lg:border-b-4',
                    !isActive && 'border-transparent',
                  )}
                ></div>
              </div>
            </a>
          );
        })}
      </div>
    </nav>
  );
};

const LINKS = [
  { label: 'Home', icon: 'house', href: '/' },
  { label: 'Experiments', icon: 'flask-conical', href: '/experiments' },
  { label: 'Websites', icon: 'link', href: '/websites' },
  { label: 'Monitor', icon: 'activity', href: '/monitor' },
  { label: 'GA4', icon: 'activity', href: '/google-analytics', large: true },
  { label: 'Organization', icon: 'building', href: '/organization' },
  { label: 'Account', icon: 'link', href: '/account', large: true },
];
