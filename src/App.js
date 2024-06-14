import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import './Login.css'
import './admin/pages/Leaders.css'
import  './admin/pages/Data_operator.css'
import  './admin/pages/Employee.css'

import './hr/pages/Employee_list.css'
import './hr/pages/Leave_management.css'
import './hr/pages/Attendence.css'

import Layout from './admin/component//Layout';
import Dashboard from './admin/pages/Dashboard'
import Data_operator from './admin/pages/Data_operator';
import Login from './Login';
import Hr from './hr/pages/Hr';
import Employee from './admin/pages/Employee';
import ChannelPartner from './admin/pages/ChannelPartner';

import New_employee from './hr/pages/New_employee';
import Employee_list from './hr/pages/Employee_list';
import Hr_Layout from './hr/component/Hr_Layout'
import Attendence from './hr/pages/Attendence';
import Leave_management from './hr/pages/Leave_management';
import Hr_docs from './hr/pages/Hr_docs';
import Hr_Dashboard from './hr/pages/Hr_Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/admin' element={<Layout />}>
          <Route index element={< Dashboard />} />
          <Route path='dataoperator' element={<Data_operator />} />
          <Route path='channelpartner' element={<ChannelPartner />} />
          <Route path='employee' element={<Employee />} />
          </Route>
        
          <Route path='/hrpanel' element={<Hr_Layout />}>
          <Route index element={<Hr_Dashboard/>} />
          <Route path='new-employee' element={<New_employee/>} />
          <Route path='employee-list' element={<Employee_list/>} />
          <Route path='attendence' element={<Attendence/>} />
          <Route path='leave-management' element={<Leave_management/>} />
          <Route path='hr-docs' element={<Hr_docs/>} />
          </Route>
          
      
      </Routes>
    </Router>
  );
}

export default App;
