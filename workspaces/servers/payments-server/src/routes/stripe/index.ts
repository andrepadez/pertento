import { Hono } from 'hono';
import { userMiddleware } from 'hono-server';
import { webhookHandler } from './webhook-handler';
import { paymentPlansHandler } from './payment-plans-handler';

export const stripeRouter = new Hono();

stripeRouter.post('/webhook', webhookHandler);

stripeRouter.use(userMiddleware);

stripeRouter.get('/payment-plans', paymentPlansHandler);
