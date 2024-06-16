import { useState } from 'react';
import { FlaskConical, Pencil, Trash2 } from 'lucide-react';
import { Button } from 'shadcn/button';
import { Badge } from 'shadcn/badge';
import { Dialog, DialogContent, DialogDescription } from 'shadcn/dialog';
import { DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from 'shadcn/dialog';
import { ScrollArea } from 'shadcn/scroll-area';
import { Textarea } from 'shadcn/textarea';
import { checkUrlTargeting } from 'helpers/url-match';
import { cn } from 'helpers/cn';

export const UrlTargetingTester = ({ urlTargeting, setAddOrEditTarget, deleteUrlTargeting }) => {
  const [urls, setUrls] = useState(null);
  const [view, setView] = useState('textarea');

  const onChange = (ev) => {
    setUrls(ev.target.value.split('\n'));
  };

  const handleSubmit = (ev) => {
    setView(view === 'textarea' ? 'results' : 'textarea');
  };

  const onOpenChange = (open) => {
    if (!open) {
      setUrls(null);
      setView('textarea');
    }
  };

  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <FlaskConical className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="min-w-[80%] min-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Url Targeting Tester</DialogTitle>
          <DialogDescription>
            paste several URLs to test if they match the current urlTargeting definition
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-start h-full gap-5">
          <div className="flex flex-col gap-2">
            {urlTargeting?.map((item, idx) => (
              <div key={item.id} className="flex items-center justify-between gap-3">
                <div className="flex gap-3 text-xs">
                  <div>
                    <Badge variant="outline" className="px-5 py-2 bg-gray-200 rounded-sm dark:bg-gray-500 ">
                      When
                    </Badge>
                  </div>
                  <div className="w-[11rem]">
                    <Badge variant="ghost" className="px-5 py-2 flex-grow-2">
                      URL {item.condition} {item.url.length > 1 && item.condition === 'contains' ? 'any of' : null}
                    </Badge>
                  </div>
                  <Badge variant="outlined" className="px-5 py-2 text-[0.7rem]">
                    {item.url}
                  </Badge>
                </div>
                <div className="flex gap-4">
                  <div className="">
                    {idx < urlTargeting.length - 1 && (
                      <Badge variant="outline" className="px-5 py-2 bg-gray-200 rounded-sm dark:bg-gray-500">
                        And
                      </Badge>
                    )}
                  </div>
                  <Pencil className="cursor-pointer" onClick={() => setAddOrEditTarget(item)} />
                  <Trash2 className="cursor-pointer" onClick={() => deleteUrlTargeting(item.id)} />
                </div>
              </div>
            ))}
            <div>
              <Button className="font-bold" variant="ghost" onClick={() => setAddOrEditTarget({})}>
                + Add more Url targeting
              </Button>
            </div>
          </div>
          <ScrollArea className="flex-1 min-h-96">
            <Textarea className={cn('min-h-96', view !== 'textarea' && 'hidden')} onChange={onChange} />
            <div className={cn('flex flex-col', view !== 'results' && 'hidden')}>
              {urls?.map((url, idx) => (
                <div
                  className={cn('w-full', checkUrlTargeting(urlTargeting, url) ? 'text-green-500' : 'text-red-500')}
                  key={idx}
                >
                  {url}&nbsp;
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} type="submit">
            {view === 'textarea' ? 'Test' : 'try again'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
