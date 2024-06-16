import { useState } from 'react';
import { Button } from 'shadcn/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter } from 'shadcn/dialog';
import { DialogHeader, DialogTitle, DialogTrigger } from 'shadcn/dialog';
import { Input } from 'shadcn/input';
import { Label } from 'shadcn/label';
import { useTeams } from '@/state/useTeams';
import { useAuth } from 'hooks/useAuth';

export const ConfirmDialogs = ({ user, dialogAction, setDialogAction }) => {
  const { id, email } = user;
  const { user: currentUser, authorizeWithPasskey } = useAuth();
  const { banUser, unblockUser, blockUser, deleteUser } = useTeams();
  const actions = { banUser, unblockUser, blockUser, deleteUser };
  const isOpen = !!dialogAction;
  const { title, text } = DIALOG_DATA[dialogAction] || {};

  const onClose = () => {
    setDialogAction(null);
  };

  const onConfirm = async () => {
    const action = actions[`${dialogAction}User`];
    await authorizeWithPasskey(currentUser);
    await action(id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setDialogAction(null)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="grid gap-3">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{text}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={onConfirm} type="submit">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const DIALOG_DATA = {
  block: {
    title: 'Block User',
    text: 'Are you sure you want to block this user?',
  },
  unblock: {
    title: 'Unblock User',
    text: 'Are you sure you want to unblock this user?',
  },
  ban: {
    title: 'Ban User',
    text: 'Are you sure you want to ban this user (forever)?',
  },
  delete: {
    title: 'Delete User',
    text: 'Are you sure you want to delete this user?',
  },
};
