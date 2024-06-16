import { useState, useEffect } from 'react';
import { Button } from 'shadcn/button';
import { Label } from 'shadcn/label';
import { Input } from 'shadcn/input';
import { Select } from 'components/Select';
import { ConfirmDialog } from 'components/Dialogs';
import { useForm } from 'hooks/useForm';

export const AddClient = ({ manager }) => {
  const [newOrganization, setNewOrganization] = useState(null);
  const { companySizeOptions, createOrganization } = manager;
  const { formState, formRef } = useForm({});
  const { name, size } = formState;

  const { search, pathname } = window.location;
  useEffect(() => {
    const create = new URLSearchParams(search).get('create');
    if (create !== null) {
      setNewOrganization(true);
      setTimeout(() => window.history.replaceState({}, document.title, pathname));
    }
  }, [search, location]);

  const onConfirm = async (ev) => {
    await createOrganization(formState);
    setNewOrganization(null);
  };

  return (
    <div>
      <Button onClick={() => setNewOrganization({})}>Create new Client</Button>
      <ConfirmDialog
        title="Create new Client Organization"
        disabled={!name || !size}
        open={!!newOrganization}
        onConfirm={onConfirm}
        onClose={() => setNewOrganization(null)}
      >
        <form ref={formRef} className="grid w-[30rem] gap-5" onSubmit={onConfirm}>
          <div className="grid gap-3">
            <Label>Client Name</Label>
            <Input name="name" placeholder="Client Name" />
          </div>
          <div className="grid gap-3">
            <Label>Client Size</Label>
            <Select name="size" options={companySizeOptions} />
          </div>
        </form>
      </ConfirmDialog>
    </div>
  );
};
