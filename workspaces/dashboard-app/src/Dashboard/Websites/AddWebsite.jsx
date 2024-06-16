import { useState, useEffect } from 'react';
import { Button } from 'shadcn/button';
import { Label } from 'shadcn/label';
import { Input } from 'shadcn/input';
import { Select } from 'components/Select';
import { ConfirmDialog } from 'components/Dialogs';
import { useForm } from 'hooks/useForm';

export const AddWebsite = ({ manager }) => {
  const [newWebsite, setNewWebsite] = useState(null);
  const { createWebsite } = manager;
  const { formState, formRef } = useForm({});
  const { url } = formState;

  const { search, pathname } = window.location;
  useEffect(() => {
    const create = new URLSearchParams(search).get('create');
    if (create !== null) {
      setNewWebsite(true);
      setTimeout(() => window.history.replaceState({}, document.title, pathname));
    }
  }, [search, location]);

  const onConfirm = async (ev) => {
    await createWebsite(formState);
    setNewWebsite(null);
  };

  return (
    <div>
      <Button onClick={() => setNewWebsite({})}>Create Website</Button>
      <ConfirmDialog
        title="Create New Website"
        disabled={!url}
        open={!!newWebsite}
        onConfirm={onConfirm}
        onClose={() => setNewWebsite(null)}
      >
        <form ref={formRef} className="w-[30rem] grid gap-5" onSubmit={onConfirm}>
          <div className="grid gap-3">
            <Label>Organization Name</Label>
            <Input name="url" placeholder="Website Url" />
          </div>
        </form>
      </ConfirmDialog>
    </div>
  );
};
