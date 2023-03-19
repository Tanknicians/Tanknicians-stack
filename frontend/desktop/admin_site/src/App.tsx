import DashboardPage from './Pages/DashboardPage';
import LoginPage from './Pages/LoginPage';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import RequireAuth from './Services/RequireAuth';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path ='/' element={<LoginPage/>} />

        {/* protected routes */}
        <Route element ={<RequireAuth />}>
          <Route path ='/dashboard/*' element={<DashboardPage/>} />
        </Route>

      </Routes>
    </BrowserRouter>
  );  
}
