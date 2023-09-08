import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import PasswordResetPage from './Pages/PasswordResetPage';
import RequireAuth from './Redux/slices/auth/RequireAuth'
import DashboardPage from './Pages/DashboardPage'
import LoginPage from './Pages/LoginPage'

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
  )
}
