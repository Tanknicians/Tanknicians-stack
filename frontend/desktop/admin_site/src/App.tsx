import DashboardPage from './Pages/DashboardPage';
import LoginPage from './Pages/LoginPage';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path ='/' element={<LoginPage/>} />
        <Route path ='/dashboard/*' element={<DashboardPage/>} />
      </Routes>
    </BrowserRouter>
  );  
}
