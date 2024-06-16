import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'shadcn/button';
import { Input } from 'shadcn/input';
import { ConfirmDialog } from 'components/Dialogs';
import { useExperiment } from '@/state/experiments/useExperiment';

export const CreateExperiment = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [experimentName, setExperimentName] = useState(null);
  const { createExperiment } = useExperiment();

  const onSubmit = async (ev) => {
    setIsSubmitting(true);
    ev.preventDefault();
    const newExperiment = await createExperiment({ name: experimentName });
    setExperimentName(null);
    navigate(`/experiments/${newExperiment.id}`);
  };

  return (
    <div>
      <Button onClick={() => setExperimentName('')}>Create Experiment</Button>
      {experimentName !== null && (
        <ConfirmDialog
          title="Create Experiment"
          text="Choose a discriptive name for your new experiment"
          confirmLabel="Create"
          onConfirm={onSubmit}
          onClose={() => setExperimentName(null)}
          disabled={isSubmitting || !experimentName}
        >
          <form onSubmit={onSubmit}>
            <Input
              type="text"
              name="name"
              value={experimentName}
              onChange={(e) => setExperimentName(e.target.value)}
            />
          </form>
        </ConfirmDialog>
      )}
    </div>
  );
};
