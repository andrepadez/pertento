import { cn } from 'helpers/cn';
export const Tcell = ({ value, row, data, column, field, isFirst, isLast }) => {
  return (
    <td class={cn('whitespace-nowrap border-r-2 px-4 py-4 text-sm font-medium last:border-r-0')}>
      {column.format ? column.format({ value, row, data, field }) : <div>{value}</div>}
    </td>
  );
};
