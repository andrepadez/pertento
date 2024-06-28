import { $ } from 'bun';
import { HonoServer } from 'hono-server';
import { appRouter } from './routes';
import { serveStatic } from '@hono/node-server/serve-static';
import { CookieStore, sessionMiddleware } from 'hono-sessions';
await $`bunx tailwindcss -i ./src/tailwind.css -o ./public/tailwind.css --minify`.text();

const { ADMIN_PORT: PORT } = process.env;

const app = HonoServer(PORT, 'Admin fullstack HTMX App');

app.use(
  sessionMiddleware({
    store: new CookieStore(),
    encryptionKey: process.env.JWT_SECRET,
    expireAfterSeconds: 60 * 60 * 15,
    cookieOptions: {
      path: '/',
      httpOnly: true,
    },
    sessionCookieName: 'pertento-admin-session',
  }),
);

app.use('/*', serveStatic({ root: 'public/' }));
app.route('/', appRouter);
app.onError((err, c) => {
  console.log(err.message);
  console.log(err.stack);
});
