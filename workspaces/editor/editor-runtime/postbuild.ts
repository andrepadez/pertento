import { $ } from 'bun';
import fs from 'node:fs/promises';
import path from 'node:path';
const { BUILD_ENV } = process.env;
const isProduction = BUILD_ENV !== 'development';

console.log('EDITOR RUNTIME postbuild');
console.log({ BUILD_ENV, isProduction });

const originPath = path.resolve('./dist/assets');

const dashboardPublic = path.resolve('..', '..', 'dashboard-app', 'public');
const dashboardDist = path.resolve('..', '..', 'dashboard-app', 'dist');
const productionPath = path.resolve('/var/www/dashboard');

const files = await fs.readdir(originPath);
for (let file of files) {
  const [, ext] = file.split('.');
  if (ext === 'js') {
    const fileHandler = Bun.file(path.resolve(originPath, file));
    const text = await fileHandler.text();
    await Bun.write(path.resolve(dashboardPublic, 'editor/editor-runtime.js'), `;(function(){${text}})();`);
    await Bun.write(path.resolve(dashboardDist, 'editor/editor-runtime.js'), `;(function(){${text}})();`);
    if (isProduction) {
      await Bun.write(path.resolve(productionPath, 'editor/editor-runtime.js'), `;(function(){${text}})();`);
    }
  }
}
