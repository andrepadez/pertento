import { useState } from 'react';
import { Input } from 'shadcn/input';
import { Label } from 'shadcn/label';
import { ConfirmDialog } from 'components/Dialogs';

export const AddNewVariant = ({ manager, experiment, onClose }) => {
  const { createVariant } = manager;
  const [name, setName] = useState('');

  const onConfirm = async (ev) => {
    ev.preventDefault();
    if (!name) return;
    const { id: experimentId, websiteId } = experiment;
    await createVariant({ name, experimentId, websiteId });
    onClose();
  };
  return (
    <ConfirmDialog
      title={`Add Variant`}
      confirmLabel="Add Variant"
      onClose={onClose}
      disabled={!name}
      onConfirm={onConfirm}
    >
      <form onSubmit={onConfirm}>
        <Label className="mb-3 block">Variant name</Label>
        <Input onChange={(ev) => setName(ev.target.value)} />
      </form>
    </ConfirmDialog>
  );
};
