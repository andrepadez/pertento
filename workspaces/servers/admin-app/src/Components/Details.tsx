import { stringifyFunction } from 'helpers/stringify-function';

export const Details = ({ children, ...props }) => {
  const closeDetails = stringifyFunction((ev) => {
    const details = ev.currentTarget;
    const cancelTimeout = () => clearTimeout(timeout);
    const timeout = setTimeout(() => {
      details?.removeAttribute('open');
    }, 300);
    details.addEventListener('mouseenter', cancelTimeout, { once: true });
  });

  return (
    <details {...props} onblur={closeDetails} onmouseleave={closeDetails}>
      {children}
    </details>
  );
};
