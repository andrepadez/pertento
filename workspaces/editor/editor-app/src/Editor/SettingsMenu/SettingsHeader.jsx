import { Button } from 'shadcn/button';
import { Move, CircleX, RotateCcw as Undo, RotateCw as Redo, MoveVertical } from 'lucide-react';
import { useChanges } from '@/state/useChanges';

import { cn } from 'helpers/cn';

export const SettingsHeader = ({ triggerRef, toggleSettingsOpen, isOpen }) => {
  const { changes, undone, undoChange, redoChange } = useChanges();
  return (
    <header className="flex items-center justify-between p-3 rounded-lg rounded-t-none rounded-b-none bg-primary">
      <Move ref={triggerRef} className="w-5 h-5 text-white" />
      <div className="flex gap-8 text-white">
        <Button onClick={undoChange}>
          <Undo className={cn('w-6 h-6 cursor-pointer', !changes?.length && 'text-slate-400')} />
        </Button>
        <Button onClick={redoChange}>
          <Redo className={cn('w-6 h-6 cursor-pointer', !undone?.length && 'text-slate-400')} />
          <span className="absolute ml-10">{undone.length || ''}</span>
        </Button>
      </div>
      {isOpen ? (
        <CircleX onClick={toggleSettingsOpen} className="w-5 h-5 text-white cursor-pointer" />
      ) : (
        <MoveVertical onClick={toggleSettingsOpen} className="w-5 h-5 text-white cursor-pointer" />
      )}
    </header>
  );
};
