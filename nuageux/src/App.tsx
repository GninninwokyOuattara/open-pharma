
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './contexts/auth';
import appRouter from './router/appRouter';



function App() {
  const queryClient = new QueryClient()




  return (
    <>

      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={appRouter} />
        </AuthProvider>
      </QueryClientProvider>

    </>
  )
}

export default App
