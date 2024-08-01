import { useState } from 'react';
import { Card } from 'shadcn/card';
import { Button } from 'shadcn/button';
import { DataTable } from 'components/DataTable';
import { ConfirmDialog } from 'components/Dialogs/ConfirmDialog';
import { useExperiment } from '@/state/experiments/useExperiment';
import { cn } from 'helpers/cn';

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
          <h4>Deployed Variant</h4>
          <DataTable
            data={[stats[deployed.id]]}
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
              label: 'Deploy',
              format: ({ value, item }) =>
                item.name !== 'Original' && (
                  <>
                    <Button onClick={() => setWantsToDeploy(item)}>Deploy</Button>
                  </>
                ),
            },
          ].filter((col) => !deployed || col.label !== 'Deploy')}
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

const formatCurrency = (value, currency) => {
  const locale = navigator.language || navigator.languages[0];
  const formatter = new Intl.NumberFormat(locale, { style: 'currency', currency });
  return formatter.format(value);
};

const formatNumber = (value) => {
  const locale = navigator.language || navigator.languages[0];
  const formatter = new Intl.NumberFormat(locale);
  return formatter.format(value || 0);
};

const formatPercentage = (value) => (value ? `${value.toFixed(2)}%` : '00.00%');

const formatDiff = (value, isPercent, decimals = false) =>
  value ? `${value > 0 ? '+' : ''}${value.toFixed(decimals ? 2 : 0)}${isPercent ? '%' : ''}` : '';
