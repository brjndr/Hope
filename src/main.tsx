import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '@store/store'
import { AuthProvider } from './auth/AuthProvider.tsx'
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";



const queryClient = new QueryClient({
  queryCache: new QueryCache({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      if (error?.message?.includes("401")) {
        window.location.href = "/unauthorized";
      }
    }
  }),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </AuthProvider>
    </ReduxProvider>
  </StrictMode>,
)
