import { faCheck, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Pending_Leads() {
    const [data, setData] = useState([]);
    const [employees, setEmployees] = useState({});
    const [editMode, setEditMode] = useState(null); // Track which row is in edit mode
    const [selectedEmployee, setSelectedEmployee] = useState(null); // Track the selected employee for each row

    const fetchLeads = async () => {
        try {
            const response = await axios.get(`http://77.37.45.224:8000/api/admin/pendingLeads`);
            const fetchedData = response.data.data;
            if (Array.isArray(fetchedData)) {
                setData(fetchedData);
            } else {
                console.error('Fetched leads data is not an array:', fetchedData);
            }
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    const fetchEmployees = async () => {
        try {
            const response = await axios.get(`http://77.37.45.224:8000/api/user/getEmployee`);
            const employeesData = response.data.data.reduce((acc, employee) => {
                acc[employee._id] = employee.FirstName;
                return acc;
            }, {});
            setEmployees(employeesData);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    const handleEditClick = (index) => {
        setEditMode(index);
        setSelectedEmployee(data[index].AssignedTo); // Set the current assigned employee as the default selected value
    };

    const handleSaveClick = async (index, lead) => {
        try {
            console.log(`Updating lead ${lead._id} with assignedTo: ${selectedEmployee}`);
            const response = await axios.put(`http://77.37.45.224:8000/api/admin/LeadAdminDataUpdate`, {
                _id: lead._id,
                AssignedTo: selectedEmployee,
                DatabaseName: lead.DatabaseName,
                Status: lead.Status,
                LeadCallStatus: "", 
            });
            console.log('Update response:', response.data);
            fetchLeads();
            setEditMode(null); 
        } catch (error) {
            console.log('Error updating data', error);
        }
    };

    useEffect(() => {
        fetchLeads();
        fetchEmployees();
    }, []);

    return (
        <div className="pending-leads-main-container">
            <div className="pending-leads-head-container">
                <h4>Pending Leads</h4>
            </div>
            <div className="pending-leads-table">
                <table>
                    <thead>
                        <tr>
                            <th className="lead-th">Sr. No.</th>
                            <th className="lead-th">Database Name</th>
                            <th className="lead-th">Database Owner</th>
                            <th className="lead-th">Database Type</th>
                            <th className="lead-th">Name</th>
                            <th className="lead-th">Mobile No. 1</th>
                            <th className="lead-th">Mobile No. 2</th>
                            <th className="lead-th">Email Id</th>
                            <th className="lead-th">Address</th>
                            <th className="lead-th">Pin Code</th>
                            <th className="lead-th">Qualification</th>
                            <th className="lead-th">Gender</th>
                            <th className="lead-th">Date of Birth</th>
                            <th className="lead-th">Age</th>
                            <th className="lead-th">Income Type</th>
                            <th className="lead-th">Income</th>
                            <th className="lead-th">Industry</th>
                            <th className="lead-th">Cibil Score</th>
                            <th className="lead-th">Existing Loan Amt</th>
                            <th className="lead-th">Existing ROI</th>
                            <th className="lead-th">Existing EMI</th>
                            <th className="lead-th">Is Called</th>
                            <th className="lead-th">Lead From</th>
                            <th className="lead-th">Assigned To</th>
                            <th className="lead-th">Lead Call Status</th>
                            <th className="lead-th">Call Status</th>
                            <th className="lead-th">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(data) && data.map((lead, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{lead.DatabaseName}</td>
                                <td>{lead.DatabaseOwner}</td>
                                <td>{lead.DatabaseType}</td>
                                <td>{lead.Name}</td>
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
                                <td>{lead.IsCalled ? "Yes" : "No"}</td>
                                <td>{lead.LeadFrom}</td>
                                <td>
                                    {editMode === index ? (
                                        <select
                                            value={selectedEmployee}
                                            onChange={(e) => setSelectedEmployee(e.target.value)}
                                        >
                                            {Object.entries(employees).map(([id, name]) => (
                                                <option key={id} value={id}>
                                                    {name}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        employees[lead.AssignedTo] || "N/A"
                                    )}
                                </td>
                                <td>{lead.LeadCallStatus}</td>
                                <td>{lead.CallStatus.join(", ")}</td>
                                <td className="statusbtn">
                                    {editMode === index ? (
                                        <button className="savebtn" onClick={() => handleSaveClick(index, lead)}>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </button>
                                    ) : (
                                        <button className="editbtn" onClick={() => handleEditClick(index)}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
