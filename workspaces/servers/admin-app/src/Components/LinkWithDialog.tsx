import { Dialog } from '@/Components/Dialog';
import { stringifyFunction } from 'helpers/stringify-function';

export const LinkWithDialog = ({ children, action }) => {
  const randomId = Math.random().toString(36).substring(7);

  const onClick = stringifyFunction(
    (ev) => {
      ev.preventDefault();
      const dialog = document.getElementById(randomId);
      dialog.showModal();
    },
    { randomId },
  );

  return (
    <label>
      <a onClick={onClick}>
        <span>{action}</span>
      </a>
      <Dialog id={randomId}>{children}</Dialog>
    </label>
  );
};
