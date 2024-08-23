import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

export default function Employee_List() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userCount, setUserCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees(currentPage);
  }, [currentPage]);

  const fetchEmployees = async (page) => {
    try {
      const authToken = localStorage.getItem('jwtoken'); // Retrieve token each time
  
      if (!authToken) {
        console.error('No auth token found in local storage');
        return;
      }
  
      console.log('Fetching employees for page:', page);
  
      const response = await axios.get(
        `http://77.37.45.224:8000/api/user/getEmployee?currentPage=${page}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
  
      console.log('Response:', response);
  
      if (response.data.success) {
        console.log('Employee data:', response.data.data.employees);
  
        setEmployees(response.data.data.employees.map(employee => ({
          ...employee,
          editMode: false,
          original: { ...employee }
        })));
        setCurrentPage(response.data.data.currentPage);
        setTotalPages(response.data.data.totalPage);
        setUserCount(response.data.data.userCount);
      } else {
        console.error('Failed to fetch employee data:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };
  
  
  const handleEdit = (employee) => {
    navigate(`/hrpanel/employee-list/edit-employee-list/${employee._id}?
      firstName=${employee.FirstName}&
      middleName=${employee.MiddleName}&
      mobileno=${employee.MobileNumber}&
      password=${employee.Password}&
      emailid=${employee.EmailId}&
      employeeid=${employee.EmployeeID}&
      bloodgroup=${employee.BloodGroup}&
      HighestQualification=${employee.HighestQualification}&
      Year=${employee.Year}&
      TotalExperience=${employee.TotalExperience}&
      LastCompanyName=${employee.LastCompanyName}&
      JoiningDate=${employee.JoiningDate}&
      Reference1=${employee.Reference1}&
      Relation1=${employee.Relation1}&
      Address1=${employee.Address1}&
      ReferenceName2=${employee.ReferenceName2}&
      Relation2=${employee.Relation2}&
      Address2=${employee.Address2}&
      DateOfJoining=${employee.DateOfJoining}&
      CompanyName=${employee.CompanyName}&
      BasicSalary=${employee.BasicSalary}&
      FixedAllowance=${employee.FixedAllowance}&
      SpecialAllowance=${employee.SpecialAllowance}&
      VeriableAllowance=${employee.VeriableAllowance}&
      OfficialMobileNumber=${employee.OfficialMobileNumber}&
      MobileIMEINumber=${employee.MobileIMEINumber}&
      BankName=${employee.BankName}&
      AccountHolderName=${employee.AccountHolderName}&
      AccountNumber=${employee.AccountNumber}&
      IFSCCode=${employee.IFSCCode}&
      Role=${employee.Role}
      `);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div><h2 style={{ marginBottom: '25px', fontSize: '25px' }}>Employee List</h2></div>
      <div className="table-container">
        <table className="el-table">
          <thead>
            <tr className="el-table-tr">
              <th style={{ minWidth: '75px' }}>Sr. No.</th>
              <th>Fullname</th>
              <th>Employee Id</th>
              <th>Role</th>
              <th>Mobile no.</th>
              <th>Email id</th>
              <th>Address</th>
              <th>Reference name</th>
              <th>Designation</th>
              {/* <th>Report to</th>
              <th>Reporting Manager</th> */}
              <th>Joining Date</th>
              <th>Salary p/m</th>
              <th>Off. Mobile no.</th>
              <th>Off. Email id</th>
              <th>Bank name</th>
              <th>Account no</th>
              <th>IFSC code</th>
              <th>Password</th>
              <th>Position</th>
              <th>Managed By</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee._id}>
                <td>{index + 1 + (currentPage - 1) * 10}</td>
                <td>{employee.FirstName || ''} {employee.MiddleName || ''} {employee.LastName || ''}</td>
                <td>{employee.EmployeeID || '-'}</td>
                <td>{employee.Role && employee.Role.length > 0 ? employee.Role.join(', ') : '-'}</td>
                <td>{employee.MobileNumber || '-'}</td>
                <td>{employee.EmailId || '-'}</td>
                <td>{employee.CurrentAddress ? employee.CurrentAddress.Caddress1 || '-' : '-'}</td>
                <td>{employee.Reference1 || '-'}</td>
                <td>{employee.Designation ? employee.Designation.name : '-'}</td>
                {/* <td>{designations.find(desig => desig._id === employee.Designation)?.name || '-'}</td> */}
                {/* <td>{employee.ReportingTo && employee.ReportingTo.length > 0 ? employee.ReportingTo.join(', ') : '-'}</td> */}
                {/* <td>{employee.ManagerName && employee.ManagerName.length > 0 ? employee.ManagerName.join(', ') : '-'}</td> */}
                <td>{employee.DateOfJoining || '-'}</td>
                <td>{employee.BasicSalary || '-'}</td>
                <td>{employee.OfficialMobileNumber || '-'}</td>
                <td>{employee.OfficialEmailId || '-'}</td>
                <td>{employee.BankName || '-'}</td>
                <td>{employee.AccountNumber || '-'}</td>
                <td>{employee.IFSCCode || '-'}</td>
                <td>{employee.Password || '-'}</td>
                <td>{Array.isArray(employee.Position) && employee.Position.length > 0 ? employee.Position.join(', ') : '-'}</td>
                <td>
                  {employee.ManagedBy
                    ? `${employee.ManagedBy.FirstName || ''} ${employee.ManagedBy.LastName || ''}`
                    : '-'}
                </td>
                <td className="statusbtn">
                  <button
                    className="editbtn"
                    onClick={() => handleEdit(employee)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button className='Emp-list-pagination-btn' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <div>User Count: {userCount}</div>
        <button className='Emp-list-pagination-btn' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
}
