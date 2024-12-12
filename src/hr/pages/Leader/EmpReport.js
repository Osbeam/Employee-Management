import React from 'react'
import '../Leader/EmpReport.css'

export default function EmpReport() {
  return (
    <>
      <div className='empHead'>
        <h1>Employee Report</h1>
        <p>Vishal Bhave</p>
      </div>
      <hr />
      <div className='empDrop'>
        <label>Employee Names:</label>
        <select>
          <option>Select title</option>
          <option>Sid</option>
          <option>Vishal</option>
          <option>Viv</option>
        </select>
      </div>
      <div className='emp-report-table'>
        <table>
          <thead className='emp-report-table-head'>
            <tr>
              <th>Sr. no.</th>
              <th>Emp Name</th>
              <th>Connected Call</th>
              <th>Not Connected</th>
              <th>Follow up</th>
              <th>Total Attempt</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className='emp-report-table-body'>
            <tr>
              <th>1</th>
              <th>Rajkumar Rao</th>
              <th>20</th>
              <th>30</th>
              <th>10</th>
              <th>50</th>
              <th>View</th>
            </tr>
          </tbody>
        </table>
      </div>
    </>

  )
}
