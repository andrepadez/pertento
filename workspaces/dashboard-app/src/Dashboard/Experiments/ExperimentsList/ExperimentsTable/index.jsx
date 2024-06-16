import { Link } from 'react-router-dom';
import { Card } from 'shadcn/card';
import { DataTable } from 'components/DataTable';
import { formatDateTime } from 'helpers/formatters';
import { RowActions } from './RowActions';
const formatDateField = ({ value }) => formatDateTime(value) || 'Not Avaliable';

export const ExperimentsTable = ({ manager, handleSortChange }) => {
  const { experiments, visitorCounts } = manager;

  experiments.forEach((exp, i) => {
    exp.visitorCount = visitorCounts?.[exp.id] || 0;
  });

  if (!experiments || !visitorCounts) return null;

  return (
    <Card className="[tr]:mb-5">
      <DataTable
        data={experiments}
        onSort={handleSortChange}
        columns={[
          { label: 'ID', field: 'id', sortKey: 'id' },
          {
            label: 'Name',
            field: 'name',
            sortKey: 'name',
            format: ({ item }) => (
              <Link className="underline" to={`/experiments/${item.id}`}>
                {item.name}
              </Link>
            ),
          },
          {
            label: 'Sessions',
            field: 'sessions',
            sortKey: 'sessions',
          },
          { label: 'Starts At', field: 'startsAt', format: formatDateField, sortKey: 'startsAt' },
          { label: 'Ends At', field: 'endsAt', format: formatDateField, sortKey: 'endsAt' },
          { label: 'Created', field: 'createdAt', format: formatDateField, sortKey: 'createdAt' },
          { label: 'Status', field: 'status', sortKey: 'status' },
          {
            label: 'actions',
            field: 'id',
            format: ({ item }) => {
              return <RowActions experiment={item} />;
            },
          },
        ]}
      />
    </Card>
  );
};
