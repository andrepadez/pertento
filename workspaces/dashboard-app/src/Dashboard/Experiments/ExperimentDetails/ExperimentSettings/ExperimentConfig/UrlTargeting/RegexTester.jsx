import { useState } from 'react';
import { FlaskConical } from 'lucide-react';
import { Button } from 'shadcn/button';
import { Dialog, DialogContent, DialogDescription } from 'shadcn/dialog';
import { DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from 'shadcn/dialog';
import { ScrollArea } from 'shadcn/scroll-area';
import { Textarea } from 'shadcn/textarea';
import { Label } from 'shadcn/label';
import { testRegex } from 'helpers/url-match';
import { cn } from 'helpers/cn';

export const RegexTester = ({ regexStr }) => {
  const [urls, setUrls] = useState(null);
  const [view, setView] = useState('textarea');

  const onChange = (ev) => {
    setUrls(ev.target.value.split('\n'));
  };

  const handleSubmit = (ev) => {
    if (view === 'results') setUrls(null);
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
      <DialogContent className="min-w-[50%]">
        <DialogHeader>
          <DialogTitle>Regex Tester</DialogTitle>
          <DialogDescription>paste several URLs to test if they match the regex</DialogDescription>
        </DialogHeader>

        <div>
          <Label>Regexes</Label>
          <div>{regexStr}</div>
          <ScrollArea className="mt-5 h-96">
            {view === 'textarea' ? (
              <Textarea onChange={onChange} className="min-h-96" />
            ) : (
              <div className="flex flex-col min-h-96">
                {urls?.map((url, idx) => (
                  <div
                    className={cn(
                      'w-full',
                      testRegex(regexStr, url) ? 'text-green-500' : 'text-red-500',
                    )}
                    key={idx}
                  >
                    {url}&nbsp;
                  </div>
                ))}
              </div>
            )}
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
