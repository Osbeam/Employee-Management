import React, { useState, useEffect } from 'react';
import { Modal, Button, Pagination } from 'antd';
import axios from 'axios';
import './Employee.css'; // Make sure to import the CSS file

export default function Employee() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState([]); // State to store user data
  const [selectedUser, setSelectedUser] = useState(null); // State to store selected user data
  const [currentPage, setCurrentPage] = useState(1); // State to store current page
  const [pageSize, setPageSize] = useState(10); // State to store page size
  const [totalUsers, setTotalUsers] = useState(0); // State to store total number of users
  const [totalPages, setTotalPages] = useState(1); // State to store total pages

  useEffect(() => {
    fetchCallStatusData(currentPage, pageSize); // Fetch call status data on component mount or page change
  }, [currentPage, pageSize]);

  const fetchCallStatusData = async (page, size) => {
    try {
      const response = await axios.get(`http://77.37.45.224:8000/api/admin/Allcallstatus?currentPage=${page}&pageSize=${size}`);
      if (response.data.success) {
        const userDataWithStatus = response.data.data.map(item => ({
          ...item.user,
          statusCounts: item.statusCounts,
          totalCalls: item.totalCalls
        })); // Extracting user data, statusCounts, and totalCalls
        setUserData(userDataWithStatus); // Set user data to state
        setTotalUsers(response.data.totalUsers); // Set total users to state
        setTotalPages(Math.ceil(response.data.totalUsers / pageSize)); // Calculate total pages
      } else {
        console.error('Failed to fetch call status data');
      }
    } catch (error) {
      console.error('Error fetching call status data:', error);
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [userCount, setUserCount] = useState(0);

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
              <tr key={user.UserName}>
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
          User Count: {totalUsers}
        </span>
        <Button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={{ marginRight: 8 }}
        >
          Next
        </Button>
      </div>
      <Modal title="Employee Call Status" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        {selectedUser ? (
          <div>
            <table style={{ width: '100%' }}>
              <tbody>
                {Object.entries(selectedUser.statusCounts || {}).map(([key, value]) => (
                  <tr key={key}>
                    <td style={{ textAlign: 'left' }}><p>{key}:</p></td>
                    <td style={{ textAlign: 'center' }}>{value}</td>
                  </tr>
                ))}
                <tr>
                  <td style={{ textAlign: 'left' }}><strong>Total Calls:</strong></td>
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
