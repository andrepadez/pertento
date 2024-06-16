import { $ } from 'bun';
import { createSpinner } from 'nanospinner';
const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

export const checkDependencies = async () => {
  const errors = [];
  const spinner = createSpinner('Checking dependencies...').start();
  await $`bun -v`.quiet().catch((ex) => errors.push('bun'));
  await $`node -v`.quiet().catch((ex) => errors.push('node'));
  await $`npm -v`.quiet().catch((ex) => errors.push('npm'));
  await $`pm2 -v`.quiet().catch((ex) => errors.push('pm2'));
  await $`psql --version`.quiet().catch((ex) => errors.push('postgresql'));
  await $`redis-cli --version`.quiet().catch((ex) => errors.push('redis'));
  await $`mailhog --version`.quiet().catch((ex) => errors.push('mailhog'));
  await sleep(2000);

  if (errors.length === 0) {
    spinner.success({ text: 'All dependencies were correctly detected!' });
  } else {
    spinner.error({ text: `Some dependencies are missing: ${errors.join(', ')}` });
  }

  await sleep(1000);
};
