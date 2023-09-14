import ApproveForms from './ApproveForms/ApproveForms';
import DataExport from './DataExport/DataExport';
import { Route, Routes } from 'react-router-dom';
import Employees from './Employees/Employees';
import Clients from './Clients/Clients';
import Tanks from './Tanks/Tanks';

export default function Content() {
  return (
    <div className='content-wrapper'>
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
