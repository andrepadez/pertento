import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from 'shadcn/card';
import { Button } from 'shadcn/button';
import { Badge } from 'shadcn/badge';
import { Separator } from 'shadcn/separator';
import { Pencil, Trash2 } from 'lucide-react';
import { UrlTargetingDialog } from './UrlTargetingDialog';
import { RegexTester } from './RegexTester';
import { useExperiment } from '@/state/experiments/useExperiment';
import { useUrlTargeting } from '@/state/experiments/useUrlTargeting';
import { UrlTargetingTester } from './UrlTargetingTester';

export const UrlTargeting = ({ experimentId }) => {
  const { experiment } = useExperiment(experimentId);
  const manager = useUrlTargeting(experimentId);
  const { urlTargeting, deleteUrlTargeting } = manager;

  const [addOrEditTarget, setAddOrEditTarget] = useState(null);

  if (!experiment) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div>URL Targeting</div>
          <UrlTargetingTester
            urlTargeting={urlTargeting}
            setAddOrEditTarget={setAddOrEditTarget}
            deleteUrlTargeting={deleteUrlTargeting}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>Visitors whom match the current targeting will be subject to this experiment</CardDescription>
        <div className="flex flex-col justify-center gap-8">
          <Separator className="mt-4" />
          {urlTargeting?.map((item, idx) => (
            <div key={item.id} className="flex items-center justify-between gap-3">
              <div className="flex gap-3">
                <div>
                  <Badge variant="outline" className="rounded-sm bg-gray-200 px-5 py-2 dark:bg-gray-500">
                    When
                  </Badge>
                </div>
                <div className="w-[11rem]">
                  <Badge variant="ghost" className="flex-grow-2 px-5 py-2">
                    URL {item.condition} {item.url.length > 1 && item.condition === 'contains' ? 'any of' : null}
                  </Badge>
                </div>
                <Badge variant="outlined" className="px-5 py-2 text-[0.7rem]">
                  {item.url}
                </Badge>
              </div>
              <div className="flex gap-4">
                <div className="">
                  {idx < urlTargeting.length - 1 && (
                    <Badge variant="outline" className="rounded-sm bg-gray-200 px-5 py-2 dark:bg-gray-500">
                      And
                    </Badge>
                  )}
                </div>
                {item.condition === 'matches regex' ? (
                  <RegexTester regexStr={item.url} />
                ) : (
                  <div className="h-6 w-6 cursor-pointer"></div>
                )}
                <Pencil className="cursor-pointer" onClick={() => setAddOrEditTarget(item)} />
                <Trash2 className="cursor-pointer" onClick={() => deleteUrlTargeting(item.id)} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="font-bold" variant="ghost" onClick={() => setAddOrEditTarget({})}>
          + Add more Url targeting
        </Button>
      </CardFooter>
      {!!addOrEditTarget && (
        <UrlTargetingDialog
          item={addOrEditTarget}
          manager={manager}
          experiment={experiment}
          onClose={() => setAddOrEditTarget(null)}
        />
      )}
    </Card>
  );
};
