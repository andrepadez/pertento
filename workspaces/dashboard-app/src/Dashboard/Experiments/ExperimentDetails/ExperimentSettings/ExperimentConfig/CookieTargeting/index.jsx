import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from 'shadcn/card';
import { Button } from 'shadcn/button';
import { Badge } from 'shadcn/badge';
import { Separator } from 'shadcn/separator';
import { Pencil, Trash2 } from 'lucide-react';
import { CookieTargetingDialog } from './CookieTargetingDialog';
import { useExperiment } from '@/state/experiments/useExperiment';
import { useDeviceTargeting } from '@/state/experiments/useDeviceTargeting';

export const CookieTargeting = ({ experimentId }) => {
  const { experiment } = useExperiment(experimentId);
  const manager = useDeviceTargeting(experimentId);
  const { deviceTargeting, deleteDeviceTargeting } = manager;
  const [addOrEditTarget, setAddOrEditTarget] = useState(null);

  if (!experiment || !deviceTargeting) return null;

  const isAddDisabled = deviceTargeting.length >= 3 || deviceTargeting.find((item) => item.device === 'All');

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Cookie Targeting</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-1">
        <div className="text-sm text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, animi eaque fugit sequi...
          <Separator className="mt-4" />
        </div>
        <div className="flex flex-col justify-center flex-1 gap-8">
          {[]?.map((item, idx) => (
            <div key={item.id} className="flex items-center gap-10">
              <div className="w-48 text-center">
                <Badge variant="outline" className="px-10 py-2 bg-gray-200 rounded-sm dark:bg-gray-500">
                  {item.device}
                </Badge>
              </div>
              <div className="flex gap-4">
                <Trash2 className="cursor-pointer" onClick={() => deleteDeviceTargeting(item.id)} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="end">
        <Button disabled={isAddDisabled} className="font-bold" variant="ghost" onClick={() => setAddOrEditTarget({})}>
          + Add more Cookie targeting
        </Button>
      </CardFooter>
      {!!addOrEditTarget && (
        <CookieTargetingDialog
          item={addOrEditTarget}
          manager={manager}
          experiment={experiment}
          onClose={() => setAddOrEditTarget(null)}
        />
      )}
    </Card>
  );
};
