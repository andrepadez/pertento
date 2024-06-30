import { Table } from './Table';
import { Thead } from './Thead';
import { Tcell } from './Tcell';

export const DataTable = (props) => {
  const { data, columns, url, pageSize, page, orderBy, order } = props;
  return (
    <div hx-target="this" hx-swap="outerHTML">
      <Table>
        <Thead {...props} />
        <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
          {data.map((row) => (
            <tr>
              {columns.map((col) => (
                <Tcell value={row[col.field]} row={row} data={data} column={col} field={col.field} />
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <script>lucide.createIcons();</script>
    </div>
  );
};

/*
Q: Is there a way to update the browser url, 
  just to change query string, without the page being reloaded?

A: Yes, you can update the browser's URL query string without reloading the page 
    by using the history.pushState() method. This method allows you to modify the 
    history entry for the current page, which in turn updates the URL in the browser's 
    address bar. Here's how you can do it:

    ```javascript
    // Define the new query string
    const newQueryString = '?param=value';

    // Update the URL without reloading the page
    history.pushState(null, '', newQueryString);
    ```
*/
