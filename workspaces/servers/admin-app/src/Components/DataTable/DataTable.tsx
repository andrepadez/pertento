import { Table } from './Table';
import { Thead } from './Thead';
import { Tcell } from './Tcell';
import { Pagination } from './Pagination';
import { cn } from 'helpers/cn';

export const DataTable = (props) => {
  const { data, url, pageSize, page, orderBy, order, total } = props;
  const columns = props.columns.filter(Boolean);
  return (
    <div hx-target="this" hx-swap="outerHTML">
      <Table>
        <Thead columns={columns} orderBy={orderBy} order={order} url={url} />
        <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
          {new Array(pageSize).fill(null).map((_, idx) => {
            const row = data[idx];
            return (
              <tr class={cn('hover:bg-slate-100')}>
                {columns.map((col) => (
                  <Tcell value={row?.[col.field]} row={row} data={data} column={col} field={col.field} />
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
      {<Pagination {...props} />}
    </div>
  );
};
