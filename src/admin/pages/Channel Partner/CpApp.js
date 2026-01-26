import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './CpApp.css' 
import { useNavigate,useParams } from 'react-router-dom';

export default function CpApp() {
    const navigate = useNavigate();
    const { userId } = useParams(); 
    const [userData, setUserData] = useState(null); // Initialize as null for a single user object
    const [loanData, setLoanData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Use the correct API URL
                const response = await axios.get('http://77.37.45.224:5005/api/user/getAllUsers');
                setUserData(response.data.data); // Assuming the data is under 'data' in the response
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchLoanData = async () => {
            try {
                const response = await axios.get('http://77.37.45.224:5005/api/loanForm/getAllLoanForms');
                setLoanData(response.data.data);
            } catch (error) {
                console.error('Error fetching load data', error)
            }
        }
        fetchLoanData();
    }, [])
    const handleViewClick = () => {
        navigate(`/admin/${userId}/cpdetails`);
      };

    return (
        <div>
            <div style={{ marginBottom: '10px' }}>
                <h2>Channel Partner App</h2>
            </div>

            <Tabs defaultActiveKey='1'>
                <TabPane tab='User' key="1">
                    <div className='table-container'>
                        <table className='cpapptable'>
                            <thead>
                                <tr>
                                    <th>Profile Image</th>
                                    <th>First Name</th>
                                    <th>Mobile Number</th>
                                    <th>Email Id</th>
                                    <th>Designation</th>
                                    <th>Address</th>
                                    <th>Data Count</th>
                                    <th>View Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userData ? (
                                        <tr>
                                            <td><img src={userData.ProfileImage} width='50' alt="Profile" /></td>
                                            <td>{userData.FirstName}</td>
                                            <td>{userData.MobileNumber}</td>
                                            <td>{userData.EmailId}</td>
                                            <td>{userData.Designation}</td>
                                            <td>{userData.Address}</td>
                                            <td>{userData.DataCount}</td>
                                            <td>
                                                <button className='CpBtn' onClick={handleViewClick}>View</button>
                                            </td>
                                        </tr>
                                    ) : (
                                        <tr>
                                            <td colSpan="7" style={{ textAlign: 'center' }}>No user data available</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </TabPane>

                <TabPane tab='Loans' key='2'>
                    <div className='table-container'>
                        <table className='cpapptable'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Loan Type</th>
                                    <th>Loan Amount</th>
                                    <th>Mobile No</th>
                                    <th>Email Id</th>
                                    <th>Pan Card</th>
                                    <th>Aadhar Card</th>
                                    <th>Bank Statement</th>
                                    <th>Photo</th>
                                    <th>Salary Slip</th>
                                    <th>Two Year ITR</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loanData ? (
                                        <tr>
                                            <td>{loanData.Name}</td>
                                            <td>{loanData.LoanType}</td>
                                            <td>{loanData.LoanAmount}</td>
                                            <td>{loanData.MobileNo}</td>
                                            <td>{loanData.EmailId}</td>
                                            <td>
                                                <img
                                                    src={loanData.PanCard}
                                                    alt='Pan card'
                                                    style={{ width: '50px', height: 'auto' }}
                                                />
                                            </td>
                                            <td>
                                                <img
                                                    src={loanData.AadharCard}
                                                    alt='Aadhar card'
                                                    style={{ width: '50px', height: 'auto' }}
                                                />
                                            </td>
                                            <td>
                                                <img
                                                    src={loanData.BankStatement}
                                                    alt='Bank Statement'
                                                    style={{ width: '50px', height: 'auto' }}
                                                />
                                            </td>
                                            <td>
                                                <img
                                                    src={loanData.Photo}
                                                    alt='Photo'
                                                    style={{ width: '50px', height: 'auto' }}
                                                />
                                            </td>
                                            <td>
                                                <img
                                                    src={loanData.SalarySlip}
                                                    alt='Salary Slip'
                                                    style={{ width: '50px', height: 'auto' }}
                                                />
                                            </td>
                                            <td>
                                                <img
                                                    src={loanData.TwoYearITR}
                                                    alt='Two Year ITR'
                                                    style={{ width: '50px', height: 'auto' }}
                                                />
                                            </td>
                                        </tr>
                                    ) : (
                                        <tr>
                                            <td colSpan="7" style={{ textAlign: 'center' }}>No user data available</td>
                                        </tr>
                                    )


                                }
                            </tbody>
                        </table>
                    </div>
                </TabPane>
            </Tabs>

        </div>
    );
}
