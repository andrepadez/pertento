import { log } from 'helpers/injector/console';

export const checkIfForceVariant = () => {
  const url = new URL(window.location.href);
  const isForceVariant = url.searchParams.get('pertento-force-variant');
  const isOnlyVariant = url.searchParams.get('pertento-only-variant');
  log('checkIfForceVariant', !isForceVariant && !isOnlyVariant, { isForceVariant, isOnlyVariant });

  if (!isForceVariant && !isOnlyVariant) return false;

  const variantsUrlSearch = localStorage.getItem('PERTENTO_VARIANTS_URL_SEARCH');
  const searchParams = new URLSearchParams(variantsUrlSearch);

  const [experiment, variant] = (isForceVariant || isOnlyVariant).split('-');

  if (isForceVariant) {
    url.searchParams.delete('pertento-force-variant');
    searchParams.set(`exp-${experiment}`, variant);
  } else if (isOnlyVariant) {
    url.searchParams.delete('pertento-only-variant');
    searchParams.forEach((variant, expString) => {
      const [, exp] = expString.split('-');
      if (exp !== experiment) {
        searchParams.set(expString, 'none');
      } else {
        searchParams.set(expString, variant);
      }
    });
  }

  localStorage.setItem('PERTENTO_VARIANTS_URL_SEARCH', searchParams.toString());
  window.location.href = url.toString();
};
