import ApproveForms from '../../Pages/dashboardtabs/ApproveForms';
import DataExport from '../../Pages/dashboardtabs/DataExport';
import { Route, Routes } from 'react-router-dom';
import Employees from '../../Pages/dashboardtabs/Employees';
import Clients from '../../Pages/dashboardtabs/Clients';
import Tanks from '../../Pages/dashboardtabs/Tanks';

export default function Content() {
  return (
    <div className='content-wrapper' style={{backgroundColor: '#BDBDBD', height: '100vh', }}>
      <Routes>
        <Route path='/Approve Forms' element={<ApproveForms />} />
        <Route path='/Employees' element={<Employees />} />
        <Route path='/Clients' element={<Clients />} />
        <Route path='/Tanks' element={<Tanks />} />
        <Route path='/Data Export' element={<DataExport />} />
      </Routes>
    </div>
  );
}
