import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'shadcn/tabs';
import { ExperimentVariantsTable } from './ExperimentVariantsTable';
import { useExtensionData } from '@/state/useExtensionData';

export const ExperimentVariantList = () => {
  const [view, setView] = useState('Draft');
  const { experiments, counts, VIEW_OPTIONS } = useExtensionData();
  if (!experiments) return null;

  const { Draft, Running } = experiments;

  return (
    <div className="flex flex-col gap-5 text-sm">
      <Tabs value={view} onValueChange={setView}>
        <TabsList className="flex gap-5">
          {VIEW_OPTIONS.map((option) => (
            <TabsTrigger key={option.label} value={option.value}>
              {`${option.label} (${counts?.[option.value] || 0})`}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <ExperimentVariantsTable experiments={experiments[view || defaultView]} />
    </div>
  );
};
