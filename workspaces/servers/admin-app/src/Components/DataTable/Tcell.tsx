export const Tcell = ({ value, row, data, column, field }) => {
  return (
    <td class="whitespace-nowrap px-4 py-4 text-sm font-medium">
      {column.format ? column.format({ value, row, data, field }) : <div>{value}</div>}
    </td>
  );
};
