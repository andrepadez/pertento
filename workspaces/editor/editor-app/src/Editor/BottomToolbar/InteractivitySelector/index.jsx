import { Button } from 'shadcn/button';
import { MousePointerClick } from 'lucide-react';
import { useInteractivity } from '@/state/useInteractivity';

export const InteractivitySelector = () => {
  const { interactive, setInteractive } = useInteractivity();

  return (
    <div className="flex gap-3">
      <Button
        variant={interactive ? 'outline' : 'default'}
        className="w-16"
        onClick={() => setInteractive((curr) => !curr)}
      >
        <MousePointerClick className="w-6 h-6" />
      </Button>
    </div>
  );
};
