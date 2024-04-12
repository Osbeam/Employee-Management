import React from 'react'

export default function Employee_list() {
  return (
    <>
    <div className="table-container">
      <table className="el-table">
        <thead>
          <tr className="el-table-tr">
            <th>Fullname</th>
            <th>Employee Id</th>
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
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/*table rows here */}
        </tbody>
      </table>
    </div>
    </>
  )
}
