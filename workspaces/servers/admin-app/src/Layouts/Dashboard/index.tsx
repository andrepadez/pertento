import { jsxRenderer } from 'hono-server';
import { Header } from './Header';

const DashboardLayout = ({ children, user }) => {
  const CONFIG_REQUEST = "event.detail.headers[`Authorization`] = `Bearer ${localStorage.getItem('BEARER_TOKEN')}`;";
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="htmx-config" content='{"selfRequestsOnly": false}' />
        <title>Document</title>
        <script
          src="https://unpkg.com/htmx.org@2.0.0"
          integrity="sha384-wS5l5IKJBvK6sPTKa2WZ1js3d947pvWXbPJ1OmWfEuxLgeHcEbjUUA5i9V5ZkpCw"
          crossorigin="anonymous"
        ></script>
        <script src="https://cdn.jsdelivr.net/gh/gnat/surreal@main/surreal.js"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://unpkg.com/lucide@latest"></script>
      </head>
      <body hx-on:htmx-config-request={CONFIG_REQUEST}>
        <Header user={user} />
        <main class="mx-auto min-h-screen w-[50%] max-w-[1024px] pt-20">{children}</main>
        <script>lucide.createIcons();</script>
      </body>
    </html>
  );
};

export const dashboardRenderer = jsxRenderer(
  (props, c) => {
    return <DashboardLayout user={c.user}>{props.children}</DashboardLayout>;
  },
  {
    docType: '<!DOCTYPE html>',
  },
);
