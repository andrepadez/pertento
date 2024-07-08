import { stringifyFunction } from 'helpers/stringify-function';

export const Dialog = ({ children, ...props }) => {
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
    <dialog onClick={onCloseHandler} {...props} class="rounded-2xl p-8 open:animate-modalf [&::backdrop]:bg-black/75">
      {children}
    </dialog>
  );
};
