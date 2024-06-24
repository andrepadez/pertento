import { HonoServer } from 'hono-server';
import { appRouter } from './routes';
import { Layout } from '@/Layouts/Dashboard';
import * as errors from 'custom-errors';
import { serveStatic } from 'hono/bun';
import path from 'node:path';

const { ADMIN_PORT: PORT } = process.env;

const app = HonoServer(PORT, 'Admin fullstack HTMX App');

app.use('*', serveStatic({ root: 'public/' }));

app.route('/', appRouter);
