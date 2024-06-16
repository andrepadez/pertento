import { Popover, PopoverContent } from 'shadcn/popover';
import { CircleX, CircleCheckBig } from 'lucide-react';
import { Button } from 'shadcn/button';
import { useCodeEditor } from '@/state/useCodeEditor';
import { useContextMenu } from '@/state/useContextMenu';

export const ContextMenu = () => {
  const { openEditor } = useCodeEditor();
  const manager = useContextMenu();
  const { contextMenuRef, isContextOpen, setIsContextOpen, hasCopiedSelectors } = manager;
  const { removeElement, copySelectors } = manager;

  return (
    <div ref={contextMenuRef}>
      <Popover open={isContextOpen} onOpenChange={setIsContextOpen}>
        <PopoverContent className="w-48 p-5 pb-8 rounded-xl">
          <div className="flex justify-between h-10 mb-3">
            <div></div>
            <h5>Actions</h5>
            <CircleX className="cursor-pointer" onClick={() => setIsContextOpen(false)} />
          </div>
          <div className="flex flex-col gap-5">
            <Button onClick={removeElement} size="sm" variant="outline">
              Remove Element
            </Button>
            <Button onClick={() => openEditor('html')} size="sm" variant="outline">
              Add HTML
            </Button>
            <Button className="relative" onClick={copySelectors} size="sm" variant="outline">
              Copy Selectors
              {hasCopiedSelectors && (
                <CircleCheckBig className="absolute top-1 text-primary -right-3" />
              )}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
