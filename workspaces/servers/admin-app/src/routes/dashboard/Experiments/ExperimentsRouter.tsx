import { Hono } from 'hono-server';
import { experimentsMiddleware } from '@/middlewares/experiments';
import { db, eq, asc, count, isNull, isNotNull, and, desc, Experiments } from 'pertentodb';
import { cn } from 'helpers/cn';

import { LazyLoader } from '@/Components/LazyLoader';
import { DataTable } from '@/Components/DataTable';
import { formatDateTime } from 'helpers/formatters';
import { EXPERIMENTS } from '@/cache';

const formatDateField = ({ value }) => formatDateTime(value) || 'Not Avaliable';

export const experimentsRouter = new Hono();
experimentsRouter.use(experimentsMiddleware);

experimentsRouter.get('/', async (c) => {
  const { view } = c.req.query();
  if (!view) {
    const { nextUrl } = c.var;
    nextUrl.searchParams.set('view', 'All');
    return c.redirect(nextUrl.toString());
  }

  const url = new URL(c.req.url);
  url.pathname += '/list';

  return c.render(
    <section class="mx-4">
      <Header />
      <ExperimentTabs c={c} />
      <div class="">
        <LazyLoader url={url.toString()} />
      </div>
    </section>,
  );
});

experimentsRouter.get('/list', async (c) => {
  const { experiments, nextUrl } = c.var;
  const { view, pageSize = 7, page = 1, orderBy = 'status', order = 'asc' } = c.req.query();

  const experimentContainer = experiments[view.replace(/s$/, '')];

  const data = experimentContainer
    .toSorted((a, b) => {
      if (orderBy === 'status') {
        if (order === 'asc') {
          return statusSortMap[a.status] - statusSortMap[b.status];
        } else {
          return statusSortMap[b.status] - statusSortMap[a.status];
        }
      }

      if (order === 'asc') {
        return a[orderBy] < b[orderBy] ? 1 : -1;
      } else {
        return a[orderBy] > b[orderBy] ? 1 : -1;
      }
    })
    .slice((page - 1) * pageSize, page * pageSize);

  return c.html(
    <div class="flex flex-col gap-10">
      <DataTable
        data={data}
        url={nextUrl}
        pageSize={+pageSize || null}
        page={+page || null}
        orderBy={orderBy}
        order={order}
        total={experimentContainer.length}
        columns={[
          { label: 'ID', field: 'id', sortKey: 'id' },
          view === 'All' && { label: 'Status', field: 'status', sortKey: 'status' },
          {
            label: 'Name',
            field: 'name',
            sortKey: 'name',
            format: ({ row }) => (
              <a className="underline" href={`/experiments/${row.id}`}>
                {row.name}
              </a>
            ),
          },
          {
            label: 'Sessions',
            field: 'sessions',
            sortKey: 'sessions',
          },
          { label: 'Starts At', field: 'startsAt', format: formatDateField, sortKey: 'startsAt' },
          { label: 'Ends At', field: 'endsAt', format: formatDateField, sortKey: 'endsAt' },
          { label: 'Created', field: 'createdAt', format: formatDateField, sortKey: 'createdAt' },
          {
            label: 'actions',
            field: 'id',
            // format: ({ item }) => {
            //   return <RowActions experiment={item} />;
            // },
          },
        ]}
      />
    </div>,
  );
});

const ExperimentTabs = ({ c }) => {
  const { nextUrl, experiments } = c.var;
  const { view } = c.req.query();
  const urlStr = nextUrl.toString();

  return (
    <div class="border-b border-b-gray-200 text-sm">
      <ul class="-mb-px flex items-center gap-4 font-medium">
        <li class="flex-1">
          <a
            href={nextUrl.toString().replace(/view\=\w+/, 'view=All')}
            class={cn(
              'relative flex items-center justify-center gap-2 px-1 py-3 text-sm text-gray-500 after:absolute after:bottom-0 after:left-0 after:h-0.5 hover:text-blue-700 lg:text-base',
              view === 'All' && 'text-blue-700 after:w-full after:bg-blue-700',
            )}
          >
            All
            <span class="hidden rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-500 lg:inline">
              {experiments.All.length}
            </span>
          </a>
        </li>
        <li class="flex-1">
          <a
            href={nextUrl.toString().replace(/view\=\w+/, 'view=Running')}
            class={cn(
              'relative flex items-center justify-center gap-2 px-1 py-3 text-sm text-gray-500 after:absolute after:bottom-0 after:left-0 after:h-0.5 hover:text-blue-700 lg:text-base',
              view === 'Running' && 'text-blue-700 after:w-full after:bg-blue-700',
            )}
          >
            Running
            <span class="hidden rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-500 lg:inline">
              {experiments.Running.length}
            </span>
          </a>
        </li>
        <li class="flex-1">
          <a
            href={nextUrl.toString().replace(/view\=\w+/, 'view=Drafts')}
            class={cn(
              'relative flex items-center justify-center gap-2 px-1 py-3 text-sm text-gray-500 after:absolute after:bottom-0 after:left-0 after:h-0.5 hover:text-blue-700 lg:text-base',
              view === 'Drafts' && 'text-blue-700 after:w-full after:bg-blue-700',
            )}
          >
            Drafts
            <span class="hidden rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-500 lg:inline">
              {experiments.Draft.length}
            </span>
          </a>
        </li>
        <li class="flex-1">
          <a
            href={nextUrl.toString().replace(/view\=\w+/, 'view=Ended')}
            class={cn(
              'relative flex items-center justify-center gap-2 px-1 py-3 text-sm text-gray-500 after:absolute after:bottom-0 after:left-0 after:h-0.5 hover:text-blue-700 lg:text-base',
              view === 'Ended' && 'text-blue-700 after:w-full after:bg-blue-700',
            )}
          >
            Ended
            <span class="hidden rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-500 lg:inline">
              {experiments.Ended.length}
            </span>
          </a>
        </li>
        <li class="flex-1">
          <a
            href={nextUrl.toString().replace(/view\=\w+/, 'view=Archived')}
            class={cn(
              'relative flex items-center justify-center gap-2 px-1 py-3 text-sm text-gray-500 after:absolute after:bottom-0 after:left-0 after:h-0.5 hover:text-blue-700 lg:text-base',
              view === 'Archived' && 'text-blue-700 after:w-full after:bg-blue-700',
            )}
          >
            Archived
            <span class="hidden rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-500 lg:inline">
              {experiments.Archived.length}
            </span>
          </a>
        </li>
      </ul>
    </div>
  );
};

const Header = () => {
  return (
    <div class="flex items-center justify-end">
      <div class="mt-2 flex items-center lg:mt-4">
        <button class="flex items-center justify-between gap-x-2 rounded-lg bg-blue-500 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 hover:bg-blue-600 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-500">
          <i data-lucide="plus"></i>
          <span>New Experiment</span>
        </button>
      </div>
    </div>
  );
};

const statusSortMap = {
  Running: 0,
  Draft: 1,
  Ended: 2,
};
