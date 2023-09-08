import ServiceForms from './DashboardContent/ServiceForms'
import Employees from './DashboardContent/Employees'
import Clients from './DashboardContent/Clients'
import Analytics from './DashboardContent/Analytics'
import DataExport from './DashboardContent/DataExport'
import { Route, Routes } from 'react-router-dom'

export default function Content() {
  // test dev push
  return (
    <div className='content-wrapper'>
      <Routes>
        <Route path='/Service Forms' element={<ServiceForms />} />
        <Route path='/Employees' element={<Employees />} />
        <Route path='/Clients' element={<Clients />} />
        <Route path='/Analytics' element={<Analytics />} />
        <Route path='/Data Export' element={<DataExport />} />
      </Routes>
    </div>
  )
}
