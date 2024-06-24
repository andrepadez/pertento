import { Hono } from 'hono';
import { authRouter } from './auth';
import { dashboardRouter } from './dashboard';
import { Layout } from '@/Layouts/Dashboard';

export const appRouter = new Hono();

appRouter.route('/auth', authRouter);
appRouter.route('/', dashboardRouter);
