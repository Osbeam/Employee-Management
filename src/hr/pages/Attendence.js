import axios from "axios";
import { Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit, faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Attendance() {
  const [activeTab, setActiveTab] = useState("dailyAttendance");
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const pageSize = 10;

  const [currentReportPage, setCurrentReportPage] = useState(1);
  const [totalReportPages, setTotalReportPages] = useState(1);
  const [totalReportRecords, setTotalReportRecords] = useState(0);
  const [designations, setDesignations] = useState({});

  const pageReportSize = 10;

  // Get all log in user with authtoken
  const fetchUsers = async (page = 1) => {
    const authToken = localStorage.getItem('jwtoken');
    console.log('Auth Token:', authToken);

    if (!authToken) {
      console.error('No auth token found in local storage');
      return;
    }

    try {
      const response = await axios.get(
        `http://77.37.45.224:8000/api/user/getLogUsers?currentPage=${page}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log('API Response:', response.data); // Log the full response

      if (response.data.success) {
        const usersWithEditMode = response.data.data.map((user) => ({
          ...user,
          editMode: false,
          originalInTimeImage: user.inTimeImage
        }));
        setUsers(usersWithEditMode);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPage);
        setTotalRecords(response.data.userCount);
      } else {
        console.error('Failed to fetch users:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching users:', error.response?.data || error.message);
      if (error.response) {
        console.error('Response Error Data:', error.response.data);
      }
      if (error.request) {
        console.error('Request Error:', error.request);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  //Fetch approved users with authtoken
  const fetchAllUsers = async (page = 1) => {
    const today = new Date();
    const startDate = "2024-05-07";
    const endDate = today.toISOString().split("T")[0];

    try {
      const authToken = localStorage.getItem('jwtoken')
      const response = await axios.get(
        `http://77.37.45.224:8000/api/user/getApprovedLogUsers?approved=true&startDate=${startDate}&endDate=${endDate}&currentPage=${page}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      );
      setAllUsers(response.data.data);
      setCurrentReportPage(response.data.currentPage);
      setTotalReportPages(response.data.totalPages);
      setTotalReportRecords(response.data.totalDocuments);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  //Approve users with authtoken
  const handleApprove = async (_id) => {
    try {
      // Check if any of the users are missing required fields
      const userToApprove = users.find((user) => user._id === _id);
      if (
        !userToApprove.inTime ||
        !userToApprove.outTime ||
        !userToApprove.totalHours ||
        !userToApprove.inTimeImage
      ) {
        // If any required field is missing, show an error message
        message.error(
          "Please fill in all required fields (inTime, outTime, Duration and inTimeImage) before approving."
        );
        return; // Exit the function early
      }
      const authToken = localStorage.getItem('jwtoken')
      // If all required fields are filled, send the approval request
      await axios.put(`http://77.37.45.224:8000/api/user/editLogUser/${_id}`, {
        isPresent: true,
        approved: true,
      },
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== _id));
      fetchAllUsers();
      // Show success message
      message.success("Attendance approved successfully");
    } catch (error) {
      console.log("Error approving log:", error);
      // Show error message if needed
      message.error("Failed to approve attendance");
    }
  };

  const formatDateTimeForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const formatDateTimeForDisplay = (dateString) => {

    if (!dateString) {
      return "-";
    }

    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  // Edit user data
  const handleEdit = (_id) => {
    const updatedUsers = users.map((user) =>
      user._id === _id ? { ...user, editMode: true } : user
    );
    setEditUserId(_id);
    setUsers(updatedUsers);
  };

  // Edit and save data with authtoken
  const handleSave = async (_id) => {
    try {
      const userToSave = users.find((user) => user._id === _id);
      const formData = new FormData();
      formData.append("inTime", new Date(userToSave.inTime).toISOString());
      formData.append("outTime", new Date(userToSave.outTime).toISOString());

      // Note: No image logic here
      const authToken = localStorage.getItem('jwtoken')
      const response = await axios.put(
        `http://77.37.45.224:8000/api/user/editInTime/${_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`
          },
        }
      );

      const updatedUsers = users.map((user) =>
        user._id === _id
          ? {
            ...user,
            editMode: false,
            totalHours: response.data.log.totalHours,
            // Ensure inTimeImage remains unchanged
            inTimeImage: user.inTimeImage,
          }
          : user
      );
      setUsers(updatedUsers);

      message.success("Attendance edited successfully");
    } catch (error) {
      console.log("Error editing user:", error);
      message.error("Failed to edit attendance");
    }
  };

  //Cancel edit mode
  const handleCancelEdit = (_id) => {
    const updatedUsers = users.map((user) =>
      user._id === _id
        ? { ...user, editMode: false, inTimeImage: user.originalInTimeImage }
        : user
    );
    setUsers(updatedUsers);
  };

  //Delete user data with authtoken
  const handleDelete = async (_id) => {
    const authToken = localStorage.getItem('jwtoken'); // Retrieve the token from local storage

    if (!authToken) {
      console.error('No auth token found in local storage');
      return;
    }

    console.log('Auth Token:', authToken); // Debugging: Log the token to make sure it's retrieved

    try {
      const response = await axios.delete(`http://77.37.45.224:8000/api/user/deleteLog/${_id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Include the token in the headers
        },
      });

      console.log('Response:', response.data); // Log the response for debugging

      fetchUsers(currentPage);
    } catch (error) {
      console.log('Error deleting log:', error.response?.data || error.message); // More detailed error message
    }
  };

  const showDeleteConfirmation = (_id) => {
    setDeleteUserId(_id);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirmed = () => {
    if (deleteUserId) {
      handleDelete(deleteUserId);
      setIsDeleteModalVisible(false);
    }
  };

  const handleDeleteCancelled = () => {
    setIsDeleteModalVisible(false);
  };

  const fetchEmployeeDetails = async () => {
    try {
      const response = await axios.get("http://77.37.45.224:8000/api/department/getDesignation");
      const designationData = response.data.data.reduce((acc, designation) => {
        acc[designation._id] = designation.name;
        return acc;
      }, {});
      setDesignations(designationData);
    } catch (error) {
      console.log("Error fetching employee details:", error);
    }
  };

  useEffect(() => {
    fetchEmployeeDetails();
  }, []);

  const handlePrevPageAllUsers = () => {
    if (currentReportPage > 1) {
      fetchAllUsers(currentReportPage - 1);
    }
  };

  const handleNextPageAllUsers = () => {
    if (currentReportPage < totalReportPages) {
      fetchAllUsers(currentReportPage + 1);
    }
  };

  /* Existing code for pagination*/
  const handlePrevPage = () => {
    if (currentPage > 1) {
      fetchUsers(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchUsers(currentPage + 1);
    }
  };

  // const handlePageChange = (page) => {
  //   if (page >= 1 && page <= totalPages) {
  //     setCurrentPage(page);
  //   }
  // };

  // const renderPageNumbers = () => {
  //   const pageNumbers = [];
  //   const visiblePages = 5; // Number of pages to display in the pagination bar
  //   let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  //   let endPage = Math.min(totalPages, startPage + visiblePages - 1);

  //   // Adjust if startPage or endPage goes out of bounds
  //   if (endPage - startPage + 1 < visiblePages) {
  //     startPage = Math.max(1, endPage - visiblePages + 1);
  //   }

  //   for (let i = startPage; i <= endPage; i++) {
  //     pageNumbers.push(
  //       <button
  //         key={i}
  //         className={`pagination-number ${i === currentPage ? 'active' : ''}`}
  //         onClick={() => handlePageChange(i)}
  //       >
  //         {i}
  //       </button>
  //     );
  //   }

  //   return pageNumbers;
  // };

  return (
    <>
      <div className="dashboard">
        <div className="header">
          <div className="header-container">
            <div className="right"></div>
          </div>
        </div>
        <div className="content">
          <div className="content-container">
            <div className="tabs">
              <button
                className={
                  activeTab === "dailyAttendance" ? "tab active" : "tab"
                }
                onClick={() => setActiveTab("dailyAttendance")}
              >
                Daily Attendance
              </button>
              <button
                className={activeTab === "allReports" ? "tab active" : "tab"}
                onClick={() => setActiveTab("allReports")}
              >
                All Reports
              </button>
            </div>
            <div className="tab-content">
              {activeTab === "dailyAttendance" && (
                <>
                  <table>
                    <thead>
                      <tr>
                        <th className="th1">Sr. No</th>
                        <th>Employee Id</th>
                        <th>Employee Name</th>
                        <th>In Time</th>
                        <th>Out Time</th>
                        <th>Duration</th>
                        <th>View</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(users) &&
                        users.map((user, index) => (
                          <tr key={user._id}>
                            <td>{(currentPage - 1) * pageSize + index + 1}</td>
                            <td>{user.userId ? user.userId.EmployeeID : "-"}</td>
                            <td>{user.userId ? user.userId.FirstName : "-"}</td>

                            <td>
                              {user.editMode ? (
                                <input
                                  type="datetime-local"
                                  value={formatDateTimeForInput(user.inTime)}
                                  onChange={(e) => {
                                    const updatedUsers = users.map((u) =>
                                      u._id === user._id ? { ...u, inTime: e.target.value } : u
                                    );
                                    setUsers(updatedUsers);
                                  }}
                                />
                              ) : (
                                formatDateTimeForDisplay(user.inTime)
                              )}
                            </td>
                            <td>
                              {user.editMode ? (
                                <input
                                  type="datetime-local"
                                  value={formatDateTimeForInput(user.outTime)}
                                  onChange={(e) => {
                                    const updatedUsers = users.map((u) =>
                                      u._id === user._id ? { ...u, outTime: e.target.value } : u
                                    );
                                    setUsers(updatedUsers);
                                  }}
                                />
                              ) : (
                                formatDateTimeForDisplay(user.outTime)
                              )}
                            </td>
                            <td>{user.totalHours ? user.totalHours : "-"}</td>
                            <td>
                              {user.inTimeImage && typeof user.inTimeImage === "string" ? (
                                <img
                                  src={`http://77.37.45.224:8000/${user.inTimeImage}?${Date.now()}`}
                                  alt="User img"
                                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                                />
                              ) : (
                                "-"
                              )}
                            </td>
                            <td className="statusbtn">
                              {user.editMode ? (
                                <>
                                  <button className="savebtn" onClick={() => handleSave(user._id)}>
                                    <FontAwesomeIcon icon={faCheck} />
                                  </button>
                                  <button
                                    className="cancelbtn"
                                    onClick={() => handleCancelEdit(user._id)}
                                  >
                                    <FontAwesomeIcon icon={faTimes} />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button className="editbtn" onClick={() => handleEdit(user._id)}>
                                    <FontAwesomeIcon icon={faEdit} />
                                  </button>
                                  <button
                                    className="deletebtn"
                                    onClick={() => showDeleteConfirmation(user._id)}
                                  >
                                    <FontAwesomeIcon icon={faTrash} />
                                  </button>
                                  <button className="approvebtn" onClick={() => handleApprove(user._id)}>
                                    <FontAwesomeIcon icon={faCheck} />
                                  </button>
                                </>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>

                  </table>
                  { /* Existing code for pagination*/}
                  <div className="pagination">
                    <button
                      className="pagination-btn"
                      disabled={currentPage === 1}
                      onClick={handlePrevPage}
                    >
                      Previous
                    </button>
                    <span className="pagination-info">
                      Page {currentPage} of {totalPages}
                    </span>
                    <span className="pagination-info">
                      Total Records: {totalRecords}
                    </span>
                    <button
                      className="pagination-btn"
                      disabled={currentPage === totalPages}
                      onClick={handleNextPage}
                    >
                      Next
                    </button>
                  </div>
                  {/* <div className="pagination-emp">
                    <button className='Emp-list-pagination-btn' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                      Previous
                    </button>
                    {renderPageNumbers()}
                    <button className='Emp-list-pagination-btn' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                      Next
                    </button>
                  </div>
                  <div>User Count: {totalRecords}</div> */}
                </>
              )}
              {activeTab === "allReports" && (
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th>Sr. No</th>
                        <th>Employee Id</th>
                        <th>Employee Name</th>
                        <th>Designation</th>
                        <th>Present Days</th>
                        {/* <th>Status</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(allUsers) && allUsers.length > 0 ? (
                        allUsers.map((user, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                {index + 1 + (currentReportPage - 1) * pageSize}
                              </td>
                              <td>{user.EmployeeID}</td>
                              <td>{user.FirstName}</td>
                              <td>{designations[user.Designation] || user.Designation}</td>
                              <td>{user.count}</td>
                              {/* <td className="statusbtn">
                                <button className="approvebtn">
                                  <FontAwesomeIcon icon={faCheck} />
                                </button>
                                <button className="editbtn">
                                  <FontAwesomeIcon icon={faEdit} />
                                </button>
                              </td> */}
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="6">No data available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <div className="pagination">
                    <button
                      className="pagination-btn"
                      onClick={handlePrevPageAllUsers}
                      disabled={currentReportPage === 1}
                    >
                      Previous
                    </button>
                    <span>
                      Page {currentReportPage} of {totalReportPages}
                    </span>
                    <span>Total Records: {totalReportRecords}</span>

                    <button
                      className="pagination-btn"
                      onClick={handleNextPageAllUsers}
                      disabled={currentReportPage === totalReportPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        className="daily-attendence-del-modal"
        title="Confirm Delete"
        visible={isDeleteModalVisible}
        onOk={handleDeleteConfirmed}
        onCancel={handleDeleteCancelled}
      >
        <p>Are you sure you want to delete this item?</p>
      </Modal>
    </>
  );
}
