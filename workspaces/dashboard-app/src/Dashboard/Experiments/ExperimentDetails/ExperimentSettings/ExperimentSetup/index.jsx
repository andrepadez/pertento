import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'shadcn/card';
import { Button } from 'shadcn/button';
import { LeftPanel } from './LeftPanel';
import { RightPanel } from './RightPanel';
import { useExperiment } from '@/state/experiments/useExperiment';
import { useForm } from 'hooks/useForm';

export const ExperimentSetup = ({ experiment }) => {
  const navigate = useNavigate();
  const { finishSetup } = useExperiment();
  const [step, setStep] = useState(1);
  const { state, formRef } = useForm({ editorUrl: experiment.website.url });
  const { editorUrl, variantName } = state;

  const onSubmit = async () => {
    if (!variantName || !editorUrl) return;
    await finishSetup(experiment.id, { editorUrl, variantName });
    window.location.reload();
  };

  return (
    <div className="grid gap-10 mt-10">
      <div className="grid gap-3">
        <h1>Configure This Experiment</h1>
        <p>You can add multiple variants and configure tracking in the next step.</p>
      </div>
      <Card className="p-5">
        <div className="grid gap-8">
          <div className="grid grid-flow-col">
            <LeftPanel step={step} />
            <RightPanel step={step} formRef={formRef} />
          </div>
          <div className="flex justify-end gap-5">
            {step === 2 && (
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
            )}
            {step === 1 && (
              <Button disabled={!editorUrl} onClick={() => setStep(2)}>
                Next Step
              </Button>
            )}
            {step === 2 && (
              <Button disabled={!editorUrl || !variantName} onClick={onSubmit}>
                Create Experiment
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
