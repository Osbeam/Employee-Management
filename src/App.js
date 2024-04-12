import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import './pages/Employee_list.css'
import './Login.css'
import './pages/Attendence.css'
import './pages/Leaders.css'
import Layout from './component/Layout';
import Dashboard from './pages/Dashboard'
import Telecaller from './pages/Telecaller';
import Login from './Login';
import Hr from './pages/Hr';
import New_employee from './pages/New_employee';
import Employee_list from './pages/Employee_list';
import Attendence from './pages/Attendence';
import Leave_management from './pages/Leave_management';
import Hr_docs from './pages/Hr_docs';
import Leaders from './pages/Leaders';



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/admin' element={<Layout />}>
          <Route index element={< Dashboard />} />
          <Route path='telecaller' element={<Telecaller />} />
          <Route path='leaders' element={<Leaders />} />
          {/* <Route path='hr' element={<Hr />} /> */}
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
