import { jsxRenderer } from 'hono-server';
import { Header } from './Header';
import { Footer } from './Footer';
import { ToasterProvider } from '@/Components/Toaster';

export const DashboardLayout = ({ children, ctx, user, url }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="htmx-config" content='{"selfRequestsOnly": false}' />
        <meta name="htmx-config" content='{"globalViewTransitions": true}' />
        <title>Document</title>
        <link rel="stylesheet" href="/tailwind.css" />
        <script src="https://unpkg.com/htmx.org@2.0.0"></script>
        <script src="https://unpkg.com/lucide@latest"></script>
      </head>
      <body class="bg-[#101828]">
        <Header ctx={ctx} user={user} url={url} />
        <main class="mx-auto min-h-[calc(100dvh-4rem)] w-full bg-white px-2 py-24">{children}</main>
        <Footer ctx={ctx} user={user} url={url} />
        <ToasterProvider />
        <script>htmx.config.globalViewTransitions = true;</script>
        <script src="/js/htmx-config.js"></script>
      </body>
    </html>
  );
};

export const dashboardRenderer = jsxRenderer(
  (props, ctx) => {
    const user = ctx.get('user');
    return (
      <DashboardLayout ctx={ctx} user={ctx.get('user')} url={new URL(ctx.req.url)}>
        {props.children}
      </DashboardLayout>
    );
  },
  {
    docType: '<!DOCTYPE html>',
  },
);
