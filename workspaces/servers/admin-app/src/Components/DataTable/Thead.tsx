const { BUILD_ENV } = process.env;
const isProduction = BUILD_ENV === 'production';

export const Thead = (props) => {
  const { columns, orderBy, order } = props;

  return (
    <thead class="bg-gray-50 dark:bg-gray-800">
      <tr>
        {columns.map((column) => {
          const url = new URL(props.url);
          url.protocol = isProduction ? 'https' : 'http';
          if (orderBy === column.sortKey) {
            url.searchParams.set('order', order === 'asc' ? 'desc' : 'asc');
          } else {
            url.searchParams.set('orderBy', column.sortKey);
            url.searchParams.set('order', 'asc');
          }
          return (
            <th
              scope="col"
              class="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
            >
              {column.sortKey ? (
                <button
                  class="flex items-center gap-x-3 focus:outline-none"
                  hx-get={url.toString()}
                  hx-replace-url={url.toString().replace('/list?', '?')}
                >
                  <span>{column.label}</span>
                  <i class="size-3 text-black" data-lucide="arrow-up-0-1"></i>
                </button>
              ) : (
                <span>{column.label}</span>
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

{
  /* <th
          scope="col"
          class="px-12 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
        >
          Status
        </th>

        <th
          scope="col"
          class="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
        >
          About
        </th>

        <th
          scope="col"
          class="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
        >
          Users
        </th>

        <th
          scope="col"
          class="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
        >
          License use
        </th>

        <th scope="col" class="relative px-4 py-3.5">
          <span class="sr-only">Edit</span>
        </th> */
}
