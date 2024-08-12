import { Hono } from 'hono';
import { stripeRouter } from './stripe';

export const paymentsRouter = new Hono();

paymentsRouter.route('/stripe', stripeRouter);
