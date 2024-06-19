import { $ } from 'bun';
import { config as dotenv } from 'dotenv';
import path from 'node:path';
import fs from 'node:fs/promises';
const envPath = path.resolve(__dirname, '../../.env');
dotenv({ path: envPath });
const { BUILD_ENV } = process.env;

const isProduction = BUILD_ENV !== 'development';

console.log('PostBuild Runtime', { isProduction });

const source = path.resolve(__dirname, 'dist', 'assets');
const target = path.resolve(__dirname, '..', 'dashboard-app');
const targetFile1 = path.resolve(target, 'dist', 'pertentoRuntime.js');
const targetFile2 = path.resolve(target, 'public', 'pertentoRuntime.js');

const [name] = await fs.readdir(source);

const file = Bun.file(path.resolve(source, name));
const text = `;(function(){${await file.text()}})();`;

await Bun.write(targetFile1, text);
await Bun.write(targetFile2, text);

if (isProduction) {
  const targetFile3 = path.resolve('/home/andrepadez/production/www/dashboard', 'pertentoRuntime.js');
  const targetFile4 = path.resolve('/home/andrepadez/production/www/dashboard', 'pertentoRuntime-beta.js');
  await $`cp ${targetFile1} ${targetFile3}`;
  await $`cp ${targetFile1} ${targetFile4}`;
}
