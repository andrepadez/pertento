const console = window?.console;
const isDebug = !!localStorage.getItem('PERTENTO_DEBUG');

const log = (...args) => {
  if (isDebug) {
    console.info('PERTENTOAI:', ...args);
  }
};

export { log };
