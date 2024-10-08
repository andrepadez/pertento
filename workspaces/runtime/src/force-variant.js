import { log } from 'helpers/injector/console';

export const checkIfForceVariant = () => {
  const url = new URL(window.location.href);
  const isForceVariant = url.searchParams('pertento-force-variant');
  const isOnlyVariant = url.searchParams('pertento-only-variant');
  log('checkIfForceVariant', !isForceVariant && !isOnlyVariant, { isForceVariant, isOnlyVariant });

  if (!isForceVariant && !isOnlyVariant) return false;

  return true;
};
