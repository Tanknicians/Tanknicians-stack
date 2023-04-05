import DashboardPage from './Pages/DashboardPage';
import LoginPage from './Pages/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RequireAuth from './Services/RequireAuth';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient, trpc, trpcClient } from './API/trpcClient';

export default function App() {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LoginPage />} />

            {/* protected routes */}
            <Route element={<RequireAuth />}>
              <Route path='/dashboard/*' element={<DashboardPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
