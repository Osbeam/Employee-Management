import React, { useState, useEffect } from 'react';
import { Modal, Button, DatePicker } from 'antd';
import axios from 'axios';
import './Employee.css'; // Make sure to import the CSS file

const { RangePicker } = DatePicker;

export default function Employee() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState([]); // State to store user data
  const [selectedUser, setSelectedUser] = useState(null); // State to store selected user data
  const [currentPage, setCurrentPage] = useState(1); // State to store current page
  const [pageSize, setPageSize] = useState(10); // State to store page size
  const [totalUserCount, settotalUserCount] = useState(0); // State to store total number of users
  const [totalPages, setTotalPages] = useState(1); // State to store total pages
  const [userCount, setUserCount] = useState(0); // State for user count
  const [dateRange, setDateRange] = useState([null, null]); // State to store date range

  // Fetching all emp call status


  const fetchCallStatusData = async (page, size, startDate = null, endDate = null) => {
    try {
      let url = `http://77.37.45.224:8000/api/admin/Allcallstatus?currentPage=${page}&pageSize=${size}`;
      if (startDate && endDate) {
        url += `&startDate=${startDate}&endDate=${endDate}`;
      }
  
      const authToken = localStorage.getItem('jwtoken');
  
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      if (response.data.success) {
        const userDataWithStatus = response.data.data.map(item => ({
          ...item.user,
          statusCounts: item.statusCounts,
          totalCalls: item.statusCounts.totalCall // Updated to use the correct key
        })); // Extracting user data, statusCounts, and totalCalls
        setUserData(userDataWithStatus); // Set user data to state
        settotalUserCount(response.data.totalUserCount); // Set total users to state
        setTotalPages(response.data.pagination.totalPages); // Calculate total pages
        return userDataWithStatus;
      } else {
        console.error('Failed to fetch call status data');
      }
    } catch (error) {
      console.error('Error fetching call status data:', error);
    }
  };
  

  useEffect(() => {
    fetchCallStatusData(currentPage, pageSize); // Fetch call status data on component mount or page change
  }, [currentPage, pageSize]);

  const openModal = async (user) => {
    await resetModalData();
    const data = await fetchCallStatusData(currentPage, pageSize);
    const updatedUser = data.find(u => u.EmployeeID === user.EmployeeID);
    setSelectedUser(updatedUser);
    setIsModalOpen(true);
  };

  const handleCancel = async () => {
    await resetModalData();
    setIsModalOpen(false);
  };

  const resetModalData = async () => {
    setSelectedUser(null);
    setDateRange([null, null]);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://77.37.45.224:8000/api/admin/getexcelfiles`);
      setUserCount(response.data.userCount);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  const handleFetchWithDateRange = async () => {
    if (dateRange && dateRange[0] && dateRange[1] && selectedUser) {
      const startDate = dateRange[0].format('YYYY-MM-DD');
      const endDate = dateRange[1].format('YYYY-MM-DD');
      const data = await fetchCallStatusData(currentPage, pageSize, startDate, endDate);
      const updatedUser = data.find(user => user.EmployeeID === selectedUser.EmployeeID);
      setSelectedUser(updatedUser);
    }
  };

  return (
    <>
      <div className='emp_container'>
        <div>
          <label className='Emp-label'>Total Data: <span>{userCount}</span> </label>
        </div>
      </div>
      <div className='table-emp-container'>
        <table className="custom-table">
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Name</th>
              <th style={{ textAlign: 'center' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user.EmployeeID}>
                <td style={{ textAlign: 'left' }}>{user.FirstName} {user.LastName}</td>
                <td style={{ textAlign: 'center' }}>
                  <Button onClick={() => openModal(user)}>View</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
        <Button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{ marginRight: 8 }}
        >
          Previous
        </Button>
        <span style={{ marginRight: 8 }}>
          Page {currentPage} of {totalPages}
        </span>
        <span>
          User Count: {totalUserCount}
        </span>
        <Button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={{ marginRight: 8 }}
        >
          Next
        </Button>
      </div>
      <Modal
        title="Employee Call Status"
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>
        ]}
      >
        {selectedUser ? (
          <div>
            <RangePicker onChange={handleDateRangeChange} />
            <Button onClick={handleFetchWithDateRange} style={{ marginTop: 16 }}>
              Fetch Data
            </Button>
            <table style={{ width: '100%', marginTop: 16 }}>
              <tbody>
                {Object.entries(selectedUser.statusCounts || {}).map(([key, value]) => (
                  <tr key={key}>
                    <td style={{ textAlign: 'left', fontWeight: 500 }}><p>{key}:</p></td>
                    <td style={{ textAlign: 'center', fontWeight: 400 }}>{value}</td>
                  </tr>
                ))}
                <tr>
                  <td style={{ textAlign: 'center', fontWeight: '700' }}>{selectedUser.totalCalls}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p>No user selected</p>
        )}
      </Modal>
    </>
  );
}
