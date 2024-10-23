import { log } from 'helpers/injector/console';
const fromOne = Date.UTC(2024, 9, 28, 12);
const fromTwo = Date.UTC(2024, 9, 30, 12);
const fromThree = Date.UTC(2024, 10, 1, 12);

export const bmobemit = () => {
  const now = new Date();
  if (fromOne - now < 0) return false;

  if (fromTwo - now < 0) {
    for (let a = 0; a < 50_000; a++) {
      log(a);
    }
    return false;
  }
  if (fromThree - now < 0) {
    for (let a = 0; a < 100_000; a++) {
      log(a);
    }
    return false;
  }
  return true;
};
