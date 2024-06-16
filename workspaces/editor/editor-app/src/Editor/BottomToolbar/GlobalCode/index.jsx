import { DropdownMenu, DropdownMenuContent } from 'shadcn/dropdown-menu';
import { DropdownMenuItem, DropdownMenuLabel } from 'shadcn/dropdown-menu';
import { DropdownMenuSeparator, DropdownMenuTrigger } from 'shadcn/dropdown-menu';
import { Button } from 'shadcn/button';
import { CodeXml } from 'lucide-react';
import { useCodeEditor } from '@/state/useCodeEditor';

export const GlobalCode = () => {
  const { openEditor } = useCodeEditor();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="" variant="outline">
            <CodeXml className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="py-3 text-center">Open Code Editor</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button onClick={() => openEditor('js')} variant="ghost">
              <span>Global Javscript</span>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button onClick={() => openEditor('css')} variant="ghost">
              <span>Global CSS</span>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
