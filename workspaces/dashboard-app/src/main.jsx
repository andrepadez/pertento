import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'shadcn/sonner';
import { App } from './App.jsx';
import 'shadcn/tailwind.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster
        position="top-center"
        toastOptions={{
          classNames: {
            toast: 'bg-white border-4 border-primary text-black dark:text-white',
            title: 'text-lg font-bold dark:text-black',
            description: 'text-black',
            actionButton: 'bg-zinc-400',
            cancelButton: 'bg-orange-400',
            closeButton: 'bg-lime-400',
          },
        }}
      />
    </QueryClientProvider>
  </React.StrictMode>,
);
