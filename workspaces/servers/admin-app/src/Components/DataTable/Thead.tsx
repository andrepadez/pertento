import { cn } from 'helpers/cn';
const { BUILD_ENV } = process.env;

const isProduction = BUILD_ENV === 'production';

export const Thead = (props) => {
  const { columns, orderBy, order } = props;

  return (
    <thead class="bg-gray-50 dark:bg-gray-800">
      <tr>
        {columns.map((column) => {
          const url = new URL(props.url);
          const isOrdered = orderBy === column.sortKey;
          url.protocol = isProduction ? 'https' : 'http';
          if (isOrdered) {
            url.searchParams.set('order', order === 'asc' ? 'desc' : 'asc');
          } else {
            url.searchParams.set('orderBy', column.sortKey);
            url.searchParams.set('order', 'asc');
          }
          const icon = isOrdered
            ? order === 'asc'
              ? 'arrow-down-narrow-wide'
              : 'arrow-up-narrow-wide'
            : 'arrow-down-up';
          return (
            <th
              scope="col"
              class="border-r-2 px-2 py-1 text-center text-sm font-bold text-gray-500 last:border-r-0 lg:px-4 lg:py-3.5 rtl:text-right dark:text-gray-400"
            >
              {column.sortKey ? (
                <button
                  class="mx-auto flex items-center gap-x-3 focus:outline-none"
                  hx-get={url.toString()}
                  hx-push-url={url.toString().replace('/list?', '?')}
                >
                  <span class="mx-auto block">{column.label}</span>
                  <i class={cn('size-3 text-black', isOrdered && 'text-blue-500')} data-lucide={icon}></i>
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
