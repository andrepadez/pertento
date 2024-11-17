import { useState } from 'react';
import { Input } from 'shadcn/input';
import { Label } from 'shadcn/label';
import { ConfirmDialog } from 'components/Dialogs';

export const AddNewVariant = ({ manager, experiment, onClose }) => {
  const { createVariant } = manager;
  const [name, setName] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');

  const onConfirm = async (ev) => {
    ev.preventDefault();
    if (!name) return;
    const { id: experimentId, websiteId } = experiment;
    await createVariant({ name, redirectUrl, experimentId, websiteId });
    onClose();
  };
  return (
    <ConfirmDialog
      title={`Add Variant`}
      confirmLabel="Add Variant"
      onClose={onClose}
      disabled={!name || (experiment.type === 'URL Redirect' && !redirectUrl)}
      onConfirm={onConfirm}
    >
      <form className="grid gap-4" onSubmit={onConfirm}>
        <div>
          <Label className="block mb-3">Variant name</Label>
          <Input onChange={(ev) => setName(ev.target.value)} />
        </div>
        {experiment.type === 'URL Redirect' && (
          <div>
            <Label className="block mb-3">RedirectUrl</Label>
            <Input onChange={(ev) => setRedirectUrl(ev.target.value)} />
          </div>
        )}
      </form>
    </ConfirmDialog>
  );
};
