import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Editor } from './Editor';
import 'shadcn/tailwind.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('pertento-editor-root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Editor />
    </QueryClientProvider>
  </React.StrictMode>,
);
