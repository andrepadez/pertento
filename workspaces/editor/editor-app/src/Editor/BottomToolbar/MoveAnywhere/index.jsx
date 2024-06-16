import { Button } from 'shadcn/button';
import { Switch } from 'shadcn/switch';

export const MoveAnywhere = () => {
  return (
    <div className="flex items-center gap-1 mx-5">
      <Switch disabled={false} />
      <span className="text-xs text-center">
        Move <br /> Anywhere
      </span>
    </div>
  );
};
