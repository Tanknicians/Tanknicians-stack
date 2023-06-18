import DashboardPage from './Pages/DashboardPage';
import LoginPage from './Pages/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RequireAuth from './Redux/slices/auth/RequireAuth';
// import PasswordResetPage from './Pages/PasswordResetPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        {/* <Route path='/password-reset' element={<PasswordResetPage />} /> */}

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path='/dashboard/*' element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
