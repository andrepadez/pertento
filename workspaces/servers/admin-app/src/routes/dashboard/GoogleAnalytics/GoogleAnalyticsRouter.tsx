import { Hono } from 'hono-server';
import { db, count, eq, asc, desc, GanOauth } from 'pertentodb';
import { DataTable } from '@/Components/DataTable';
import { LazyLoader } from '@/Components/LazyLoader';
const { VITE_ADMIN_URL } = process.env;
console.log(VITE_ADMIN_URL);

export const googleAnalyticsRouter = new Hono();

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

googleAnalyticsRouter.get('/', async (ctx) => {
  const url = new URL(ctx.req.url);
  url.pathname += '/list';

  return ctx.render(
    <section class="mx-auto">
      <Header />
      <div class="mx-4">
        <LazyLoader url={url.toString()} />
      </div>
    </section>,
  );
});

googleAnalyticsRouter.get('/list', async (ctx) => {
  const { nextUrl } = ctx.var;
  const { pageSize = 4, page = 1, orderBy, order = 'asc' } = ctx.req.query();
  const sorter = order === 'asc' ? asc : desc;
  const oAuthAccounts = await db.query.GanOauth.findMany({
    where: eq(GanOauth.companyId, ctx.get('user').companyId),
    orderBy: orderBy ? sorter(GanOauth[orderBy]) : sorter(GanOauth.name),
    limit: pageSize,
    offset: (page - 1) * pageSize,
  });

  const [{ count: total }] = await db
    .select({ count: count() })
    .from(GanOauth)
    .where(eq(GanOauth.companyId, ctx.get('user').companyId));

  return ctx.html(
    <DataTable
      uniqueKey="email"
      data={oAuthAccounts}
      url={nextUrl}
      pageSize={+pageSize || null}
      page={+page || null}
      orderBy={orderBy}
      order={order}
      total={total}
      columns={[
        {
          field: 'image',
          label: '',
          format: ({ value }) => (
            <div class="h-6 w-6 lg:h-12 lg:w-12">
              <img className="w-6 h-6 rounded-full lg:h-12 lg:w-12" src={value} />
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
          label: 'Accounts',
          sortKey: 'accountsCount',
        },
        {
          field: 'lastRefreshed',
          label: 'last updated',
          sortKey: 'lastRefreshed',
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
    <div class="flex items-center justify-end">
      <div class="mt-2 flex items-center lg:mt-4">
        <button class="flex items-center justify-between gap-x-2 rounded-lg bg-blue-500 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 hover:bg-blue-600 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-500">
          <i data-lucide="plus"></i>
          <span>Connect a Google account</span>
        </button>
      </div>
    </div>
  );
};
