import { Hono } from 'hono-server';
import { createCookieTargetingHandler } from './create-cookie-targeting';
import { deleteCookieTargetingHandler } from './delete-cookie-targeting';

export const cookieTargetingRouter = new Hono();

cookieTargetingRouter.post('/', createCookieTargetingHandler);
cookieTargetingRouter.delete('/:cookieTargetingId', deleteCookieTargetingHandler);
