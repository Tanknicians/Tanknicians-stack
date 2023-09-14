import Employees from './Employees/Employees';
import Clients from './Clients/Clients';
import Analytics from './Tanks/Tanks';
import DataExport from './DataExport/DataExport';
import { Route, Routes } from 'react-router-dom';
import ApproveForms from './ApproveForms/ApproveForms';

export default function Content() {
  // test dev push
  return (
    <div className='content-wrapper'>
      <Routes>
        <Route path='/Approve Forms' element={<ApproveForms />} />
        <Route path='/Employees' element={<Employees />} />
        <Route path='/Clients' element={<Clients />} />
        <Route path='/Analytics' element={<Analytics />} />
        <Route path='/Data Export' element={<DataExport />} />
      </Routes>
    </div>
  );
}
