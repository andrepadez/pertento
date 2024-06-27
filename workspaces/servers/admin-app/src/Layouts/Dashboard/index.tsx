import { jsxRenderer } from 'hono-server';
import { Header } from './Header';

export const DashboardLayout = ({ children, user }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="htmx-config" content='{"selfRequestsOnly": false}' />
        <title>Document</title>
        <script src="https://unpkg.com/htmx.org@2.0.0"></script>
        {/* <script src="https://cdn.jsdelivr.net/gh/gnat/surreal@main/surreal.js"></script> */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://unpkg.com/lucide@latest"></script>
      </head>
      <body>
        <Header user={user} />
        <main class="mx-auto min-h-dvh w-[50%] max-w-[1024px] pt-20">{children}</main>
        <script>lucide.createIcons();</script>
      </body>
    </html>
  );
};

export const dashboardRenderer = jsxRenderer(
  (props, c) => {
    const user = c.get('user');
    console.log(user);
    return <DashboardLayout user={c.get('user')}>{props.children}</DashboardLayout>;
  },
  {
    docType: '<!DOCTYPE html>',
  },
);
