import { $ } from 'bun';
import { HonoServer } from 'hono-server';
import { appRouter } from './routes';
import { Layout } from '@/Layouts/Dashboard';
import * as errors from 'custom-errors';
import { serveStatic } from 'hono/bun';
import reload from 'reload';
import path from 'node:path';

const { ADMIN_PORT: PORT } = process.env;

const app = HonoServer(PORT, 'Admin fullstack HTMX App');

app.use('*', serveStatic({ root: 'public/' }));

app.route('/', appRouter);

await $`bunx tailwindcss -i ./src/tailwind.css -o ./public/tailwind.css --minify`.text();
