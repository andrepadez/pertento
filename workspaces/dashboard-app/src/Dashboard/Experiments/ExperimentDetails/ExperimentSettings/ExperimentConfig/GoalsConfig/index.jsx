import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from 'shadcn/card';
import { Button } from 'shadcn/button';
import { Separator } from 'shadcn/separator';
import { Badge } from 'shadcn/badge';
import { GoalsConfigDialog } from './GoalsConfigDialog';
import { useExperiment } from '@/state/experiments/useExperiment';

export const GoalsConfig = ({ experimentId }) => {
  const [isOpenGoalConfig, setIsOpenGoalConfig] = useState(false);
  const manager = useExperiment(experimentId);
  const { experiment } = manager;
  if (!experiment?.website?.ganPropertyId) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Tag Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          {experiment.eventGoals?.map((goal) => (
            <Badge
              key={goal}
              variant="outline"
              className="px-5 py-2 bg-gray-200 rounded-sm dark:bg-gray-500"
            >
              {goal}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full">
          <Separator className="mb-2" />
          <Button className="font-bold" variant="ghost" onClick={() => setIsOpenGoalConfig(true)}>
            + Set Goals
          </Button>
        </div>
      </CardFooter>
      {isOpenGoalConfig && (
        <GoalsConfigDialog manager={manager} onClose={() => setIsOpenGoalConfig(false)} />
      )}
    </Card>
  );
};
