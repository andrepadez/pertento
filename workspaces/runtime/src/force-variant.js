import { log } from 'helpers/injector/console';

export const checkIfForceVariant = () => {
  const url = new URL(window.location.href);
  const isForceVariant = url.searchParams.get('pertento-force-variant');
  const isOnlyVariant = url.searchParams.get('pertento-only-variant');
  const resetVariants = url.searchParams.get('pertento-reset-variants');
  log('checkIfForceVariant', !!(isForceVariant || isOnlyVariant || resetVariants), { isForceVariant, isOnlyVariant });

  if (!isForceVariant && !isOnlyVariant && !resetVariants) return false;

  if (resetVariants) {
    localStorage.removeItem('PERTENTO_VARIANTS_URL_SEARCH');
    url.searchParams.delete('pertento-reset-variants');
    window.location.href = url.toString();
  }

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
      log('isOnlyVariant', exp, experiment, expString);
      if (exp !== experiment) {
        searchParams.set(expString, 'original');
      } else {
        searchParams.set(expString, variant);
      }
    });
  }
  log('searchParams', searchParams.toString());
  localStorage.setItem('PERTENTO_VARIANTS_URL_SEARCH', '&' + searchParams.toString());
  log('checkIfForceVariant', searchParams.toString());
  window.location.href = url.toString();
  return true;
};
