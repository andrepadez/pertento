import { ThemeToggle } from '@/Components/ThemeToggle';
import { jsxRenderer } from 'hono-server';

export const AuthLayout = ({ children }) => {
  return (
    <html lang="en" class="">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>Document</title>
        <link rel="stylesheet" href="/tailwind.css" />
        <script
          src="https://unpkg.com/htmx.org@2.0.0"
          integrity="sha384-wS5l5IKJBvK6sPTKa2WZ1js3d947pvWXbPJ1OmWfEuxLgeHcEbjUUA5i9V5ZkpCw"
          crossorigin="anonymous"
        ></script>
        {/* <script src="https://cdn.jsdelivr.net/gh/gnat/surreal@main/surreal.js"></script> */}
        <script src="https://unpkg.com/lucide@latest"></script>
      </head>
      <body class="dark:bg-slate-900 dark:text-white">
        <main class="mx-auto min-h-dvh w-full lg:w-[50%] lg:max-w-[1024px]">
          {/* <div class="toggle-theme fixed right-2 top-2">
            <ThemeToggle />
          </div> */}
          <div class="absolute right-5 top-5"></div>
          <div class="flex items-center justify-center gap-10">
            <img class="hidden h-36 dark:block" src="/pertento_dark.png" alt="pertento" />
            <img class="block h-36 dark:hidden" src="/pertento_light.png" alt="pertento" />
          </div>
          <div class="flex justify-center">{children}</div>
        </main>
        <script>lucide.createIcons();</script>
      </body>
    </html>
  );
};

export const authRenderer = jsxRenderer(({ children }) => <AuthLayout>{children}</AuthLayout>, {
  docType: '<!DOCTYPE html>',
});
