import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from 'shadcn/card';
import { Button } from 'shadcn/button';
import { Label } from 'shadcn/label';
import { Badge } from 'shadcn/badge';
import { Separator } from 'shadcn/separator';
import { Pencil, Trash2 } from 'lucide-react';
import { CookieTargetingDialog } from './CookieTargetingDialog';
import { useExperiment } from '@/state/experiments/useExperiment';
import { useCookieTargeting } from '@/state/experiments/useCookieTargeting';

export const CookieTargeting = ({ experimentId }) => {
  const { experiment } = useExperiment(experimentId);
  const manager = useCookieTargeting(experimentId);
  const { cookieTargeting, deleteCookieTargeting } = manager;
  const [addOrEditTarget, setAddOrEditTarget] = useState(null);

  console.log('cookieTargeting', cookieTargeting);

  if (!experiment || !cookieTargeting) return null;

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
          {cookieTargeting?.map((item, idx) => (
            <div key={item.id} className="flex items-center justify-between w-full">
              <Label>{item.cookieName}</Label>
              <div>
                {item.cookieValues.map((value, idx) => (
                  <Badge key={value} variant="outline" className="px-10 py-2 bg-gray-200 rounded-sm dark:bg-gray-500">
                    {value}
                  </Badge>
                ))}
              </div>
              <Trash2 className="cursor-pointer" onClick={() => deleteCookieTargeting(item.id)} />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="end">
        <Button className="font-bold" variant="ghost" onClick={() => setAddOrEditTarget(cookieTargeting.at(0) || {})}>
          Set Cookie targeting
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
