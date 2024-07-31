import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DirectSales = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [userCount, setUserCount] = useState(0);
    const [pageSize] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async (page) => {
            try {
                setLoading(true);
                const response = await axios.get(`http://77.37.45.224:8000/api/bussinessIncome/getAllBusinessIncome?currentPage=${page}&limit=${pageSize}`);
                if (response.data.success) {
                    setEmployees(response.data.data);
                    setCurrentPage(response.data.pagination.currentPage);
                    setUserCount(response.data.pagination.totalCount);
                    setTotalPages(response.data.pagination.totalPages);
                } else {
                    console.error('Failed to fetch data:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData(currentPage);
    }, [currentPage, pageSize]);

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    const handleEdit = (employee) => {
        navigate('directleadinfo', { state: { employee } });
    };

    const getIncomeType = (salaryIncome, businessIncome) => {
        if (salaryIncome && businessIncome) {
            return 'Both';
        } else if (salaryIncome) {
            return 'Salary';
        } else if (businessIncome) {
            return 'Business';
        }
        return 'None';
    };

    return (
        <>
            <div><h2 style={{ marginBottom: '25px', fontSize: '25px' }}>Direct Sale Data</h2></div>
            <div className="table-container">
                <table className="el-table">
                    <thead>
                        <tr className="el-table-tr">
                            <th style={{ minWidth: '75px' }}>Sr. No.</th>
                            <th>Name</th>
                            <th>Mobile No.</th>
                            <th>Property Location</th>
                            <th>City</th>
                            <th>Income Type</th>
                            <th>Other Income Type</th>
                            <th>Loan Type</th> 
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="9">Loading...</td>
                            </tr>
                        ) : (
                            employees.length > 0 ? (
                                employees.map((user, index) => {
                                    const salaryIncome = user.salaryIncome;
                                    const businessIncome = user.businessIncome;
                                    const loanType = user.LoanType ? user.LoanType.join(', ') : 'No Loan';

                                    return (
                                        <tr key={user.userId}>
                                            <td>{index + 1 + (currentPage - 1) * pageSize}</td>
                                            <td>{salaryIncome ? salaryIncome.Name : (businessIncome ? businessIncome.Name : '-')}</td>
                                            <td>{salaryIncome ? salaryIncome.MobileNo1 : (businessIncome ? businessIncome.MobileNo1 : '-')}</td>
                                            <td>{salaryIncome ? salaryIncome.PropertyLocation : (businessIncome ? businessIncome.PropertyLocation : '-')}</td>
                                            <td>
                                                {salaryIncome
                                                    ? (Array.isArray(salaryIncome.City) ? salaryIncome.City.join(', ') : salaryIncome.City)
                                                    : (businessIncome
                                                        ? (Array.isArray(businessIncome.City) ? businessIncome.City.join(', ') : businessIncome.City)
                                                        : '-')}
                                            </td>
                                            <td>{getIncomeType(salaryIncome, businessIncome) || '-'}</td>
                                            <td>
                                                {salaryIncome && businessIncome ? businessIncome.Name : 'No Other Income'}
                                            </td>
                                            <td>
                                                {salaryIncome
                                                    ? (Array.isArray(salaryIncome.LoanType) ? salaryIncome.LoanType.join(', ') : salaryIncome.LoanType)
                                                    : (businessIncome
                                                        ? (Array.isArray(businessIncome.LoanType) ? businessIncome.LoanType.join(', ') : businessIncome.LoanType)
                                                        : '-')}
                                            </td>
                                            <td className="statusbtn">
                                                <button
                                                    className="DS-editbtn"
                                                    onClick={() => handleEdit(user)}
                                                >
                                                    <span><p>View Details</p></span>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="9">No data available</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                <button className='Emp-list-pagination-btn' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <div>User Count: {userCount}</div>
                <button className='Emp-list-pagination-btn' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </>
    );
};

export default DirectSales;
