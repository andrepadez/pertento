import { Button } from 'shadcn/button';
import { Input } from 'shadcn/input';
import { Label } from 'shadcn/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter } from 'shadcn/dialog';
import { DialogHeader, DialogTitle, DialogTrigger } from 'shadcn/dialog';
import { Separator } from 'shadcn/separator';
import { Target, TriangleAlert, BadgeCheck } from 'lucide-react';
import { Alert } from 'shadcn/alert';
import { useQuerySelector } from '@/state/useQuerySelector';

export const QuerySelector = () => {
  const { query, quantity, isOpen, setIsOpen, onChange, onSelect } = useQuerySelector();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Target className="w-4 h-4 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Select Elements</DialogTitle>
          <DialogDescription>Add Changes to an element</DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="flex flex-col gap-4 py-4">
          <div className="items-center">
            <Input placeholder="CSS selector" onChange={onChange} />
          </div>
          <small>Use any selector like “.”, “#” or tagName a, div, h1, h2... to identify</small>
          <div className="h-12">
            {!!query && quantity === 0 && (
              <Alert variant="destructive" className="flex justify-between">
                <div>no elements found</div>
                <div>
                  <TriangleAlert />
                </div>
              </Alert>
            )}
            {!!query && quantity > 0 && (
              <Alert variant="success" className="flex justify-between">
                <div>{quantity} elements found</div>
                <div>
                  <BadgeCheck />
                </div>
              </Alert>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={onSelect} disabled={!quantity}>
            Select Elements
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
