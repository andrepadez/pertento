import { Dialog } from '@/Components/Dialog';
import { stringifyFunction } from 'helpers/stringify-function';

export const ButtonWithDialog = ({ children, action }) => {
  const randomId = Math.random().toString(36).substring(7);

  const onClick = stringifyFunction((ev) => {
    ev.currentTarget.nextSibling.showModal();
  });

  return (
    <div>
      <button
        class="flex items-center justify-between gap-x-2 rounded-lg bg-blue-500 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 hover:bg-blue-600 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-500"
        dialogTarget="create-experiment-popopver"
        onClick={onClick}
      >
        <i data-lucide="plus"></i>
        <span>{action}</span>
      </button>
      <Dialog>{children}</Dialog>
    </div>
  );
};
