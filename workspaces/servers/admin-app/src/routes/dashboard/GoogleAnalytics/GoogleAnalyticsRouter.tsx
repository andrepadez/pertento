import { Hono } from 'hono-server';
import { db, eq, asc, GanOauth } from 'pertentodb';
import { DataTable } from '@/Components/DataTable';
import { LazyLoader } from '@/Components/LazyLoader';
const { VITE_ADMIN_URL } = process.env;
console.log(VITE_ADMIN_URL);

export const googleAnalyticsRouter = new Hono();

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

googleAnalyticsRouter.get('/', async (c) => {
  return c.render(
    <section class="mx-auto px-4">
      <Header />
      <LazyLoader url="/google-analytics/list" />
    </section>,
  );
});

googleAnalyticsRouter.get('/list', async (c) => {
  const oAuthAccounts = await db.query.GanOauth.findMany({
    where: eq(GanOauth.companyId, c.get('user').companyId),
    orderBy: asc(GanOauth.name),
  });

  await wait(250);

  return c.html(
    <DataTable
      uniqueKey="email"
      data={oAuthAccounts}
      columns={[
        {
          field: 'image',
          label: '',
          format: ({ value }) => (
            <div class="h-12 w-12">
              <img className="w-12 h-12 rounded-full" src={value} />
            </div>
          ),
        },
        {
          field: 'name',
          label: 'Name',
          sortKey: 'name',
        },
        {
          field: 'email',
          label: 'Email',
          sortKey: 'email',
        },
        {
          field: 'accountsCount',
          label: '# Accounts',
        },
        {
          field: 'lastRefreshed',
          label: 'last updated',
          format: ({ value }) => {
            const date = new Date(value);
            return <div>{date.getFullYear() > 1970 ? date.toLocaleString() : 'never'}</div>;
          },
        },
        {
          field: 'email',
          label: '',
          format: ({ value }) => (
            <button size="sm" onClick={() => refresh(value)}>
              Refresh
            </button>
          ),
        },
      ]}
    />,
  );
});

const Header = () => {
  return (
    <div class="sm:flex sm:items-center sm:justify-between">
      <div>
        <div class="flex items-center gap-x-3">
          <h2 class="text-lg font-medium text-gray-800 dark:text-white">Customers</h2>

          <span class="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-600 dark:bg-gray-800 dark:text-blue-400">
            240 vendors
          </span>
        </div>

        <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">
          These companies have purchased in the last 12 months.
        </p>
      </div>

      <div class="mt-4 flex items-center gap-x-3">
        <button class="flex w-1/2 items-center justify-center gap-x-2 rounded-lg border bg-white px-5 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 sm:w-auto dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_3098_154395)">
              <path
                d="M13.3333 13.3332L9.99997 9.9999M9.99997 9.9999L6.66663 13.3332M9.99997 9.9999V17.4999M16.9916 15.3249C17.8044 14.8818 18.4465 14.1806 18.8165 13.3321C19.1866 12.4835 19.2635 11.5359 19.0351 10.6388C18.8068 9.7417 18.2862 8.94616 17.5555 8.37778C16.8248 7.80939 15.9257 7.50052 15 7.4999H13.95C13.6977 6.52427 13.2276 5.61852 12.5749 4.85073C11.9222 4.08295 11.104 3.47311 10.1817 3.06708C9.25943 2.66104 8.25709 2.46937 7.25006 2.50647C6.24304 2.54358 5.25752 2.80849 4.36761 3.28129C3.47771 3.7541 2.70656 4.42249 2.11215 5.23622C1.51774 6.04996 1.11554 6.98785 0.935783 7.9794C0.756025 8.97095 0.803388 9.99035 1.07431 10.961C1.34523 11.9316 1.83267 12.8281 2.49997 13.5832"
                stroke="currentColor"
                stroke-width="1.67"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_3098_154395">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <span>Import</span>
        </button>

        <button class="flex w-1/2 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-blue-500 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 hover:bg-blue-600 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-5 w-5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>

          <span>Add vendor</span>
        </button>
      </div>
    </div>
  );
};

const Tabs = () => {
  return (
    <div class="mt-6 md:flex md:items-center md:justify-between">
      <div class="inline-flex divide-x overflow-hidden rounded-lg border bg-white rtl:flex-row-reverse dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-900">
        <button class="bg-gray-100 px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:bg-gray-800 dark:text-gray-300">
          View all
        </button>

        <button class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-100 sm:text-sm dark:text-gray-300 dark:hover:bg-gray-800">
          Monitored
        </button>

        <button class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-100 sm:text-sm dark:text-gray-300 dark:hover:bg-gray-800">
          Unmonitored
        </button>
      </div>

      <div class="relative mt-4 flex items-center md:mt-0">
        <span class="absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="mx-3 h-5 w-5 text-gray-400 dark:text-gray-600"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </span>

        <input
          type="text"
          placeholder="Search"
          class="block w-full rounded-lg border border-gray-200 bg-white py-1.5 pl-11 pr-5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 md:w-80 rtl:pl-5 rtl:pr-11 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
        />
      </div>
    </div>
  );
};

const Pagination = () => {
  return (
    <div class="mt-6 sm:flex sm:items-center sm:justify-between">
      <div class="text-sm text-gray-500 dark:text-gray-400">
        Page <span class="font-medium text-gray-700 dark:text-gray-100">1 of 10</span>
      </div>

      <div class="mt-4 flex items-center gap-x-4 sm:mt-0">
        <a
          href="#"
          class="flex w-1/2 items-center justify-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 sm:w-auto dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-5 w-5 rtl:-scale-x-100"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
          </svg>

          <span>previous</span>
        </a>

        <a
          href="#"
          class="flex w-1/2 items-center justify-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 sm:w-auto dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          <span>Next</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-5 w-5 rtl:-scale-x-100"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </a>
      </div>
    </div>
  );
};
