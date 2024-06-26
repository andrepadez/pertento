import { Moon, Sun } from 'lucide-react';
import { cn } from 'helpers/cn';

import { Button } from 'shadcn/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from 'shadcn/dropdown-menu';
import { useTheme } from 'shadcn/ThemeProvider';

export const ThemeToggle = ({ colorDark, colorLight }) => {
  const { theme, setTheme } = useTheme();

  const changeTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="cursor-pointer" onClick={changeTheme}>
      <Sun
        className={cn(
          'h-[1.2rem] w-[1.2rem] origin-center rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0',
          colorLight && 'text-white',
        )}
      />
      <Moon
        className={cn(
          'absolute -mt-[1.2rem] h-[1.2rem] w-[1.2rem] origin-center rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100',
          colorDark && 'text-black',
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </div>
  );
};
