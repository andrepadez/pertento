import { useState } from 'react';
import { Button } from 'shadcn/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter } from 'shadcn/dialog';
import { DialogHeader, DialogTitle, DialogTrigger } from 'shadcn/dialog';

export const ConfirmDialog = ({ children, ...props }) => {
  const { title, text, confirmLabel, onConfirm, onClose, disabled } = props;
  const { open = true, level = 'default' } = props;

  return (
    <Dialog className="" open={open} onOpenChange={onClose}>
      <DialogContent className="w-auto min-w-[30%]">
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
