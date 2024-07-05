import { cn } from 'helpers/cn';

export const ExperimentsListTabs = ({ ctx }) => {
  const { nextUrl, experiments } = ctx.var;
  const { view } = ctx.req.query();
  nextUrl.searchParams.set('page', '1');
  const urlStr = nextUrl.toString();

  return (
    <div class="border-b border-b-gray-200 text-sm">
      <ul class="-mb-px flex items-center gap-4 font-medium">
        <li class="flex-1">
          <a
            href={urlStr.replace(/view\=\w+/, 'view=All')}
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
            href={urlStr.replace(/view\=\w+/, 'view=Running')}
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
            href={urlStr.replace(/view\=\w+/, 'view=Drafts')}
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
            href={urlStr.replace(/view\=\w+/, 'view=Ended')}
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
            href={urlStr.replace(/view\=\w+/, 'view=Archived')}
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
