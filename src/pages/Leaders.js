import React from 'react'

export default function Leaders() {
  return (
    <>
   <div className='container'>
     <div className='dropdown'>
      <select>
        <option>Select</option>
        <option>Arjun</option>
      </select>
      <select>
        <option>Select</option>
        <option>Karn</option>
      </select>
     </div>
     <div className='table-container'>
      <table className="l-table">
        <thead>
          <tr className="l-table-tr">
          <th>Name</th>
          <th>Loan Type</th>
          <th>Loan Amount</th>
          <th>Location</th>
          <th>Income Type</th>
          <th>Total Income</th>
          <th>Cibil Score</th>
          <th>Eligibility</th>
          <th>Status</th>
          <th>Stage</th>
          </tr>
        </thead>
        <tbody>
           {/*table rows here */}
        </tbody>
      </table>
     </div>
   </div>
    </>
  )
}
