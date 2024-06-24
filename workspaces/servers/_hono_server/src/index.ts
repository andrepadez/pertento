import { $ } from 'bun';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { bodyParser } from './middlewares';
import { CustomError } from 'custom-errors';
import { sendMail } from 'emailer';
export * from 'hono';
export * from './middlewares';
export * from 'hono/jsx-renderer';

export const HonoServer = (port, serverName) => {
  const app = new Hono();
  app.use(cors());
  app.use(bodyParser());

  app.onError((error, c) => {
    if (error instanceof CustomError && !error.returnValue) {
      return c.text(error.message, error.statusCode);
    }

    console.log(error);

    const headers = c.req.header();
    const stack = error.stack;
    const message = error.message;
    const body = typeof c.body === 'object' ? c.body : null;
    const user = c.user;
    const url = c.req.url;
    const method = c.req.method;
    const timestamp = new Date().toLocaleString();

    sendMail({
      to: 'andre.padez@pertento.ai',
      subject: `Unexpected Error in Server ${serverName} (${timestamp})`,
      template: 'UnexpectedError',
      data: {
        serverName,
        timestamp,
        url,
        method,
        message,
        stack,
        body,
        headers: JSON.parse(JSON.stringify(headers)),
        user,
      },
    });

    if (error.returnValue) {
      if (typeof error.returnValue === 'string') {
        return c.text(error.returnValue, error.statusCode);
      } else {
        return c.json(error.returnValue, error.statusCode);
      }
    }

    return c.text('Internal Server Error', 501);
  });

  Bun.serve({
    port,
    fetch: app.fetch,
  });

  console.log(serverName, 'running on port', port);

  return app;
};
