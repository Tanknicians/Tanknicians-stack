import ApproveForms from './ApproveForms';
import DataExport from './DataExport';
import { Route, Routes } from 'react-router-dom';
import Employees from './Employees';
import Clients from './Clients';
import Tanks from './Tanks';

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
