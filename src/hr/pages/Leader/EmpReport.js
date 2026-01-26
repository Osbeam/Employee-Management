import React, { useEffect, useState } from 'react';
import '../Leader/EmpReport.css';

export default function EmpReport() {
  const [data, setData] = useState([]); // Store API data
  const [selectedLeaderId, setSelectedLeaderId] = useState(''); // Selected leader's ID
  const [employees, setEmployees] = useState([]); // Employees of the selected leader

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem("jwtoken");
  
      try {
        console.log('Fetching data...');
        const response = await fetch(`http://77.37.45.224:8000/api/user/getLeaderEmployeeData`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const result = await response.json();
        console.log('API Response:', result);
  
        // Log data to check if the response is as expected
        result.data.forEach((leader) => {
          leader.managedEmployees.forEach((employee) => {
            console.log(`Employee: ${employee.FirstName} ${employee.LastName}, Total Calls: ${employee.callDetails.totalCall}`);
          });
        });
  
        setData(result.data); // Set API data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  // Update employees when a leader is selected
  const handleLeaderSelection = (leaderId) => {
    setSelectedLeaderId(leaderId);
    const leaderData = data.find((leader) => leader._id === leaderId);
    setEmployees(leaderData ? leaderData.managedEmployees : []);
  };

  return (
    <div>
      <div>
        <h1>Employee Report</h1>
      </div>
      <hr style={{ marginTop: '10px' }} />
      {/* Leader Selection Dropdown */}
      <div className='empDrop'>
        <label>Select Leader:</label>
        <select
          value={selectedLeaderId}
          onChange={(e) => handleLeaderSelection(e.target.value)}
        >
          <option value="">-- Select Leader --</option>
          {data.map((leader) => (
            <option key={leader._id} value={leader._id}>
              {leader.FirstName} {leader.LastName}
            </option>
          ))}
        </select>
      </div>

      {/* Employees Table */}
      <div className='emp-report-table'>
        <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead className='emp-report-table-head'>
            <tr>
              <th>Sr. No.</th>
              <th>Employee Name</th>
              <th>Call Not Received</th>
              <th>Not Interested</th>
              <th>Interested</th>
              <th>Switch Off</th>
              <th>Connected</th>
              <th>Total Calls</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody className='emp-report-table-body'>
            {employees.length > 0 ? (
              employees.map((employee, index) => {
                // Fallback to '-' if the employee data is missing or undefined
                const employeeData = employee || { name: '-', callDetails: {} };
                const callDetails = employeeData.callDetails || {};

                return (
                  <tr key={employeeData._id || index}>
                    <td>{index + 1}</td>
                    <td>{employeeData.FirstName} {employeeData.LastName || '-'}</td>
                    <td>{callDetails.CallNotReceived || '-'}</td>
                    <td>{callDetails.NotInterested || '-'}</td>
                    <td>{callDetails.Interested || '-'}</td>
                    <td>{callDetails.SwitchOff || '-'}</td>
                    <td>{callDetails.Connected || '-'}</td>
                    {/* Fix here: if totalCall is 0 or undefined, show '-' */}
                    <td>{callDetails.totalCall === 0 || callDetails.totalCall === undefined ? '-' : callDetails.totalCall}</td>
                    <td>-</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center' }}>
                  No employees available for the selected leader.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}





// import React, { useEffect, useState } from 'react';
// import '../Leader/EmpReport.css';

// export default function EmpReport() {
//   const [data, setData] = useState([]); // Store API data
//   const [selectedLeaderId, setSelectedLeaderId] = useState(''); // Selected leader's ID
//   const [employees, setEmployees] = useState([]); // Employees of the selected leader

//   // Fetch data from API
//   useEffect(() => {
//     const fetchData = async () => {
//       const authToken = localStorage.getItem("jwtoken");

//       try {
//         console.log('Fetching data...');
//         const response = await fetch(`http://77.37.45.224:8000/api/user/getLeaderEmployeeData`,{
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         });
//         const result = await response.json();
//         console.log('API Response:', result);
//         setData(result.data); // Set API data

//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Update employees when a leader is selected
//   const handleLeaderSelection = (leaderId) => {
//     setSelectedLeaderId(leaderId);
//     const leaderData = data.find((leader) => leader._id === leaderId);
//     setEmployees(leaderData ? leaderData.managedEmployees : []);
//   };

//   return (
//     <div>
//       <div>
//         <h1>Employee Report</h1>
//       </div>
//       <hr style={{ marginTop: '10px' }} />
//       {/* Leader Selection Dropdown */}
//       <div className='empDrop'>
//         <label>Select Leader:</label>
//         <select
//           value={selectedLeaderId}
//           onChange={(e) => handleLeaderSelection(e.target.value)}
//         >
//           <option value="">-- Select Leader --</option>
//           {data.map((leader) => (
//             <option key={leader._id} value={leader._id}>
//               {leader.FirstName} {leader.LastName}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Employees Table */}
//       <div className='emp-report-table'>
//         <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
//           <thead className='emp-report-table-head'>
//             <tr>
//               <th>Sr. No.</th>
//               <th>Employee Name</th>
//               <th>Call Not Received</th>
//               <th>Not Interested</th>
//               <th>Interested</th>
//               <th>Switch Off</th>
//               <th>Connected</th>
//               <th>Total Calls</th>
//               <th>View</th>
//             </tr>
//           </thead>
//           <tbody className='emp-report-table-body'>
//             {employees.length > 0 ? (
//               employees.map((employee, index) => {
//                 // Fallback to '-' if the employee data is missing or undefined
//                 const employeeData = employee ? employee : { name: '-', statusCounts: {} };
//                 const statusCounts = employeeData.statusCounts || {};

//                 return (
//                   <tr key={employeeData.id || index}>
//                     <td>{index + 1}</td>
//                     <td>{employeeData.name || '-'}</td>
//                     <td>{statusCounts.CallNotReceived || '-'}</td>
//                     <td>{statusCounts.NotInterested || '-'}</td>
//                     <td>{statusCounts.Interested || '-'}</td>
//                     <td>{statusCounts.SwitchOff || '-'}</td>
//                     <td>{statusCounts.Connected || '-'}</td>
//                     <td>{statusCounts.totalCall || '-'}</td>
//                     <td>-</td>
//                   </tr>
//                 );
//               })
//             ) : (
//               <tr>
//                 <td colSpan="9" style={{ textAlign: 'center' }}>
//                   No employees available for the selected leader.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }




//WIth Pie chart 


// import React from 'react'
// import '../Leader/EmpReport.css'
// import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
// import { Col, Row } from 'antd'

// export default function EmpReport() {
//   const data = [
//     { name: "Total Employees", value: 120 },
//     { name: "Total Calls", value: 250 },
//     { name: "Connected Calls", value: 180 },
//     { name: "Not Interested", value: 50 },
//     { name: "Follow-Up", value: 70 },
//   ];

//   // Colors for the Pie Chart
// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

//   return (
//     <>
//       <div className='empHead'>
//         <h1>Employee Report</h1>
//         <p>Vishal Bhave</p>
//       </div>
//       <hr />
//       {/* <div className='empDrop'>
//         <label>Employee Names:</label>
//         <select>
//           <option>Select title</option>
//           <option>Sid</option>
//           <option>Vishal</option>
//           <option>Viv</option>
//         </select>
//       </div> */}
//       <Row gutter={16}>
//       <Col span={16} className='emp-report-table'>
//         <table>
//           <thead className='emp-report-table-head'>
//             <tr>
//               <th>Sr. no.</th>
//               <th>Emp Name</th>
//               <th>Connected Call</th>
//               <th>Not Connected</th>
//               <th>Follow up</th>
//               <th>Total Attempt</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody className='emp-report-table-body'>
//             <tr>
//               <th>1</th>
//               <th>Rajkumar Rao</th>
//               <th>20</th>
//               <th>30</th>
//               <th>10</th>
//               <th>50</th>
//               <th>View</th>
//             </tr>
//           </tbody>
//         </table>
//       </Col>
//       <Col span={8}>
//         <h3 className='PieChartHead'>Statistics</h3>
//         <PieChart width={300} height={300}>
//           <Pie
//             data={data}
//             dataKey="value"
//             nameKey="name"
//             cx="50%"
//             cy="50%"
//             outerRadius={100}
//             fill="#8884d8"
//             label
//           >
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend/>
//         </PieChart>
//       </Col>
//       </Row>

//     </>

//   )
// }
