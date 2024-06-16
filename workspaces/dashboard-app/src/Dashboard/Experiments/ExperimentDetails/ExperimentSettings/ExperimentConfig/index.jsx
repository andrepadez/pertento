import { VariantsConfig } from './VariantsConfig';
import { GoalsConfig } from './GoalsConfig';
import { UrlTargeting } from './UrlTargeting';
import { DeviceTargeting } from './DeviceTargeting';
import { ActivityLog } from './ActivityLog';

export const ExperimentConfig = ({ experiment }) => {
  return (
    <div className="flex flex-col gap-10">
      <VariantsConfig experimentId={experiment.id} />
      <GoalsConfig experimentId={experiment.id} />
      <UrlTargeting experimentId={experiment.id} />
      <DeviceTargeting experimentId={experiment.id} />
      <ActivityLog experimentId={experiment.id} />
    </div>
  );
};
