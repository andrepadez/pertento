import { stringifyFunction } from 'helpers/stringify-function';

export const ButtonWithDialog = ({ children, action }) => {
  const onClick = stringifyFunction((ev) => {
    ev.currentTarget.nextSibling.showModal();
  });

  const onCloseHandler = stringifyFunction((ev) => {
    const modal = ev.currentTarget;
    const { clientX, clientY } = ev;
    const { left, right, top, bottom } = modal.getBoundingClientRect();
    const isOnBackdrop = clientX < left || clientX > right || clientY < top || clientY > bottom;
    if (isOnBackdrop) {
      modal.close();
    }
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
      <dialog
        onClick={onCloseHandler}
        id="create-experiment-popover"
        class="open:animate-modalf rounded-2xl p-8 [&::backdrop]:bg-black/75"
      >
        {children}
      </dialog>
    </div>
  );
};
