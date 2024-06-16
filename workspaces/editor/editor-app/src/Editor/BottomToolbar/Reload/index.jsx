import { Button } from 'shadcn/button';
import { Switch } from 'shadcn/switch';
import { useIframe } from '@/state/useIframe';

export const Reload = () => {
  const { reload } = useIframe();
  return (
    <Button onClick={reload} variant="outline" className="text-xs text-center">
      Reload
    </Button>
  );
};
