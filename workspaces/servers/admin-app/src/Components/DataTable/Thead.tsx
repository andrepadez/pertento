export const Thead = ({ columns }) => {
  return (
    <thead class="bg-gray-50 dark:bg-gray-800">
      <tr>
        {columns.map((column) => (
          <th
            scope="col"
            class="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
          >
            {column.sortKey ? (
              <button class="flex items-center gap-x-3 focus:outline-none">
                <span>{column.label}</span>
                <i data-lucide="arrow-up-narrow-wide"></i>
              </button>
            ) : (
              <span>{column.label}</span>
            )}
          </th>
        ))}
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
