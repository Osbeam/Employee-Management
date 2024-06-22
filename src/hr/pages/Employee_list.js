import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function Employee_list() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userCount, setUserCount] = useState(0);
  const [designations, setDesignations] = useState([]);

  useEffect(() => {
    fetchEmployees(currentPage);
    fetchDesignations(); // Fetch designations data when component mounts
  }, [currentPage]);

  const fetchEmployees = (page) => {
    axios.get(`http://77.37.45.224:8000/api/user/getEmployee?currentPage=${page}&limit=10`)
      .then(response => {
        if (response.data.success) {
          setEmployees(response.data.data.map(employee => ({
            ...employee,
            editMode: false // Add editMode property to each employee
          })));
          setCurrentPage(response.data.currentPage);
          setTotalPages(response.data.totalPage);
          setUserCount(response.data.userCount); // Set user count
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
          setDesignations(response.data.data); // Set designations data
        } else {
          console.error('Failed to fetch designations data');
        }
      })
      .catch(error => {
        console.error('Error fetching designations data:', error);
      });
  };

  const handleEdit = (_id) => {
    // Set edit mode for the specified employee
    setEmployees(prevEmployees =>
      prevEmployees.map(employee =>
        employee._id === _id ? { ...employee, editMode: true } : employee
      )
    );
  };

  const handleSave = async (employee) => {
    console.log('Saving employee:', employee); // Log the employee being saved
    try {
      // Make API request to update the employee data
      const response = await axios.put('http://77.37.45.224:8000/api/user/updateEmployeeData', {
        _id: employee._id,
        Password: employee.Password,
        Role: employee.Role,
      });

      console.log('API response:', response.data); // Log the API response

      if (response.data.success) {
        // Update the state and disable edit mode
        setEmployees(prevEmployees =>
          prevEmployees.map(emp =>
            emp._id === employee._id ? { ...emp, editMode: false } : emp
          )
        );
        console.log('Employee updated successfully');
      } else {
        console.error('Failed to update employee');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div><h2 style={{ marginBottom: '25px', fontSize: '25' }}>Employee List</h2></div>
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
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee._id}>
                <td>{index + 1}</td>
                <td>{`${employee.FirstName} ${employee.MiddleName} ${employee.LastName}`}</td>
                <td>{employee.EmployeeID}</td>
                <td>
                  {employee.editMode ? (
                    <input
                      type="text"
                      value={employee.Role}
                      onChange={(e) => {
                        setEmployees(prevEmployees =>
                          prevEmployees.map(emp =>
                            emp._id === employee._id ? { ...emp, Role: e.target.value } : emp
                          )
                        );
                      }}
                    />
                  ) : (
                    employee.Role
                  )}
                </td>
                <td>{employee.MobileNumber}</td>
                <td>{employee.EmailId}</td>
                <td>{employee.CurrentAddress ? employee.CurrentAddress.Caddress1 : '-'}</td>
                <td>{employee.Reference1}</td>
                <td>{designations.find(desig => desig._id === employee.Designation)?.name || '-'}</td>
                <td>{employee.ReportingTo.join(', ')}</td>
                <td>{employee.ManagerName.join(', ')}</td>
                <td>{employee.DateOfJoining}</td>
                <td>{employee.BasicSalary}</td>
                <td>{employee.OfficialMobileNumber}</td>
                <td>{employee.OfficialEmailId}</td>
                <td>{employee.BankName}</td>
                <td>{employee.AccountNumber}</td>
                <td>{employee.IFSCCode}</td>
                <td>
                  {employee.editMode ? (
                    <input
                      type="password"
                      value={employee.Password}
                      onChange={(e) => {
                        setEmployees(prevEmployees =>
                          prevEmployees.map(emp =>
                            emp._id === employee._id ? { ...emp, Password: e.target.value } : emp
                          )
                        );
                      }}
                    />
                  ) : (
                    employee.Password
                  )}
                </td>
                <td className="statusbtn">
                  {employee.editMode ? (
                    <button
                      className="savebtn"
                      onClick={() => handleSave(employee)}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                  ) : (
                    <button
                      className="editbtn"
                      onClick={() => handleEdit(employee._id)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  )}
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
