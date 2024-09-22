import { useState } from 'react';
import { useAuth } from 'hooks/useAuth';
import { Button } from 'shadcn/button';
import { ConfirmDialog } from 'components/Dialogs';
import { useExperiment } from '@/state/experiments/useExperiment';
import { useWebsites } from '@/state/useWebsites';
import { cn } from 'helpers/cn';

export const Header = ({ experimentId, screen }) => {
  const [wantsToEnd, setWantsToEnd] = useState(false);
  const { user } = useAuth();
  const { website } = useWebsites();
  const { ganProperty } = website || {};
  const { experiment, isStarting, startExperiment, endExperiment } = useExperiment(experimentId);
  if (!experiment || !website) return null;

  const { status } = experiment;
  const isDraft = status === 'Draft';
  const isEnded = status === 'Ended';
  const isDeployed = status === 'Deployed';
  const isRunning = status === 'Running';
  const noEditPermissions = isDraft && ganProperty && !ganProperty.hasEditPermission.length;

  return (
    <div className="grid gap-5">
      <div className="flex justify-between text-center">
        <h1>
          <span>{experiment.name}</span> <span className="text-xl"> ({experiment.id})</span>
        </h1>
        <div className="flex items-center gap-3 text-right">
          {isDeployed && <strong className="text-lg text-green-500">Deployed</strong>}
          {experiment.editorUrl && (
            <Button
              variant={isRunning || isDeployed ? 'destructive' : 'default'}
              disabled={(status === 'Draft' && isStarting) || noEditPermissions || isEnded}
              onClick={() => (isRunning || isDeployed ? setWantsToEnd(true) : startExperiment(experimentId))}
            >
              {isEnded && <span>Ended</span>}
              {isStarting && <span>Starting...</span>}
              {noEditPermissions && <span>No Edit Permissions (Google Analytics)</span>}
              {!noEditPermissions && isDraft && !isStarting && <span>Start Experiment</span>}
              {(isRunning || isDeployed) && <span>End Experiment</span>}
            </Button>
          )}
        </div>
      </div>
      <ConfirmDialog
        title="End Experiment?"
        text="Are you sure you want to end this experiment?"
        open={wantsToEnd}
        onClose={() => setWantsToEnd(false)}
        onConfirm={async () => {
          await endExperiment(experimentId);
          setWantsToEnd(false);
        }}
      />
    </div>
  );
};
