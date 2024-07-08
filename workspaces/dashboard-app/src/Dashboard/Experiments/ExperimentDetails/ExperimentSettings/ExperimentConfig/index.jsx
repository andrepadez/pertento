import { VariantsConfig } from './VariantsConfig';
import { GoalsConfig } from './GoalsConfig';
import { UrlTargeting } from './UrlTargeting';
import { DeviceTargeting } from './DeviceTargeting';
import { CookieTargeting } from './CookieTargeting';
import { ActivityLog } from './ActivityLog';
import { cn } from 'helpers/cn';

export const ExperimentConfig = ({ experiment }) => {
  return (
    <div className="flex flex-col gap-10">
      <VariantsConfig experimentId={experiment.id} />
      <GoalsConfig experimentId={experiment.id} />
      <UrlTargeting experimentId={experiment.id} />
      <div className={cn('grid grid-cols-2 gap-4'}>
        <DeviceTargeting experimentId={experiment.id} />
        <CookieTargeting experimentId={experiment.id} />
      </div>
      <ActivityLog experimentId={experiment.id} />
    </div>
  );
};
