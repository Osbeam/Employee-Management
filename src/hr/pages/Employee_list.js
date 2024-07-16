import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userCount, setUserCount] = useState(0);
  const [designations, setDesignations] = useState([]);

  useEffect(() => {
    fetchEmployees(currentPage);
    fetchDesignations();
  }, [currentPage]);

  const fetchEmployees = (page) => {
    axios.get(`http://77.37.45.224:8000/api/user/getEmployee?currentPage=${page}&limit=10`)
      .then(response => {
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
          console.error('Failed to fetch employee data');
        }
      })
      .catch(error => {
        console.error('Error fetching employee data:', error);
      });
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

  const handleEdit = (_id) => {
    setEmployees(prevEmployees =>
      prevEmployees.map(employee =>
        employee._id === _id ? { ...employee, editMode: true } : employee
      )
    );
  };

  const handleSave = async (employee) => {
    try {
      const response = await axios.put('http://77.37.45.224:8000/api/user/updateEmployeeData', {
        _id: employee._id,
        Password: employee.Password,
        Role: employee.Role,
        FirstName: employee.FirstName,
        MiddleName: employee.MiddleName,
        LastName: employee.LastName,
        MobileNumber: employee.MobileNumber,
        EmailId: employee.EmailId,
        CurrentAddress: employee.CurrentAddress,
        Reference1: employee.Reference1,
        Designation: employee.Designation,
        ReportingTo: employee.ReportingTo,
        ManagerName: employee.ManagerName,
        DateOfJoining: employee.DateOfJoining,
        BasicSalary: employee.BasicSalary,
        OfficialMobileNumber: employee.OfficialMobileNumber,
        OfficialEmailId: employee.OfficialEmailId,
        BankName: employee.BankName,
        AccountNumber: employee.AccountNumber,
        IFSCCode: employee.IFSCCode,
      });

      if (response.data.success) {
        setEmployees(prevEmployees =>
          prevEmployees.map(emp =>
            emp._id === employee._id ? { ...emp, editMode: false } : emp
          )
        );
      } else {
        console.error('Failed to update employee');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleCancel = (employee) => {
    setEmployees(prevEmployees =>
      prevEmployees.map(emp =>
        emp._id === employee._id ? { ...emp, editMode: false, ...emp.original } : emp
      )
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
              <th style={{minWidth:'75px'}}>Sr. No.</th>
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
                <td>{employee.Position && employee.Position.length > 0 ? '-' : `${employee.ManagedBy?.FirstName || ''} ${employee.ManagedBy?.LastName || ''}`}</td>
                <td className="statusbtn">
                  <button
                    className="editbtn"
                    onClick={() => handleEdit(employee._id)}
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
