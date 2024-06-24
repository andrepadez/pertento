import { $ } from 'bun';
import fs from 'node:fs/promises';
import path from 'node:path';
const { BUILD_ENV } = process.env;
const isProduction = BUILD_ENV !== 'development';

console.log({ BUILD_ENV, isProduction });

const originPath = path.resolve('./dist/assets');

const dashboardPublic = path.resolve('..', '..', 'dashboard-app', 'public');
const dashboardDist = path.resolve('..', '..', 'dashboard-app', 'dist');
const productionPath = path.resolve('/var/www/dashboard');

const files = await fs.readdir(originPath);
for (let file of files) {
  const [, ext] = file.split('.');
  if (ext === 'css') {
    const fileHandler = Bun.file(path.resolve(originPath, file));
    let cssString = await fileHandler.text();
    await Bun.write(path.resolve(dashboardPublic, 'editor/editor-app.css'), cssString);
    await Bun.write(path.resolve(dashboardDist, 'editor/editor-app.css'), cssString);
    if (isProduction) {
      await Bun.write(path.resolve(productionPath, 'editor/editor-app.css'), cssString);
    }
  } else if (ext === 'js') {
    const fileHandler = Bun.file(path.resolve(originPath, file));
    const text = await fileHandler.text();
    await Bun.write(path.resolve(dashboardPublic, 'editor/editor-app.js'), `;(function(){${text}})();`);
    await Bun.write(path.resolve(dashboardDist, 'editor/editor-app.js'), `;(function(){${text}})();`);
    if (isProduction) {
      await Bun.write(path.resolve(productionPath, 'editor/editor-app.js'), `;(function(){${text}})();`);
    }
  }
}
