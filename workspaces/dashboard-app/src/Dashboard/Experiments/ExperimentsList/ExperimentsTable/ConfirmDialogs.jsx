import { useState } from 'react';
import { Button } from 'shadcn/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter } from 'shadcn/dialog';
import { DialogHeader, DialogTitle, DialogTrigger } from 'shadcn/dialog';
import { Input } from 'shadcn/input';
import { Label } from 'shadcn/label';
import { useExperiment } from '@/state/experiments/useExperiment';

export const ConfirmDialogs = ({ experiment, dialogAction, setDialogAction }) => {
  const { id, name } = experiment;
  const [duplicateName, setDuplicateName] = useState(name + ' (copy)');
  const { deleteExperiment, archiveExperiment, duplicateExperiment } = useExperiment();
  const actions = { deleteExperiment, archiveExperiment, duplicateExperiment };
  const isOpen = !!dialogAction;
  const { title, text } = DIALOG_DATA[dialogAction] || {};

  const onClose = () => {
    setDialogAction(null);
  };

  const onConfirm = async () => {
    const action = actions[`${dialogAction}Experiment`];
    await action(id, duplicateName);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setDialogAction(null)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="grid gap-3">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{text}</DialogDescription>
        </DialogHeader>
        {dialogAction === 'duplicate' && (
          <Label htmlFor="name" className="grid gap-2 my-5">
            New Experiment Name:
            <Input value={duplicateName} onChange={(ev) => setDuplicateName(ev.target.value)} />
          </Label>
        )}
        <DialogFooter>
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
  duplicate: {
    title: 'Duplicate Experiment',
    text: 'Are you sure you want to duplicate this experiment?',
  },
  archive: {
    title: 'Archive Experiment',
    text: 'Are you sure you want to archive this experiment?',
  },
  delete: {
    title: 'Delete Experiment',
    text: 'Are you sure you want to delete this experiment?',
  },
};
