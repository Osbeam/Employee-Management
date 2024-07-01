import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function EmployeeList() {
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
            editMode: false, // Add editMode property to each employee
            original: { ...employee } // Store original employee data
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
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee._id}>
                <td>{index + 1 + (currentPage - 1) * 10}</td>
                <td>
                  {employee.editMode ? (
                    <input
                      type="text"
                      value={`${employee.FirstName} ${employee.MiddleName} ${employee.LastName}`}
                      onChange={(e) => {
                        const [FirstName, MiddleName, LastName] = e.target.value.split(' ');
                        setEmployees(prevEmployees =>
                          prevEmployees.map(emp =>
                            emp._id === employee._id ? { ...emp, FirstName, MiddleName, LastName } : emp
                          )
                        );
                      }}
                    />
                  ) : (
                    `${employee.FirstName} ${employee.MiddleName} ${employee.LastName}`
                  )}
                </td>
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
                <td>
                  {employee.editMode ? (
                    <input
                      type="text"
                      value={employee.MobileNumber}
                      onChange={(e) => {
                        setEmployees(prevEmployees =>
                          prevEmployees.map(emp =>
                            emp._id === employee._id ? { ...emp, MobileNumber: e.target.value } : emp
                          )
                        );
                      }}
                    />
                  ) : (
                    employee.MobileNumber
                  )}
                </td>
                <td>
                  {employee.editMode ? (
                    <input
                      type="email"
                      value={employee.EmailId}
                      onChange={(e) => {
                        setEmployees(prevEmployees =>
                          prevEmployees.map(emp =>
                            emp._id === employee._id ? { ...emp, EmailId: e.target.value } : emp
                          )
                        );
                      }}
                    />
                  ) : (
                    employee.EmailId
                  )}
                </td>
                <td>
                  {employee.editMode ? (
                    <input
                      type="text"
                      value={employee.CurrentAddress ? employee.CurrentAddress.Caddress1 : ''}
                      onChange={(e) => {
                        setEmployees(prevEmployees =>
                          prevEmployees.map(emp =>
                            emp._id === employee._id ? { ...emp, CurrentAddress: { ...emp.CurrentAddress, Caddress1: e.target.value } } : emp
                          )
                        );
                      }}
                    />
                  ) : (
                    employee.CurrentAddress ? employee.CurrentAddress.Caddress1 : '-'
                  )}
                </td>
                <td>
                  {employee.editMode ? (
                    <input
                      type="text"
                      value={employee.Reference1}
                      onChange={(e) => {
                        setEmployees(prevEmployees =>
                          prevEmployees.map(emp =>
                            emp._id === employee._id ? { ...emp, Reference1: e.target.value } : emp
                          )
                        );
                      }}
                    />
                  ) : (
                    employee.Reference1
                  )}
                </td>
                <td>
                  {employee.editMode ? (
                    <select
                      value={employee.Designation}
                      onChange={(e) => {
                        setEmployees(prevEmployees =>
                          prevEmployees.map(emp =>
                            emp._id === employee._id ? { ...emp, Designation: e.target.value } : emp
                          )
                        );
                      }}
                    >
                      {designations.map(desig => (
                        <option key={desig._id} value={desig._id}>{desig.name}</option>
                      ))}
                    </select>
                  ) : (
                    designations.find(desig => desig._id === employee.Designation)?.name || '-'
                  )}
                </td>
                <td>
                  {employee.editMode ? (
                    <input
                      type="text"
                      value={employee.ReportingTo.join(', ')}
                      onChange={(e) => {
                        setEmployees(prevEmployees =>
                          prevEmployees.map(emp =>
                            emp._id === employee._id ? { ...emp, ReportingTo: e.target.value.split(',').map(name => name.trim()) } : emp
                          )
                        );
                      }}
                    />
                  ) : (
                    employee.ReportingTo.join(', ')
                  )}
                </td>
                <td>
                  {employee.editMode ? (
                    <input
                      type="text"
                      value={employee.ManagerName.join(', ')}
                      onChange={(e) => {
                        setEmployees(prevEmployees =>
                          prevEmployees.map(emp =>
                            emp._id === employee._id ? { ...emp, ManagerName: e.target.value.split(',').map(name => name.trim()) } : emp
                          )
                        );
                      }}
                    />
                  ) : (
                    employee.ManagerName.join(', ')
                  )}
                </td>
                <td>
                  {employee.editMode ? (
                    <input
                      type="date"
                      value={employee.DateOfJoining}
                      onChange={(e) => {
                        setEmployees(prevEmployees =>
                          prevEmployees.map(emp =>
                            emp._id === employee._id ? { ...emp, DateOfJoining: e.target.value } : emp
                          )
                        );
                      }}
                    />
                  ) : (
                    employee.DateOfJoining
                  )}
                </td>
                <td>
                  {employee.editMode ? (
                    <input
                      type="number"
                      value={employee.BasicSalary}
                      onChange={(e) => {
                        setEmployees(prevEmployees =>
                          prevEmployees.map(emp =>
                            emp._id === employee._id ? { ...emp, BasicSalary: e.target.value } : emp
                          )
                        );
                      }}
                    />
                  ) : (
                    employee.BasicSalary
                  )}
                </td>
                <td>
                  {employee.editMode ? (
                    <input
                      type="text"
                      value={employee.OfficialMobileNumber}
                      onChange={(e) => {
                        setEmployees(prevEmployees =>
                          prevEmployees.map(emp =>
                            emp._id === employee._id ? { ...emp, OfficialMobileNumber: e.target.value } : emp
                          )
                        );
                      }}
                    />
                  ) : (
                    employee.OfficialMobileNumber
                  )}
                </td>
                <td>
                  {employee.editMode ? (
                    <input
                      type="email"
                      value={employee.OfficialEmailId}
                      onChange={(e) => {
                        setEmployees(prevEmployees =>
                          prevEmployees.map(emp =>
                            emp._id === employee._id ? { ...emp, OfficialEmailId: e.target.value } : emp
                          )
                        );
                      }}
                    />
                  ) : (
                    employee.OfficialEmailId
                  )}
                </td>
                <td>
                  {employee.editMode ? (
                    <input
                      type="text"
                      value={employee.BankName}
                      onChange={(e) => {
                        setEmployees(prevEmployees =>
                          prevEmployees.map(emp =>
                            emp._id === employee._id ? { ...emp, BankName: e.target.value } : emp
                          )
                        );
                      }}
                    />
                  ) : (
                    employee.BankName
                  )}
                </td>
                <td>
                  {employee.editMode ? (
                    <input
                      type="text"
                      value={employee.AccountNumber}
                      onChange={(e) => {
                        setEmployees(prevEmployees =>
                          prevEmployees.map(emp =>
                            emp._id === employee._id ? { ...emp, AccountNumber: e.target.value } : emp
                          )
                        );
                      }}
                    />
                  ) : (
                    employee.AccountNumber
                  )}
                </td>
                <td>
                  {employee.editMode ? (
                    <input
                      type="text"
                      value={employee.IFSCCode}
                      onChange={(e) => {
                        setEmployees(prevEmployees =>
                          prevEmployees.map(emp =>
                            emp._id === employee._id ? { ...emp, IFSCCode: e.target.value } : emp
                          )
                        );
                      }}
                    />
                  ) : (
                    employee.IFSCCode
                  )}
                </td>
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
                    <>
                      <button
                        className="savebtn"
                        onClick={() => handleSave(employee)}
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </button>
                      <button
                        className="cancelbtn"
                        onClick={() => handleCancel(employee)}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </>
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
