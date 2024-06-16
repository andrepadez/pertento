import { Card } from 'shadcn/card';
import { DataTable } from 'components/DataTable';
import { cn } from 'helpers/cn';

export const Significance = ({ experiment, manager }) => {
  const { variants, statistics, original, totalSessions, goal, currency } = manager;

  if (!statistics) return null;

  const data = variants
    .map((variant) => ({ ...variant, ...statistics[variant.id] }))
    .sort((a, b) => a.createdAt - b.createdAt);

  return (
    <Card className="p-5">
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
            format: ({ value }) =>
              goal === 'Revenue' ? formatNumber(value, currency) : formatPercentage(value),
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
        ]}
      />
    </Card>
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
