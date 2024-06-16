import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'shadcn/table';
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';
import { cn } from 'helpers/cn';

export const DataTable = (props) => {
  const { data, columns, uniqueKey = 'id', onSort } = props;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map(({ label, sortKey, field }, idx) => (
            <TableHead key={idx}>
              <div
                className={cn('flex items-center gap-2', sortKey && 'cursor-pointer')}
                onClick={() => sortKey && onSort && onSort(sortKey)}
              >
                <strong>{label || field}</strong>
                {sortKey && <ArrowUpDown className="w-4 h-4 ml-2" />}
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item[uniqueKey]}>
            {columns.map((column, idx) => {
              const value = item[column.field];
              const { format } = column;
              return (
                <TableCell key={idx}>
                  {format ? format({ value, item, data, idx }) : value}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
