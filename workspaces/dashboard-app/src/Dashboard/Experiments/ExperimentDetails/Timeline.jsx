import { Link } from 'react-router-dom';
import { Card } from 'shadcn/card';
import { Button } from 'shadcn/button';
import { Separator } from 'shadcn/separator';
import { formatDateTime, formatDate, daysAgo } from 'helpers/formatters';
import { CheckMark } from 'components/CheckMark';
import { cn } from 'helpers/cn';

export const Timeline = ({ experiment }) => {
  const createdAt = formatDate(experiment.createdAt);
  const updatedAt = formatDateTime(experiment.updatedAt);
  const endsAt = formatDateTime(experiment.endsAt);
  const deployedVariant = experiment.variants.find((v) => v.deployed);
  const deployedAt = deployedVariant?.deployed && [
    formatDate(deployedVariant?.deployed),
    daysAgo(deployedVariant?.deployed, endsAt || new Date()),
  ];
  const startsAt = [
    formatDate(experiment.startsAt),
    daysAgo(experiment.startsAt, experiment.endsAt || deployedVariant?.deployed || new Date()),
  ];
  const { status } = experiment;
  const hasStarted = status !== 'Draft';
  const hasEnded = status === 'Ended';
  const isDeployed = status === 'Deployed';

  return (
    <div>
      <div className="flex w-full gap-5">
        <div className="flex-2 flex items-center gap-4">
          <div className="mt-2 flex-col">
            <CheckMark />
          </div>
          <div>
            <h3 className="text-sm font-bold">CREATED</h3>
            <span className="text-xs">at {createdAt}</span>
          </div>
        </div>

        <div className="flex flex-1 items-center">
          <Separator className="h-[2px]" />
        </div>

        <div className="flex-2 flex items-center justify-center gap-4">
          <div className="mt-2 flex-col">
            <CheckMark className={!hasStarted && 'bg-gray-400'} />
          </div>
          <div>
            <h3 className={cn('text-sm font-bold text-gray-400', hasStarted && 'text-black dark:text-white')}>
              RUNNING
            </h3>
            {hasStarted && <span className="text-xs">since {startsAt.at(0)}</span>}
          </div>
        </div>

        <div className="grid flex-1 items-center">
          <Separator className="col-start-1 row-start-1 h-[2px]" />
          <div className="col-start-1 row-start-1 text-center">
            <span className="bg-white px-2">for {startsAt.at(1)} days</span>
          </div>
        </div>

        <div className="flex-2 flex items-center justify-center gap-4">
          <div className="mt-2 flex-col">
            <CheckMark className={!deployedVariant && 'bg-gray-400'} />
          </div>
          <div>
            <h3 className={cn('text-sm font-bold text-gray-400', !!deployedVariant && 'text-black dark:text-white')}>
              DEPLOYED
            </h3>
            {!!deployedVariant && <span className="text-xs">at {deployedAt.at(0)}</span>}
          </div>
        </div>

        <div className="grid flex-1 items-center">
          <Separator className="col-start-1 row-start-1 h-[2px]" />
          <div className="col-start-1 row-start-1 text-center">
            {deployedVariant && <span className="bg-white px-2">for {deployedAt.at(1)} days</span>}
          </div>
        </div>

        <div className="flex-2 flex items-center justify-end gap-4">
          <div className="mt-2 flex-col">
            <CheckMark className={!hasEnded && 'bg-gray-400'} />
          </div>
          <div>
            <h3 className={cn('text-sm font-bold text-gray-400', hasEnded && 'text-black dark:text-white')}>ENDED</h3>
            {hasEnded && <span className="text-xs">{endsAt}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};
