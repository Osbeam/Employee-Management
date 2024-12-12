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
    navigate(`/hrpanel/employee-list/edit-employee-list/${employee._id}`);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const visiblePages = 5; // Number of pages to display in the pagination bar
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);
  
    // Adjust if startPage or endPage goes out of bounds
    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }
  
    // Add "First" button if not on the first page
    if (currentPage > 1) {
      pageNumbers.push(
        <button
          key="first"
          className="pagination-number"
          onClick={() => handlePageChange(1)}
        >
          First
        </button>
      );
    }
  
    // Render page numbers dynamically
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`pagination-number ${i === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
  
    // Add "Last" button if not on the last page
    if (currentPage < totalPages) {
      pageNumbers.push(
        <button
          key="last"
          className="pagination-number"
          onClick={() => handlePageChange(totalPages)}
        >
          Last
        </button>
      );
    }
  
    return pageNumbers;
  };

  return (
    <>
      <div><h2 style={{ marginBottom: '25px', fontSize: '25px' }}>Employee List</h2></div>
      <div className='emp-list-search-bar'>
        <input
        type='text'
        placeholder='Search name, designation, emp id, role'
        />
      </div>
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
      <div className='emp-list-pagination'>
      <span>User Count: {userCount}</span>
      <div className="pagination-emp">
        {/* <button className='Emp-list-pagination-btn' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button> */}
        {renderPageNumbers()}
        {/* <button className='Emp-list-pagination-btn' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button> */}
      </div>
      </div>

    </>
  );
}






// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from 'react-router-dom';

// export default function Employee_List() {
//   const [employees, setEmployees] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [userCount, setUserCount] = useState(0);
//   const [searchTerm, setSearchTerm] = useState(''); // State for search term

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchEmployees(currentPage, searchTerm);
//   }, [currentPage, searchTerm]);

//   const fetchEmployees = async (page, search) => {
//     try {
//       const authToken = localStorage.getItem('jwtoken'); // Retrieve token each time
  
//       if (!authToken) {
//         console.error('No auth token found in local storage');
//         return;
//       }
  
//       console.log('Fetching employees for page:', page);
  
//       const response = await axios.get(
//         `http://77.37.45.224:8000/api/user/getEmployee?currentPage=${page}&limit=10&search=${search || ''}`,
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );
  
//       if (response.data.success) {
//         setEmployees(response.data.data.employees.map(employee => ({
//           ...employee,
//           editMode: false,
//           original: { ...employee }
//         })));
//         setCurrentPage(response.data.data.currentPage);
//         setTotalPages(response.data.data.totalPage);
//         setUserCount(response.data.data.userCount);
//       } else {
//         console.error('Failed to fetch employee data:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching employee data:', error);
//     }
//   };

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1); // Reset to the first page when a new search is initiated
//   };

//   const handleEdit = (employee) => {
//     navigate(`/hrpanel/employee-list/edit-employee-list/${employee._id}`);
//   };

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const renderPageNumbers = () => {
//     const pageNumbers = [];
//     const visiblePages = 5; // Number of pages to display in the pagination bar
//     let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
//     let endPage = Math.min(totalPages, startPage + visiblePages - 1);

//     // Adjust if startPage or endPage goes out of bounds
//     if (endPage - startPage + 1 < visiblePages) {
//       startPage = Math.max(1, endPage - visiblePages + 1);
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(
//         <button
//           key={i}
//           className={`pagination-number ${i === currentPage ? 'active' : ''}`}
//           onClick={() => handlePageChange(i)}
//         >
//           {i}
//         </button>
//       );
//     }

//     return pageNumbers;
//   };

//   return (
//     <>
//       <div>
//         <h2 style={{ marginBottom: '25px', fontSize: '25px' }}>Employee List</h2>
//         <input
//           type="text"
//           placeholder="Search by name or designation"
//           value={searchTerm}
//           onChange={handleSearch}
//           className="search-bar"
//           style={{ marginBottom: '20px', padding: '8px', width: '300px' }}
//         />
//       </div>
//       <div className="table-container">
//         <table className="el-table">
//           <thead>
//             <tr className="el-table-tr">
//               <th>Sr. No.</th>
//               <th>Fullname</th>
//               <th>Employee Id</th>
//               <th>Role</th>
//               <th>Mobile no.</th>
//               <th>Email id</th>
//               <th>Address</th>
//               <th>Reference name</th>
//               <th>Designation</th>
//               <th>Joining Date</th>
//               <th>Salary p/m</th>
//               <th>Off. Mobile no.</th>
//               <th>Off. Email id</th>
//               <th>Bank name</th>
//               <th>Account no</th>
//               <th>IFSC code</th>
//               <th>Password</th>
//               <th>Position</th>
//               <th>Managed By</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {employees.map((employee, index) => (
//               <tr key={employee._id}>
//                 <td>{index + 1 + (currentPage - 1) * 10}</td>
//                 <td>{employee.FirstName || ''} {employee.MiddleName || ''} {employee.LastName || ''}</td>
//                 <td>{employee.EmployeeID || '-'}</td>
//                 <td>{employee.Role && employee.Role.length > 0 ? employee.Role.join(', ') : '-'}</td>
//                 <td>{employee.MobileNumber || '-'}</td>
//                 <td>{employee.EmailId || '-'}</td>
//                 <td>{employee.CurrentAddress ? employee.CurrentAddress.Caddress1 || '-' : '-'}</td>
//                 <td>{employee.Reference1 || '-'}</td>
//                 <td>{employee.Designation ? employee.Designation.name : '-'}</td>
//                 <td>{employee.DateOfJoining || '-'}</td>
//                 <td>{employee.BasicSalary || '-'}</td>
//                 <td>{employee.OfficialMobileNumber || '-'}</td>
//                 <td>{employee.OfficialEmailId || '-'}</td>
//                 <td>{employee.BankName || '-'}</td>
//                 <td>{employee.AccountNumber || '-'}</td>
//                 <td>{employee.IFSCCode || '-'}</td>
//                 <td>{employee.Password || '-'}</td>
//                 <td>{Array.isArray(employee.Position) && employee.Position.length > 0 ? employee.Position.join(', ') : '-'}</td>
//                 <td>
//                   {employee.ManagedBy
//                     ? `${employee.ManagedBy.FirstName || ''} ${employee.ManagedBy.LastName || ''}`
//                     : '-'}
//                 </td>
//                 <td className="statusbtn">
//                   <button
//                     className="editbtn"
//                     onClick={() => handleEdit(employee)}
//                   >
//                     <FontAwesomeIcon icon={faEdit} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="pagination-emp">
//         <button className="Emp-list-pagination-btn" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
//           Previous
//         </button>
//         {renderPageNumbers()}
//         <button className="Emp-list-pagination-btn" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
//           Next
//         </button>
//       </div>
//       <div>User Count: {userCount}</div>
//     </>
//   );
// }
