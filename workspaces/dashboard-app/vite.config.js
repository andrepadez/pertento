import { config as dotenv } from 'dotenv';
import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
const envPath = path.resolve(__dirname, '../../.env');
dotenv({ path: envPath });

const { BUILD_ENV, DASHBOARD_PORT, VITE_ENV } = process.env;
const isProduction = BUILD_ENV !== 'development';

const envs = Object.entries(process.env)
  .filter(([key]) => key.startsWith('VITE_'))
  .reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});

if (isProduction) {
  console.log(envs);
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: DASHBOARD_PORT,
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  build: {
    minify: isProduction,
  },
  plugins: [
    react(),
    // visualizer({
    //   open: true,
    //   gzipSize: true,
    //   brotliSize: true,
    // }),
  ],
});
