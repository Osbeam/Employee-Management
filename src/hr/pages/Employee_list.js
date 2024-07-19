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
  const [designations, setDesignations] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees(currentPage);
    fetchDesignations();
  }, [currentPage]);


  const fetchEmployees = async (page) => {
    try {
      const authToken = localStorage.getItem('jwtoken'); // Retrieve token each time
  
      if (!authToken) {
        console.error('No auth token found in local storage');
        return;
      }
  
      const response = await axios.get(
        `http://77.37.45.224:8000/api/user/getEmployee?currentPage=${page}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
  
      if (response.data.success) {
        setEmployees(response.data.data.map(employee => ({
          ...employee,
          editMode: false,
          original: { ...employee }
        })));
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPage);
        setUserCount(response.data.userCount);
      } else {
        console.error('Failed to fetch employee data:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };


  const fetchDesignations = () => {
    axios.get('http://77.37.45.224:8000/api/department/getDesignation')
      .then(response => {
        if (response.data.success) {
          setDesignations(response.data.data);
        } else {
          console.error('Failed to fetch designations data');
        }
      })
      .catch(error => {
        console.error('Error fetching designations data:', error);
      });
  };

  const handleEdit = (employee) => {
    navigate(
      `/employee-list/edit-employee-list/${employee._id}?firstName=${encodeURIComponent(
        employee.FirstName || ''
      )}&middleName=${encodeURIComponent(employee.MiddleName || '')}&lastName=${encodeURIComponent(
        employee.LastName || ''
      )}&employeeId=${encodeURIComponent(employee.EmployeeID || '')}&role=${encodeURIComponent(
        employee.Role ? employee.Role.join(', ') : ''
      )}&mobileNumber=${encodeURIComponent(
        employee.MobileNumber || ''
      )}&emailId=${encodeURIComponent(employee.EmailId || '')}&currentAddress=${encodeURIComponent(
        employee.CurrentAddress ? employee.CurrentAddress.Caddress1 || '' : ''
      )}&reference1=${encodeURIComponent(employee.Reference1 || '')}&designation=${encodeURIComponent(
        employee.Designation || ''
      )}&reportingTo=${encodeURIComponent(
        employee.ReportingTo ? employee.ReportingTo.join(', ') : ''
      )}&managerName=${encodeURIComponent(
        employee.ManagerName ? employee.ManagerName.join(', ') : ''
      )}&dateOfJoining=${encodeURIComponent(
        employee.DateOfJoining || ''
      )}&basicSalary=${encodeURIComponent(
        employee.BasicSalary || ''
      )}&officialMobileNumber=${encodeURIComponent(
        employee.OfficialMobileNumber || ''
      )}&officialEmailId=${encodeURIComponent(
        employee.OfficialEmailId || ''
      )}&bankName=${encodeURIComponent(employee.BankName || '')}&accountNumber=${encodeURIComponent(
        employee.AccountNumber || ''
      )}&ifscCode=${encodeURIComponent(
        employee.IFSCCode || ''
      )}&password=${encodeURIComponent(employee.Password || '')}&position=${encodeURIComponent(
        employee.Position ? employee.Position.join(', ') : ''
      )}&managedBy=${encodeURIComponent(
        employee.ManagedBy ? `${employee.ManagedBy.FirstName || ''} ${employee.ManagedBy.LastName || ''}` : ''
      )}&status=${encodeURIComponent(employee.Status || '')}`
    );
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
              <th>Report to</th>
              <th>Reporting Manager</th>
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
                <td>{designations.find(desig => desig._id === employee.Designation)?.name || '-'}</td>
                <td>{employee.ReportingTo && employee.ReportingTo.length > 0 ? employee.ReportingTo.join(', ') : '-'}</td>
                <td>{employee.ManagerName && employee.ManagerName.length > 0 ? employee.ManagerName.join(', ') : '-'}</td>
                <td>{employee.DateOfJoining || '-'}</td>
                <td>{employee.BasicSalary || '-'}</td>
                <td>{employee.OfficialMobileNumber || '-'}</td>
                <td>{employee.OfficialEmailId || '-'}</td>
                <td>{employee.BankName || '-'}</td>
                <td>{employee.AccountNumber || '-'}</td>
                <td>{employee.IFSCCode || '-'}</td>
                <td>{employee.Password || '-'}</td>
                <td>{employee.Position && employee.Position.length > 0 ? employee.Position.join(', ') : '-'}</td>
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
