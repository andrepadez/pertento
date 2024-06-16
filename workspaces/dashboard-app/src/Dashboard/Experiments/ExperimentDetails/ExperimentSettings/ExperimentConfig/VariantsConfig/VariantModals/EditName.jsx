import { useState } from 'react';
import { Input } from 'shadcn/input';
import { Label } from 'shadcn/label';
import { ConfirmDialog } from 'components/Dialogs';

export const EditName = ({ manager, variant, onClose }) => {
  const [name, setName] = useState(variant.name);
  const { changeName } = manager;

  const onConfirm = async (ev) => {
    ev.preventDefault();
    if (!name || name === variant.name) return;
    changeName(variant.id, name);
    onClose();
  };

  return (
    <ConfirmDialog
      title="Edit Variant Name"
      confirmLabel="Change Name"
      onClose={onClose}
      disabled={!name || name === variant.name}
      onConfirm={onConfirm}
    >
      <form onSubmit={onConfirm}>
        <Label className="block mb-3">Variant name</Label>
        <Input defaultValue={variant.name} onChange={(ev) => setName(ev.target.value)} />
      </form>
    </ConfirmDialog>
  );
};
