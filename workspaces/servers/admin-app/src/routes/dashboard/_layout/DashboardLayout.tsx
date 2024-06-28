import { jsxRenderer } from 'hono-server';
import { Header } from './Header';
import { Footer } from './Footer';

export const DashboardLayout = ({ children, user, url }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="htmx-config" content='{"selfRequestsOnly": false}' />
        <title>Document</title>
        <link rel="stylesheet" href="/tailwind.css" />
        <script src="https://unpkg.com/htmx.org@2.0.0"></script>
        <script src="https://unpkg.com/lucide@latest"></script>
      </head>
      <body hx-boost="true" class="bg-[#101828]">
        <Header user={user} />
        <main class="mx-auto min-h-[calc(100dvh-4rem)] w-full bg-white px-2 pt-20">{children}</main>
        <Footer user={user} url={url} />
        <script>lucide.createIcons();</script>
      </body>
    </html>
  );
};

export const dashboardRenderer = jsxRenderer(
  (props, c) => {
    const user = c.get('user');
    return (
      <DashboardLayout user={c.get('user')} url={new URL(c.req.url)}>
        {props.children}
      </DashboardLayout>
    );
  },
  {
    docType: '<!DOCTYPE html>',
  },
);
