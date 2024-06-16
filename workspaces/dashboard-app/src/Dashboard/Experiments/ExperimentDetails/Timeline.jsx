import { Link } from 'react-router-dom';
import { Card } from 'shadcn/card';
import { Button } from 'shadcn/button';
import { Separator } from 'shadcn/separator';
import { formatDateTime } from 'helpers/formatters';
import { CheckMark } from 'components/CheckMark';
import { cn } from 'helpers/cn';

export const Timeline = ({ experiment }) => {
  const createdAt = formatDateTime(experiment.createdAt);
  const updatedAt = formatDateTime(experiment.updatedAt);
  const startsAt = formatDateTime(experiment.startsAt);
  const endsAt = formatDateTime(experiment.endsAt);
  const { status } = experiment;
  const hasStarted = status !== 'Draft';
  const hasEnded = status === 'Ended';

  return (
    <div>
      <div className="flex w-full gap-5">
        <div className="flex items-center flex-1 gap-4">
          <div className="flex-col mt-2">
            <CheckMark />
          </div>
          <div>
            <h3 className="text-sm font-bold">EXPERIMENT CREATED</h3>
            <span className="text-xs">at {createdAt}</span>
          </div>
        </div>

        <div className="flex items-center flex-1">
          <Separator className="h-[2px]" />
        </div>

        <div className="flex items-center justify-center flex-1 gap-4">
          <div className="flex-col mt-2">
            <CheckMark className={!hasStarted && 'bg-gray-400'} />
          </div>
          <div>
            <h3
              className={cn(
                'text-sm font-bold text-gray-400',
                hasStarted && 'text-black dark:text-white',
              )}
            >
              EXPERIMENT RUNNING
            </h3>
            {hasStarted && <span className="text-xs">since {startsAt}</span>}
          </div>
        </div>

        <div className="flex items-center flex-1">
          <Separator className="h-[2px]" />
        </div>

        <div className="flex items-center justify-end flex-1 gap-4">
          <div className="flex-col mt-2">
            <CheckMark className={!hasEnded && 'bg-gray-400'} />
          </div>
          <div>
            <h3
              className={cn(
                'text-sm font-bold text-gray-400',
                hasEnded && 'text-black dark:text-white',
              )}
            >
              EXPERIMENT CONCLUDED
            </h3>
            {hasEnded && <span className="text-xs">{endsAt}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};
