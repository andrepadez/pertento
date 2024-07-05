import { db, eq, asc, count, isNull, isNotNull, and, desc, Experiments } from 'pertentodb';
import { cn } from 'helpers/cn';
import { LazyLoader } from '@/Components/LazyLoader';
import { DataTable } from '@/Components/DataTable';
import { ExperimentsListTabs } from './ExperimentsListTabs';
import { ExperimentsListHeader } from './ExperimentsListHeader';
import { ButtonWithDialog } from '@/Components/ButtonWithDialog';
import { formatDateTime } from 'helpers/formatters';

const formatDateField = ({ value }) => formatDateTime(value) || 'Not Avaliable';

export const experimentsPageHandler = async (ctx) => {
  const { view } = ctx.req.query();
  if (!view) {
    const { nextUrl } = ctx.var;
    nextUrl.searchParams.set('view', 'All');
    return ctx.redirect(nextUrl.toString());
  }

  const url = new URL(ctx.req.url);
  url.pathname += '/list';

  return ctx.render(
    <section class="mx-4 flex flex-col gap-1 lg:gap-5">
      <ExperimentsListHeader />
      <ExperimentsListTabs ctx={ctx} />
      <div class="">
        <LazyLoader url={url.toString()} />
      </div>
    </section>,
  );
};

export const experimentsListHandler = async (ctx) => {
  const { experiments, nextUrl } = ctx.var;
  const { view, pageSize = 7, page = 1, orderBy = 'status', order = 'asc' } = ctx.req.query();

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

  return ctx.html(
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
              <a class="no-underline focus:no-underline" href={`/experiments/${row.id}`}>
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
};

const statusSortMap = {
  Running: 0,
  Draft: 1,
  Ended: 2,
};
