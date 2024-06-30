const { BUILD_ENV } = process.env;
const isProduction = BUILD_ENV === 'production';

export const Pagination = (props) => {
  const { page, pageSize, count, total } = props;
  const url = new URL(props.url);
  const nextPageUrl = new URL(url);
  const prevPageUrl = new URL(url);
  nextPageUrl.protocol = isProduction ? 'https' : 'http';
  prevPageUrl.protocol = isProduction ? 'https' : 'http';
  nextPageUrl.searchParams.set('page', page + 1);
  prevPageUrl.searchParams.set('page', page - 1);
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div class="mt-6 flex w-full items-center justify-between text-center lg:mx-auto lg:w-[50%]">
      <button
        disabled={page === 1}
        class="flex items-center justify-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 disabled:opacity-50 sm:w-auto dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
        hx-get={prevPageUrl.toString()}
        hx-replace-url={prevPageUrl.toString().replace('/list', '')}
      >
        <i class="size-4 rtl:-scale-x-100" data-lucide="arrow-left"></i>
        <span>Previous</span>
      </button>

      <div class="text-sm text-gray-500 dark:text-gray-400">
        <span class="font-medium text-gray-700 dark:text-gray-100">
          Page {page} of {totalPages} ({total})
        </span>
      </div>

      <button
        class="flex items-center justify-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 disabled:opacity-50 sm:w-auto dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
        disabled={page === totalPages}
        hx-get={nextPageUrl.toString()}
        hx-replace-url={nextPageUrl.toString().replace('/list', '')}
      >
        <span>Next</span>

        <i class="size-4" data-lucide="arrow-right"></i>
      </button>
    </div>
  );
};
