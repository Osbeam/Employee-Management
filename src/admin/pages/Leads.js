import React, { useState, useEffect } from "react";
import { Button } from 'antd';
import axios from 'axios';

export default function Leads() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchLeads = async () => {
      try {
        const response = await axios.get('http://77.37.45.224:8000/api/admin/LeadFromData');
        setLeads(response.data.data.LeadFromData); // Access the nested LeadFromData array
      } catch (error) {
        console.error('Error fetching leads data:', error);
      }
    };

    fetchLeads();
  }, []);

  return (
    <>
      <div className="lead-main-container">
        <div className="lead-head-section">
          <div className="inner-head-section">
            <div>
              <label>Upload :</label>
              <input
                className='lead-upload-input'
                type='file'
                name='file'
                placeholder='browse'
              />
            </div>
            <Button className='lead-add-btn'>Add Data</Button>
            <Button className='lead-add-btn'>Distribute Data</Button>
          </div>
          <div className="lead-table-section">
            <table className="lead-table">
              <thead>
                <tr>
                  <th className="lead-th" >Sr. No.</th>
                  <th className="lead-th" >Database Name</th>
                  <th className="lead-th" >Database Owner</th>
                  <th className="lead-th" >Database Type</th>
                  <th className="lead-th" >Mobile No. 1</th>
                  <th className="lead-th" >Mobile No. 2</th>
                  <th className="lead-th" >Email Id</th>
                  <th className="lead-th" >Address</th>
                  <th className="lead-th" >Pin Code</th>
                  <th className="lead-th" >Qualification</th>
                  <th className="lead-th" >Gender</th>
                  <th className="lead-th" >Date of Birth</th>
                  <th className="lead-th" >Age</th>
                  <th className="lead-th" >Income Type</th>
                  <th className="lead-th" >Income</th>
                  <th className="lead-th" >Industry</th>
                  <th className="lead-th" >Cibil Score</th>
                  <th className="lead-th" >Existing Loan Amt</th>
                  <th className="lead-th" >Existing ROI</th>
                  <th className="lead-th" >Existing EMI</th>
                  <th className="lead-th" >Is Called</th>
                  <th className="lead-th" >Lead From</th>
                  <th className="lead-th" >Assigned To</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, index) => (
                  <tr key={lead._id}>
                    <td>{index + 1}</td>
                    <td>{lead.DatabaseName}</td>
                    <td>{lead.DatabaseOwner}</td>
                    <td>{lead.DatabaseType}</td>
                    <td>{lead.MobileNo1}</td>
                    <td>{lead.MobileNo2}</td>
                    <td>{lead.EmailId}</td>
                    <td>{lead.Address}</td>
                    <td>{lead.PinCode}</td>
                    <td>{lead.Qualification}</td>
                    <td>{lead.Gender}</td>
                    <td>{lead.DateOfBirth}</td>
                    <td>{lead.Age}</td>
                    <td>{lead.IncomeType}</td>
                    <td>{lead.Income}</td>
                    <td>{lead.Industry}</td>
                    <td>{lead.CibilScore}</td>
                    <td>{lead.ExistingLoanAmt}</td>
                    <td>{lead.ExistingROI}</td>
                    <td>{lead.ExistingEMI}</td>
                    <td>{lead.IsCalled ? 'Yes' : 'No'}</td>
                    <td>{lead.LeadFrom}</td>
                    <td>{lead.AssignedTo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
