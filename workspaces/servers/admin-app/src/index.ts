import { $ } from 'bun';
import { HonoServer } from 'hono-server';
import { appRouter } from './routes';
import { serveStatic } from '@hono/node-server/serve-static';
import { CookieStore, sessionMiddleware } from 'hono-sessions';

const { ADMIN_PORT: PORT, BUILD_ENV } = process.env;

if (BUILD_ENV === 'development') {
  await $`bunx tailwindcss -i ./src/tailwind.css -o ./public/tailwind.css --minify`.text();
}

const app = HonoServer(PORT, 'Admin fullstack HTMX App');

app.use(
  sessionMiddleware({
    store: new CookieStore(),
    encryptionKey: process.env.JWT_SECRET,
    expireAfterSeconds: 60 * 60 * 15,
    cookieOptions: {
      path: '/',
      httpOnly: true,
      secure: BUILD_ENV === 'production',
    },
    sessionCookieName: 'pertento-admin-session',
  }),
);

app.use('/*', serveStatic({ root: 'public/' }));
app.route('/', appRouter);
app.onError((err, c) => {
  console.log(err);
});

process.on('beforeExit', (code) => {
  console.log(`Event loop is empty!`);
});

process.on('exit', (code) => {
  console.log(`Process is exiting with code ${code}`);
});
