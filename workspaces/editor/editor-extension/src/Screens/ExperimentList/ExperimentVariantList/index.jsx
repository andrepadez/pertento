import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'shadcn/tabs';
import { ExperimentVariantsTable } from './ExperimentVariantsTable';
import { useExtensionData } from '@/state/useExtensionData';

export const ExperimentVariantList = () => {
  const [view, setView] = useState();
  const { experiments } = useExtensionData();
  if (!experiments) return null;

  const { drafts, running } = experiments;
  const defaultView = drafts.length > 0 ? 'drafts' : running.length === 0 ? 'drafts' : 'running';

  return (
    <div className="flex flex-col gap-5 text-sm">
      <Tabs onValueChange={setView} defaultValue={defaultView} className="w-full">
        <TabsList className="w-full gap-5">
          <TabsTrigger value="drafts" disabled={drafts.length === 0}>
            Drafts ({drafts.length})
          </TabsTrigger>
          <TabsTrigger value="running" disabled={running.length === 0}>
            Running ({running.length})
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <ExperimentVariantsTable experiments={experiments[view || defaultView]} />
    </div>
  );
};
