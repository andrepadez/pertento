import { $ } from 'bun';
import path from 'node:path';
import fs from 'node:fs/promises';
import { version } from './package.json';
const { BUILD_ENV } = process.env;
const isProduction = BUILD_ENV !== 'development';

const sourceDir = path.resolve(__dirname, 'src', 'shared');
const targetDir = path.resolve(__dirname, 'dist');
await $`cp -R ${sourceDir}/* ${targetDir}`;

const idbDist = path.resolve(__dirname, '..', '..', '..', 'node_modules', 'idb-keyval', 'dist', 'index.js');
const idb = Bun.file(idbDist);
const target = path.resolve(targetDir, 'idb-keyval.js');
await Bun.write(target, idb);

if (isProduction) {
  console.log(`zipping extension at https://app.pertento.ai/editor/pertento-extension-v${version}.zip`);
  await $`zip -r /home/andrepadez/production/www/dashboard/editor/pertento-extension-v${version}.zip dist`.text();
}
