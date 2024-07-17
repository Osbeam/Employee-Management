import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const Edit_Employee_List = () => {
  const { id } = useParams();  // Extract ID from URL params
  const navigate = useNavigate();  // For programmatic navigation
  const location = useLocation();  // To access URL search parameters

  // Initialize state for employee data
  const [employee, setEmployee] = useState({
    fullName: '',
    employeeId: '',
    role: '',
    mobileNo: '',
    emailId: '',
    address: '',
    referenceName: '',
    designation: '',
    reportTo: '',
    reportingManager: '',
    joiningDate: '',
    salary: '',
    offMobileNo: '',
    offEmailId: '',
    bankName: '',
    accountNo: '',
    ifscCode: '',
    password: '',
    position: '',
    managedBy: '',
    status: '',
  });

  // Fetch data for the employee based on ID
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    // Initialize state with query parameters
    setEmployee({
      fullName: queryParams.get('fullName') || '',
      employeeId: queryParams.get('employeeId') || '',
      role: queryParams.get('role') || '',
      mobileNo: queryParams.get('mobileNo') || '',
      emailId: queryParams.get('emailId') || '',
      address: queryParams.get('address') || '',
      referenceName: queryParams.get('referenceName') || '',
      designation: queryParams.get('designation') || '',
      reportTo: queryParams.get('reportTo') || '',
      reportingManager: queryParams.get('reportingManager') || '',
      joiningDate: queryParams.get('joiningDate') || '',
      salary: queryParams.get('salary') || '',
      offMobileNo: queryParams.get('offMobileNo') || '',
      offEmailId: queryParams.get('offEmailId') || '',
      bankName: queryParams.get('bankName') || '',
      accountNo: queryParams.get('accountNo') || '',
      ifscCode: queryParams.get('ifscCode') || '',
      password: queryParams.get('password') || '',
      position: queryParams.get('position') || '',
      managedBy: queryParams.get('managedBy') || '',
      status: queryParams.get('status') || '',
    });
  }, [location.search]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://77.37.45.224:8000/api/user/updateEmployeeData/${id}`, {
        ...employee
      });

      if (response.data.success) {
        navigate('/employee-list'); // Redirect on success
      } else {
        console.error('Failed to update employee');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <form className='emp-edit-form' onSubmit={handleSubmit}>
      <div className='emp-edit-div'>
        <label className='emp-edit-label'>Fullname</label>
        <input className='emp-edit-input' type="text" name="fullName" value={employee.fullName} onChange={handleChange} />
      </div>
      <div className='emp-edit-div'>
        <label className='emp-edit-label'>Employee Id</label>
        <input className='emp-edit-input' type="text" name="employeeId" value={employee.employeeId} onChange={handleChange} />
      </div>
      <div className='emp-edit-div'>
        <label className='emp-edit-label'>Role</label>
        <input className='emp-edit-input' type="text" name="role" value={employee.role} onChange={handleChange} />
      </div>
      <div className='emp-edit-div'>
        <label className='emp-edit-label'>Mobile no.</label>
        <input className='emp-edit-input' type="text" name="mobileNo" value={employee.mobileNo} onChange={handleChange} />
      </div>
      <div className='emp-edit-div'>
        <label className='emp-edit-label'>Email id</label>
        <input className='emp-edit-input' type="text" name="emailId" value={employee.emailId} onChange={handleChange} />
      </div>
      <div className='emp-edit-div'>
        <label className='emp-edit-label'>Address</label>
        <input className='emp-edit-input' type="text" name="address" value={employee.address} onChange={handleChange} />
      </div>
      <div className='emp-edit-div'>
        <label className='emp-edit-label'>Reference name</label>
        <input className='emp-edit-input' type="text" name="referenceName" value={employee.referenceName} onChange={handleChange} />
      </div>
      <div className='emp-edit-div'>
        <label className='emp-edit-label'>Designation</label>
        <input className='emp-edit-input' type="text" name="designation" value={employee.designation} onChange={handleChange} />
      </div>
      <div className='emp-edit-div'>
        <label className='emp-edit-label'>Report to</label>
        <input className='emp-edit-input' type="text" name="reportTo" value={employee.reportTo} onChange={handleChange} />
      </div>
      <div className='emp-edit-div'>
        <label className='emp-edit-label'>Reporting Manager</label>
        <input className='emp-edit-input' type="text" name="reportingManager" value={employee.reportingManager} onChange={handleChange} />
      </div>
      <div className='emp-edit-div'>
        <label className='emp-edit-label'>Joining Date</label>
        <input className='emp-edit-input' type="date" name="joiningDate" value={employee.joiningDate} onChange={handleChange} />
      </div>
      <div className='emp-edit-div'>
        <label className='emp-edit-label'>Salary p/m</label>
        <input className='emp-edit-input' type="text" name="salary" value={employee.salary} onChange={handleChange} />
      </div>
      <div className='emp-edit-div'>
        <label className='emp-edit-label'>Off. Mobile no.</label>
        <input className='emp-edit-input' type="text" name="offMobileNo" value={employee.offMobileNo} onChange={handleChange} />
      </div>
      <div className='emp-edit-div'>
        <label className='emp-edit-label'>Off. Email id</label>
        <input className='emp-edit-input' type="text" name="offEmailId" value={employee.offEmailId} onChange={handleChange} />
      </div>
      <div className='emp-edit-div'>
        <label className='emp-edit-label'>Bank name</label>
        <input className='emp-edit-input' type="text" name="bankName" value={employee.bankName} onChange={handleChange} />
      </div>
      <div className='emp-edit-div'>
        <label className='emp-edit-label'>Account no</label>
        <input className='emp-edit-input' type="text" name="accountNo" value={employee.accountNo} onChange={handleChange} />
      </div>
      <div className='emp-edit-div'>
        <label className='emp-edit-label'>IFSC code</label>
        <input className='emp-edit-input' type="text" name="ifscCode" value={employee.ifscCode} onChange={handleChange} />
      </div>
      <div className='emp-edit-div'>
        <label className='emp-edit-label'>Password</label>
        <input className='emp-edit-input' type="password" name="password" value={employee.password} onChange={handleChange} />
      </div>
      <div className='emp-edit-div'>
        <label className='emp-edit-label'>Position</label>
        <input className='emp-edit-input' type="text" name="position" value={employee.position} onChange={handleChange} />
      </div>
      <div className='emp-edit-div'>
        <label className='emp-edit-label'>Managed By</label>
        <input className='emp-edit-input' type="text" name="managedBy" value={employee.managedBy} onChange={handleChange} />
      </div>
      <div className='emp-edit-div'>
        <label className='emp-edit-label'>Status</label>
        <input className='emp-edit-input' type="text" name="status" value={employee.status} onChange={handleChange} />
      </div>
      <button className='emp-edit-btn' type="submit">Save</button>
    </form>
  );
};

export default Edit_Employee_List;
