import { Tabs, TabsContent, TabsList, TabsTrigger } from 'shadcn/tabs';

export const ExperimentsTabs = ({ view, changeView, counts }) => {
  return (
    <Tabs value={view} onValueChange={changeView}>
      <TabsList className="flex gap-5">
        {VIEW_OPTIONS.map((option) => (
          <TabsTrigger key={option.label} value={option.value}>
            {`${option.label} (${counts?.[option.value] || 0})`}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

const VIEW_OPTIONS = [
  {
    label: 'All Experiments',
    value: 'All',
  },
  {
    label: 'Running',
    value: 'Running',
  },
  {
    label: 'Drafts',
    value: 'Draft',
  },
  {
    label: 'Ended',
    value: 'Ended',
  },
  {
    label: 'Archived',
    value: 'Archived',
  },
];
