import { Card } from 'shadcn/card';
import { DataTable } from 'components/DataTable';

export const VisitorMonitoring = ({ experiment, manager }) => {
  const { variants, isRunning, elapsed } = manager;

  if (!variants) return null;

  return (
    <Card className="p-5">
      <DataTable
        data={variants}
        columns={[
          { field: 'id' },
          { field: 'name', label: 'Name' },
          { field: 'weight', label: 'Desired Weight' },
          { field: 'weight', label: 'Real Weight' },
        ]}
      />
    </Card>
  );

  return (
    <div className="flex flex-col w-full">
      <Card className="w-full p-5">
        <ul className="text-center list-none">
          <li className="grid grid-cols-5 mb-2 font-bold">
            <span></span>
            <span>Variant</span>
            <span>Visitors</span>
            <span>Real Weight</span>
            <span>Desired Weight</span>
          </li>
          {visitorCount
            ?.sort((a, b) => b.count - a.count)
            ?.map((variant) => {
              const weight = (variant.count / totalCount) * 100;
              return (
                <li key={variant.id} className="grid grid-cols-5">
                  <span>
                    (<strong>{variant.id}</strong>)
                  </span>
                  <span>{variant.name}</span>
                  <span>{variant.count}</span>
                  <span>{isNaN(weight) ? '-' : weight.toFixed(2) + '%'}</span>
                  <span>{(variant.weight / 100).toFixed(2)}%</span>
                </li>
              );
            })}
        </ul>
        <div className="flex justify-between mt-8">
          <h6>Total Visitors: {totalCount}</h6>
          <h6>
            {isRunning ? `running` : 'ran'} for: {elapsed}
          </h6>
        </div>
      </Card>
    </div>
  );
};

//TODO: Fix Visitor Monitoring API
