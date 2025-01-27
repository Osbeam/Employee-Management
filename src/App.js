import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./admin/component/Layout";
import Dashboard from "./admin/pages/Dashboard";
import Data_operator from "./admin/pages/Data_operator";
import Login from "./Login";
import Hr from "./hr/pages/Hr";
import Employee from "./admin/pages/Employee";
import ChannelPartner from "./admin/pages/Channel Partner/ChannelPartner";
import Leads from "./admin/pages/Leads";
import DirectSales from "./admin/pages/Direct sale/DirectSales";
import DirectLeadInfo from "./admin/pages/Direct sale/DirectLeadInfo";
import New_employee from "./hr/pages/New_employee";
import Employee_list from "./hr/pages/Employee_list";
import Hr_Layout from "./hr/component/Hr_Layout";
import Attendence from "./hr/pages/Attendence";
import Leave_management from "./hr/pages/Leave-Management/Leave_management";
import Hr_docs from "./hr/pages/Hr_docs";
import Hr_Dashboard from "./hr/pages/Hr_Dashboard";
import Pending_Leads from "./admin/pages/Pending_Leads";
import Edit_Employee_List from "./hr/pages/Edit_Employee_List";
import ProtectedRoute from "./ProtectedRoute";
import SalaryIncome from "./admin/pages/Direct sale/SalaryIncome";
import BusinessIncome from "./admin/pages/Direct sale/BusinessIncome";
import ProfessionalIncome from "./admin/pages/Direct sale/ProfessionalIncome";
import SnsCp from "./admin/pages/Channel Partner/SnsCp";
import CpApp from "./admin/pages/Channel Partner/CpApp";
import NewRegi from "./hr/pages/Leader/NewRegi";
import Attendnc from "./hr/pages/Leader/Attendnc";
import EmpReport from "./hr/pages/Leader/EmpReport";
import Branch from "./admin/pages/Branch/Branch";
import AddBranch from "./admin/pages/Branch/AddBranch";
import EditBranch from "./admin/pages/Branch/EditBranch";
import PermissionbyHr from "./hr/pages/PermissionbyHr";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />

        {/* Admin Routes */}
        <Route
          path="/admin/:userId"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dataoperator" element={<Data_operator />} />
          <Route path="channelpartner" element={<ChannelPartner />} />
          <Route path="snscp" element={<SnsCp />} />
          <Route path="cpapp" element={<CpApp />} />
          <Route path="employee" element={<Employee />} />
          <Route path="leads" element={<Leads />} />
          <Route path="pendingleads" element={<Pending_Leads />} />
          <Route path="directsales" element={<DirectSales />} />
          <Route path="branch" element={<Branch />} />
          <Route path="/admin/:userId/branch/addbranch" element={<AddBranch />} />
          <Route path="/admin/:userId/branch/editbranch/:id" element={<EditBranch />} />
          <Route

            path="/admin/:userId/directsales/salaryincome/:dataId"
            element={<SalaryIncome />}
          />
          <Route
            path="/admin/:userId/directsales/businessincome/:dataId"
            element={<BusinessIncome />}
          />
          <Route
            path="/admin/:userId/directsales/:path/:dataId/:currentPage"
            element={<SalaryIncome />}
          />
          <Route
            path="/admin/:userId/directsales/businessincome/:dataId/:currentPage"
            element={<BusinessIncome />}
          />
          <Route
            path="/admin/:userId/directsales/professionalincome/:dataId/:currentPage"
            element={<ProfessionalIncome />}
          />
        </Route>

        {/* HR Panel Routes */}
        <Route
          path="/hrpanel/:userId"
          element={
            <ProtectedRoute>
              <Hr_Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Hr_Dashboard />} />
          <Route path="new-employee" element={<New_employee />} />
          <Route path="employee-list" element={<Employee_list />} />
          <Route
            path="/hrpanel/:userId/employee-list/edit-employee-list/:id"
            element={<Edit_Employee_List />}
          />
          <Route path="attendence" element={<Attendence />} />
          <Route path="leave-management" element={<Leave_management />} />
          <Route path="hr-docs" element={<Hr_docs />} />
          <Route path="newreg" element={<NewRegi />} />
          <Route path="leaderattendence" element={<Attendnc />} />
          <Route path="empreport" element={<EmpReport />} />
          <Route path="permissionbyhr" element={<PermissionbyHr />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

