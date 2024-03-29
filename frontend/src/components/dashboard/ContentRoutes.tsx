import ApproveForms from '../../pages/dashboardtabs/ApproveForms';
import DataExport from '../../pages/dashboardtabs/DataExport';
import { Route, Routes } from 'react-router-dom';
import Employees from '../../pages/dashboardtabs/Employees';
import Clients from '../../pages/dashboardtabs/Clients';
import Tanks from '../../pages/dashboardtabs/Tanks';
import { Helmet } from 'react-helmet';

export default function Content() {
  return (
    <Routes>
      <Route path='/Approve Forms' element={<ApproveForms />} />
      <Route path='/Employees' element={<Employees />} />
      <Route path='/Clients' element={<Clients />} />
      <Route path='/Tanks' element={<Tanks />} />
      <Route path='/Data Export' element={<DataExport />} />
    </Routes>
  );
}
