import { cn } from 'helpers/cn';
export const Tcell = ({ value, row, data, column, field }) => {
  return (
    <td
      class={cn(
        'whitespace-nowrap border-r-2 px-2 py-2 text-sm font-medium last:border-r-0 lg:px-4 lg:py-4',
        // !row && 'border-r-0',
      )}
    >
      {row ? column.format ? column.format({ value, row, data, field }) : <div>{value}</div> : <div>&nbsp;</div>}
    </td>
  );
};
