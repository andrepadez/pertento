import { cn } from 'helpers/cn';
import LINKS from '../links.json';

export const Footer = ({ c, user, url }) => {
  const { company, website } = c.var;
  const qs = `?org=${company.id}&ws=${website.id}`;

  return (
    <nav class="fixed bottom-0 w-full text-center">
      <div class="flex h-16 w-full items-center justify-between gap-2 bg-[#101828] px-2 lg:h-20 lg:py-2">
        {LINKS.map((link) => {
          const isActive = link.href === '/' ? url.pathname === '/' : url.pathname.startsWith(link.href);
          return (
            <a
              href={link.href + qs}
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
