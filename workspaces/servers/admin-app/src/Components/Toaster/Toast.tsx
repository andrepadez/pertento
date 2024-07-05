import { stringifyFunction } from 'helpers/stringify-function';
import { cn } from 'helpers/cn';
import { Script } from '@/Components/Script';

export const Toast = ({ children, timeout = 5000, title, variant, ...props }) => {
  const randomId = 'toast-' + Math.random().toString(36).substring(7);

  const onLoad = () => {
    const toaster = document.getElementById(randomId);
    const toasterProvider = document.getElementById('toaster-provider');
    toasterProvider.appendChild(toaster);
    if (timeout) {
      setTimeout(() => {
        toaster.remove();
      }, timeout);
    }
  };

  return (
    <div
      id={randomId}
      class={cn(
        'animate-toaster max-w-xs rounded-xl border-4 bg-white shadow-lg first:mt-5',
        variant === 'destructive' && 'bg-red-500 text-sm text-white',
      )}
      role="alert"
    >
      <div class="flex w-full justify-between gap-10 px-2 py-2">
        <div class="grid gap-3">
          {title && <h5>{title}</h5>}
          <div>{children} </div>
        </div>
        <div class="ms-auto">
          <button
            type="button"
            class="inline-flex size-5 flex-shrink-0 items-center justify-center rounded-lg opacity-50 hover:opacity-100 focus:opacity-100 focus:outline-none"
          >
            <span class="sr-only">Close</span>
            <svg
              class="size-4 flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
      </div>
      <Script js={onLoad} randomId={randomId} timeout={timeout} />
    </div>
  );
};
