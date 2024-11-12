import { useState } from 'react';
import { cn } from 'helpers/cn';
import { Button } from 'shadcn/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter } from 'shadcn/dialog';
import { DialogHeader, DialogTitle, DialogTrigger } from 'shadcn/dialog';

export const ConfirmDialog = ({ children, className, ...props }) => {
  const { title, text, confirmLabel, onConfirm, onClose, disabled } = props;
  const { open = true, level = 'default' } = props;

  return (
    <Dialog className="" open={open} onOpenChange={onClose}>
      <DialogContent className={cn('w-auto min-w-[30%]', className)}>
        <DialogHeader className="grid gap-3">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{text}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button variant={level} disabled={disabled} onClick={onConfirm} type="submit">
            {confirmLabel || 'Confirm'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
