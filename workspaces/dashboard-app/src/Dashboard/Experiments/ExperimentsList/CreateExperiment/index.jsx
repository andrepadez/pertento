import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'shadcn/button';
import { ConfirmDialog } from 'components/Dialogs';
import { CreateExperimentForm } from './CreateExperimentForm';
import { useExperiment } from '@/state/experiments/useExperiment';
import { useForm } from 'hooks/useForm';
import { EXPERIMENT_TYPES } from 'misc';

const emptyExperiment = { type: EXPERIMENT_TYPES[0], name: '', variants: [{ name: '', redirectUrl: '' }] };

export const CreateExperiment = () => {
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createExperiment } = useExperiment();
  const { state: newExperiment, formRef, update } = useForm(emptyExperiment);

  const validations = {
    'Multi Variant': (newExperiment) => {
      return (
        !!newExperiment.name &&
        newExperiment.variants.length > 0 &&
        newExperiment.variants.every((v) => v.name) &&
        !!newExperiment.editorUrl
      );
    },
    'Server Side': (newExperiment) => {
      return !!newExperiment.name && newExperiment.variants.length > 0 && newExperiment.variants.every((v) => v.name);
    },
    'URL Redirect': (newExperiment) => {
      return (
        !!newExperiment.name &&
        newExperiment.variants.length > 0 &&
        newExperiment.variants.every((v) => v.name && v.redirectUrl)
      );
    },
  };

  const onSubmit = async (ev) => {
    setIsSubmitting(true);
    ev.preventDefault();
    const dbExperiment = await createExperiment(newExperiment);
    setIsSubmitting(false);
    setCreating(false);
    navigate(`/experiments/${dbExperiment.id}`);
  };

  return (
    <div>
      <Button onClick={() => setCreating(true)}>Create Experiment</Button>
      {creating && (
        <ConfirmDialog
          title="Create Experiment"
          className="min-w-[50%]"
          text={COPIES[newExperiment.type]}
          confirmLabel="Create"
          onConfirm={onSubmit}
          onClose={() => setCreating(false)}
          disabled={isSubmitting || !validations[newExperiment.type](newExperiment)}
        >
          <CreateExperimentForm newExperiment={newExperiment} update={update} formRef={formRef} onSubmit={onSubmit} />
        </ConfirmDialog>
      )}
    </div>
  );
};

const COPIES = {
  'Multi Variant':
    'Easily edit and test variations on your UI. Create multiple variations of a page to see what works best.',
  'Server Side':
    'Make complex, targeted changes with ease. Implement a small code snippet so our system can control what users see based on your specified targeting and experiment settings',
  'URL Redirect':
    'Split traffic across different URLs to test performance. Set up original and variant URLs, and control how much traffic each version receives.',
};
