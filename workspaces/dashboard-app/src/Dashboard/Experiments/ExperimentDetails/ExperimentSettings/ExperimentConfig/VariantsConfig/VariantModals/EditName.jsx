import { useState } from 'react';
import { Input } from 'shadcn/input';
import { Label } from 'shadcn/label';
import { ConfirmDialog } from 'components/Dialogs';

export const EditName = ({ manager, experiment, variant, onClose }) => {
  const [name, setName] = useState(variant.name);
  const [redirectUrl, setRedirectUrl] = useState(variant.redirectUrl);
  const { changeName } = manager;

  const onConfirm = async (ev) => {
    ev.preventDefault();
    if (!name || name === variant.name) return;
    changeName(variant.id, name, redirectUrl);
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
      <form className="grid gap-4" onSubmit={onConfirm}>
        <div>
          <Label className="block mb-3">Variant name</Label>
          <Input value={name} onChange={(ev) => setName(ev.target.value)} />
        </div>
        {experiment.type === 'URL Redirect' && (
          <div>
            <Label className="block mb-3">RedirectUrl</Label>
            <Input value={redirectUrl} onChange={(ev) => setRedirectUrl(ev.target.value)} />
          </div>
        )}
      </form>
    </ConfirmDialog>
  );
};
