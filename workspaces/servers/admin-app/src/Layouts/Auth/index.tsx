import { jsxRenderer } from 'hono-server';

export const AuthLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
      <body>
        <main class="mx-auto min-h-screen w-[50%] max-w-[1024px]">
          <div className="absolute right-5 top-5"></div>
          <div className="flex items-center justify-center gap-10">
            <img className="h-24" src="/pertento_light.png" alt="pertento" />
          </div>
          <div className="flex justify-center">{children}</div>
        </main>
        <script>lucide.createIcons();</script>
      </body>
    </html>
  );
};

export const authRenderer = jsxRenderer(({ children }) => <AuthLayout>{children}</AuthLayout>, {
  docType: '<!DOCTYPE html>',
});
