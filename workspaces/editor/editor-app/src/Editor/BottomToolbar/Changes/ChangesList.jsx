import { Card } from 'shadcn/card';
import { Button } from 'shadcn/button';
import { ScrollArea } from 'shadcn/scroll-area';
import { useChanges } from '@/state/useChanges';
import { useSelectedElements } from '@/state/useSelectedElements';
import CssIcon from 'icons/CssIcon';
import { EllipsisVertical } from 'lucide-react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from 'shadcn/dropdown-menu';
import { DropdownMenuTrigger, DropdownMenuSeparator } from 'shadcn/dropdown-menu';

export const ChangesList = () => {
  const { changes, removeChange, removeAllChanges } = useChanges();
  const { selectByChange, clearElements } = useSelectedElements();

  return (
    <div className="flex flex-1 flex-col justify-between">
      <ScrollArea className="h-[85vh] pb-2">
        <div className="flex flex-1 flex-col gap-3">
          {changes.map((change, idx) => {
            const { friendlySelector, friendlySelectors, property, action } = change;
            const selector = friendlySelector ? [friendlySelector] : friendlySelectors;
            let title = selector?.map((s) => s.split(' > ').pop()).join(', ');
            console.log({ selector, friendlySelector, friendlySelectors });

            return (
              <Card onMouseEnter={() => selectByChange(change)} className="flex gap-3 p-3" key={change.id || idx}>
                <CssIcon />
                <div className="flex flex-col gap-2">
                  <h5>
                    <strong>{title}</strong>
                    <small>{property === 'html' && `: HTML (${action})`}</small>
                  </h5>
                  {property !== 'html' && (
                    <span className="text-sm font-bold">
                      {change.property}: {change.value}
                    </span>
                  )}
                  <span className="text-muted-foreground text-sm">Changed by: {change.changedBy}</span>
                </div>
                <div className="flex flex-1 items-center justify-end text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <EllipsisVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem disabled>Edit Change</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => removeChange(change)}>Remove Change</DropdownMenuItem>
                      <DropdownMenuItem disabled>Duplicate Change</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
      <div className="text-right">
        <Button className="mb-0" variant="destructive" onClick={removeAllChanges}>
          Remove all changes
        </Button>
      </div>
    </div>
  );
};
