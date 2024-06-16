import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetDescription } from 'shadcn/sheet';
import { SheetHeader, SheetTitle, SheetTrigger } from 'shadcn/sheet';
import { ChangesList } from './ChangesList';
import { useChanges } from '@/state/useChanges';
import { useSelectedElements } from '@/state/useSelectedElements';
import { cn } from 'helpers/cn';

export const Changes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { changes } = useChanges();
  const { clearSelected } = useSelectedElements();

  useEffect(() => {
    if (changes.length === 0) {
      setIsOpen(false);
    }
  }, [changes]);

  const onOpenChange = (open) => {
    setIsOpen(open);
    clearSelected();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger disabled={changes.length === 0} className="flex items-center gap-4">
        <span>Changes</span>
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary">
          <span className={cn('font-bold text-white', changes?.length / 100 > 1 && 'text-xs')}>
            {changes?.length}
          </span>
        </div>
      </SheetTrigger>
      <SheetContent className="h-[100vh] flex flex-col">
        <SheetHeader>
          <SheetTitle>Changes</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="flex flex-col flex-1">
          <ChangesList changes={changes} />
        </div>
      </SheetContent>
    </Sheet>
  );
};
