import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const SalarySlip = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [salarySlipData, setSalarySlipData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedUserName, setSelectedUserName] = useState(''); 

    useEffect(() => {
        const fetchUsersData = async () => {
            const authToken = localStorage.getItem('jwtoken');
            try {
                const response = await fetch(`http://77.37.45.224:8000/api/user/getEmployeeNames`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsers(data.data || []);
                } else {
                    console.log('Error fetching data: ', response.status);
                }
            } catch (error) {
                console.log('Error fetching data', error);
            }
        };

        fetchUsersData();
    }, []);

    // Function to handle user selection
    const handleUserSelect = async (userId) => {
        setSelectedUserId(userId);
        setSalarySlipData(null);
        setLoading(true);

    // Find selected user's name for the PDF file name
    const selectedUser = users.find((user) => user._id === userId);
    if (selectedUser) {
        setSelectedUserName(`${selectedUser.MrMissMrs} ${selectedUser.FirstName} ${selectedUser.LastName}`); // Set the selected user's full name
    }

        if (userId) {
            try {
                const authToken = localStorage.getItem('jwtoken');
                const response = await fetch(`http://77.37.45.224:8000/api/user/generateSalarySlip/${userId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setSalarySlipData(data.salarySlip);
                } else {
                    setError('Failed to fetch salary slip data');
                }
            } catch (error) {
                setError('Error fetching salary slip data');
            } finally {
                setLoading(false);
            }
        } else {
            setSalarySlipData(null);
            setLoading(false);
        }
    };

    // Function to generate PDF
    const generatePDF = () => {
        const salarySlipElement = document.getElementById('salary-slip');
        html2canvas(salarySlipElement).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210; // Width of A4 page in mm
            const pageHeight = 295; // Height of A4 page in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save(`salary-slip-${selectedUserName}.pdf`);
        });
    };

    return (
        <div>
            <div className='salarySlipDropdown'>
                <p>Select Employee:</p>
                <select onChange={(e) => handleUserSelect(e.target.value)} value={selectedUserId}>
                    <option value=""> -- Select an employee --</option>
                    {users.map((user) => (
                        <option key={user._id} value={user._id}>
                            {user.MrMissMrs} {user.FirstName} {user.MiddleName} {user.LastName}
                        </option>
                    ))}
                </select>
            </div>

            {loading && <p>Loading salary slip...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {salarySlipData && (
                <>
                    <div id="salary-slip" style={{ padding: '20px', fontFamily: 'Arial, sans-serif', width: '100%', borderCollapse: 'collapse', border: '2px solid #b7b3b3' }}>
                        <h2 style={{ textAlign: 'center', margin: '10px 0' }}>OSBEAM IT PVT LTD</h2>
                        <h3 style={{ textAlign: 'center', backgroundColor: '#f2f2f2', padding: '15px' }}>Salary Slip</h3>
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', borderBottom: '1px solid #ddd' }}>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'left' }}><strong>Employee Name:</strong> {salarySlipData.EmployeeName}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'left' }}><strong>Month:</strong> {salarySlipData.SalaryMonth || 'Mar-24'}</td>
                                </tr>
                                <tr>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'left' }}><strong>Employee Code:</strong> {salarySlipData.EmployeeCode}</td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'left' }}><strong>Bank Name:</strong> {salarySlipData.BankName}</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'left' }}><strong>Designation:</strong> {salarySlipData.Designation}</td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'left' }}><strong>Bank Account Number:</strong> {salarySlipData.AccountNumber}</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'left' }}><strong>PAN:</strong> {salarySlipData.PANNumber}</td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'left' }}></td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'left' }}><strong>UAN Number:</strong> {salarySlipData.UANNumber}</td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'left' }}></td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'left' }}><strong>Date of Joining:</strong> {salarySlipData.DateOfJoining}</td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'left' }}></td>
                            </tr>
                            </tbody>
                        </table>

                        {/* Income and Deduction breakdown */}
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f2f2f2' }}>
                                    <th style={{ padding: '10px', textAlign: 'left' }}>Income</th>
                                    <th style={{ padding: '10px', textAlign: 'left' }}>Amount</th>
                                    <th style={{ padding: '10px', textAlign: 'left' }}>Deductions</th>
                                    <th style={{ padding: '10px', textAlign: 'left' }}>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Income and Deductions Rows */}
                                {Object.entries(salarySlipData.IncomeBreakdown).map(([key, value], index) => (
                                <tr key={index}>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>{key}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>{value}</td>

                                    {index === 0 && (
                                        <>
                                            {/* Render PF in the first row */}
                                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>PF</td>
                                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>{salarySlipData.DeductionBreakdown.PF}</td>
                                        </>
                                    )}

                                    {index === 1 && (
                                        <>
                                            {/* Render PT in the second row */}
                                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Professional Tax</td>
                                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>{salarySlipData.DeductionBreakdown.PT}</td>
                                        </>
                                    )}
                                </tr>
                            ))}
                             <tr style={{ backgroundColor: '#f2f2f2' }}>
                                <td style={{ padding: '10px', fontWeight: 'bold', textAlign: 'left' }}>Total Income</td>
                                <td style={{ padding: '10px', fontWeight: 'bold', textAlign: 'left' }}>{salarySlipData.TotalIncome}</td>
                                <td style={{ padding: '10px', fontWeight: 'bold', textAlign: 'left' }}>Total Deductions</td>
                                <td style={{ padding: '10px', fontWeight: 'bold', textAlign: 'left' }}>{salarySlipData.TotalDeductions}</td>
                            </tr>
                            </tbody>
                        </table>

                        <div style={{ marginTop: '20px', textAlign: 'right' }}>
                        <h4>Net Salary: {salarySlipData.NetSalary}</h4>
                        <p>Amount (in Words): <strong> {salarySlipData.AmountInWords || ''}</strong></p>
                        <p style={{ marginTop: '40px', textAlign: 'center' }}>This is a Computer generated Payslip. No Signature required.</p>
                    </div>
                    </div>

                    <button onClick={generatePDF} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', cursor: 'pointer' }}>
                        Download PDF
                    </button>
                </>
            )}
        </div>
    );
};

export default SalarySlip;
