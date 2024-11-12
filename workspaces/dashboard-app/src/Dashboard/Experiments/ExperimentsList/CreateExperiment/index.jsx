import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'shadcn/button';
import { Label } from 'shadcn/label';
import { Select } from 'components/select';
import { Input } from 'shadcn/input';
import { ConfirmDialog } from 'components/Dialogs';
import { MultiVariantForm } from './MultiVariantForm';
import { ServerSideForm } from './ServerSideForm';
import { UrlRedirectForm } from './UrlRedirectForm';
import { useExperiment } from '@/state/experiments/useExperiment';
import { useForm } from 'hooks/useForm';
import { EXPERIMENT_TYPES } from 'misc';

const emptyExperiment = { type: EXPERIMENT_TYPES[0], name: '', variants: [{ name: '' }] };

export const CreateExperiment = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);
  const { createExperiment } = useExperiment();
  const { state: newExperiment, formRef, update } = useForm(emptyExperiment);

  const { name, type } = newExperiment;

  const onSubmit = async (ev) => {
    setIsSubmitting(true);
    ev.preventDefault();
    const newExperiment = await createExperiment(newExperiment);
    setCreating(false);
    navigate(`/experiments/${newExperiment.id}`);
  };

  return (
    <div>
      <Button onClick={() => setCreating(true)}>Create Experiment</Button>
      {creating && (
        <ConfirmDialog
          title="Create Experiment"
          className="min-w-[50%]"
          text="Choose a discriptive name for your new experiment"
          confirmLabel="Create"
          onConfirm={onSubmit}
          onClose={() => setCreating(false)}
          disabled={isSubmitting}
        >
          <form ref={formRef} className="flex flex-col gap-4" onSubmit={onSubmit}>
            <div className="grid gap-2">
              <Label>Experiment Type </Label>
              <Select value={type} name="type" options={EXPERIMENT_TYPES} update={update} />
            </div>
            <div className="grid gap-2">
              <Label>Experiment Name </Label>
              <Input name="name" />
            </div>
            {type === 'Multi Variant' && <MultiVariantForm newExperiment={newExperiment} update={update} />}
            {type === 'Server Side' && <ServerSideForm newExperiment={newExperiment} update={update} />}
            {type === 'URL Redirect' && <UrlRedirectForm newExperiment={newExperiment} update={update} />}
          </form>
        </ConfirmDialog>
      )}
    </div>
  );
};
