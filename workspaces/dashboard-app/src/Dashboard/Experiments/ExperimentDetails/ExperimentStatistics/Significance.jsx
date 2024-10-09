import { useState } from 'react';
import { Card } from 'shadcn/card';
import { Button } from 'shadcn/button';
import { DataTable } from 'components/DataTable';
import { ConfirmDialog } from 'components/Dialogs/ConfirmDialog';
import { useExperiment } from '@/state/experiments/useExperiment';
import { cn } from 'helpers/cn';
import { formatDateTime, formatCurrency, formatNumber, formatPercentage, formatDiff } from 'helpers/formatters';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent } from 'shadcn/dropdown-menu';
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from 'shadcn/dropdown-menu';
import { DropdownMenuTrigger } from 'shadcn/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

export const Significance = ({ experiment, manager }) => {
  const [wantsToDeploy, setWantsToDeploy] = useState(null);
  const { variants, statistics, original, totalSessions, goal, currency } = manager;
  const { deployExperiment } = useExperiment(experiment.id);

  if (!statistics) return null;

  const onDeployConfirm = async () => {
    await deployExperiment(wantsToDeploy.id);
    setWantsToDeploy(null);
  };

  const deployed = variants.find((variant) => variant.deployed);

  const data = variants
    .filter((variant) => !variant.deployed)
    .map((variant) => ({ ...variant, ...statistics[variant.id] }))
    .sort((a, b) => a.createdAt - b.createdAt);

  return (
    <div className="grid gap-4">
      {deployed && (
        <Card className="grid gap-2 bg-green-100 p-5">
          <div className="flex items-center justify-between">
            <h4>Deployed Variant</h4>
            <h6>since {formatDateTime(deployed.deployed)}</h6>
          </div>
          <DataTable
            data={[{ ...deployed, ...statistics[deployed.id] }]}
            columns={[
              { field: 'id' },
              { field: 'name', label: 'Name' },
              {
                field: 'sessions',
                label: 'Sessions',
                format: ({ value, item }) => {
                  return <span>{formatNumber(value)}</span>;
                },
              },
              {
                field: goal.toLowerCase(),
                label: goal,
                format: ({ value }) => formatNumber(value),
              },
              {
                field: 'average',
                label: 'Average',
                format: ({ value }) => (goal === 'Revenue' ? formatNumber(value, currency) : formatPercentage(value)),
              },
            ]}
          />
        </Card>
      )}
      <Card className="grid gap-2 p-5">
        {!!deployed ? <h4>Results</h4> : <h4>Significance</h4>}
        <DataTable
          data={data}
          columns={[
            { field: 'id' },
            { field: 'name', label: 'Name' },
            {
              field: 'weight',
              label: 'Weight',
              format: ({ value, item }) => {
                const realWeight = (item.sessions / totalSessions) * 100;
                return (
                  <div>
                    <span>{formatPercentage(value / 100, true)}&nbsp;</span>
                    <span>({formatPercentage(realWeight, true)})</span>
                  </div>
                );
              },
            },
            {
              field: 'sessions',
              label: 'Sessions',
              format: ({ value, item }) => <span>{formatNumber(value)}</span>,
            },
            {
              field: goal.toLowerCase(),
              label: goal,
              format: ({ value }) => formatNumber(value),
            },
            {
              field: 'average',
              label: 'Average',
              format: ({ value }) => (goal === 'Revenue' ? formatNumber(value, currency) : formatPercentage(value)),
            },
            {
              field: 'difference',
              label: 'Difference',
              format: ({ value, item }) => (
                <span className={cn(value > 0 && 'text-green-500')}>
                  {item.id !== original.id && formatNumber(value)}
                </span>
              ),
            },
            {
              field: 'improvement',
              label: 'Improvement',
              format: ({ value, item }) => (
                <span className={cn(value > 0 && 'text-green-500')}>
                  {item.id !== original.id && formatPercentage(value)}
                </span>
              ),
            },
            {
              field: 'id',
              label: 'View',
              format: ({ item }) => {
                const urlForce = new URL(experiment.editorUrl);
                urlForce.searchParams.set('pertento-force-variant', `${experiment.id}-${item.id}`);
                const urlOnly = new URL(experiment.editorUrl);
                urlOnly.searchParams.set('pertento-only-variant', `${experiment.id}-${item.id}`);
                const urlReset = new URL(experiment.editorUrl);
                urlReset.searchParams.set('pertento-reset-variants', 'true');
                console.log(urlOnly.toString(), urlForce.toString());
                return (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open actions</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Force Variant</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => window.open(urlOnly)}>Only this Variant</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => window.open(urlForce)}>Keep other Variants</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => window.open(urlReset)}>Reset</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              },
            },
            {
              field: 'id',
              label: 'Deploy',
              format: ({ value, item }) =>
                item.name !== 'Original' && (
                  <>
                    <Button onClick={() => setWantsToDeploy(item)}>Deploy</Button>
                  </>
                ),
            },
          ].filter((col) => !deployed || !['Deploy', 'View'].includes(col.label))}
        />
        {!!wantsToDeploy && (
          <ConfirmDialog
            title={`Deploy Variant "${wantsToDeploy.name}"?`}
            text={`Are you sure you want to deploy this variant?`}
            open={true}
            onClose={() => setWantsToDeploy(null)}
            onConfirm={onDeployConfirm}
          />
        )}
      </Card>
    </div>
  );
};
