import { stringifyFunction } from 'helpers/stringify-function';

export const Details = ({ children, ...props }) => {
  const closeDetails = stringifyFunction(() => {
    const details = document.querySelector('details[open]');
    details?.removeAttribute('open');
  });

  return (
    <details {...props} onblur={closeDetails} onmouseleave={closeDetails}>
      {children}
    </details>
  );
};
