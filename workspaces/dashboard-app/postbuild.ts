import { $ } from 'bun';
import path from 'node:path';
const { BUILD_ENV } = process.env;
const isProduction = BUILD_ENV !== 'development';
console.log({ BUILD_ENV, isProduction });

if (isProduction) {
  const originPath = path.resolve('./dist');
  const targetPath = '/var/www/dashboard';
  await $`cp -r ${originPath}/* ${targetPath}`;
}
console.log('Dashboard postbuild script, done: production?', isProduction);
