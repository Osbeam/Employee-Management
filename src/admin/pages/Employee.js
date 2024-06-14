import React, { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'antd';
import axios from 'axios';

export default function Employee() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState([]); // State to store user data
  const [selectedUser, setSelectedUser] = useState(null); // State to store selected user data

  useEffect(() => {
    fetchCallStatusData(); // Fetch call status data on component mount
  }, []);

  const fetchCallStatusData = async () => {
    try {
      const response = await axios.get('http://77.37.45.224:8000/api/admin/Allcallstatus');
      if (response.data.success) {
        const userDataWithStatus = response.data.data.map(item => ({
          ...item.user,
          statusCounts: item.statusCounts,
          totalCalls: item.totalCalls
        })); // Extracting user data, statusCounts, and totalCalls
        setUserData(userDataWithStatus); // Set user data to state
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

  const columns = [
    {
      align: 'center',
      title: 'Name',
      dataIndex: 'UserName',
      key: 'UserName',
    },
    {
      align: 'center',
      title: 'Status',
      key: 'actions',
      render: (text, record) => (
        <Button onClick={() => openModal(record)}>View</Button>
      ),
    },
  ];

  return (
    <>
      <div className='emp_container'>
        <div>
          <label className='empuploadlabel'>Data: </label>
          <input className='empinput' />
        </div>
      </div>
      <div className='table-emp-container'>
        <Table dataSource={userData} columns={columns} />
      </div>
      <Modal title="Employee Call Status" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        {selectedUser && (
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
        )}
        {!selectedUser && (
          <p>No user selected</p>
        )}
      </Modal>
    </>
  );
}
