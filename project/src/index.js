import React from 'react';
import ReactDOM from 'react-dom/client';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import './index.css';
import App from './App.jsx';
const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
  })
  
  const persister = createSyncStoragePersister({
    storage: window.localStorage,
  })
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <PersistQueryClientProvider
    client={queryClient}
    persistOptions={{ persister }}
    >
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
);