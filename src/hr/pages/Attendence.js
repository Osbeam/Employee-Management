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
  const pageReportSize = 10;

  const fetchUsers = async (page = 1) => {
    try {
      const response = await axios.get(
        `http://77.37.45.224:8000/api/user/getLogUsers?currentPage=${page}&pageSize=${pageSize}`
      );
      const usersWithEditMode = response.data.data.map((user) => ({
        ...user,
        editMode: false,
        originalInTimeImage: user.inTimeImage // Store the original image
      }));
      setUsers(usersWithEditMode);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPage);
      setTotalRecords(response.data.userCount);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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

  //Fetch approved users
  const fetchAllUsers = async (page = 1) => {
    const today = new Date();
    const startDate = "2024-05-07";
    const endDate = today.toISOString().split("T")[0];

    try {
      const response = await axios.get(
        `http://77.37.45.224:8000/api/user/getApprovedLogUsers?approved=true&startDate=${startDate}&endDate=${endDate}&currentPage=${page}&pageSize=${pageSize}`
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

  //Approve users
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

      // If all required fields are filled, send the approval request
      await axios.put(`http://77.37.45.224:8000/api/user/editLogUser/${_id}`, {
        isPresent: true,
        approved: true,
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

  //Edit user data
  const handleEdit = (_id) => {
    setEditUserId(_id);
    const updatedUsers = users.map((user) =>
      user._id === _id ? { ...user, editMode: true } : user
    );
    setUsers(updatedUsers);
  };

  //Update and save data
  const handleSave = async (_id) => {
    try {
      const userToSave = users.find((user) => user._id === _id);
      const formData = new FormData();
      formData.append("inTime", userToSave.inTime);
      formData.append("outTime", userToSave.outTime);
      if (userToSave.inTimeImage && userToSave.inTimeImage instanceof File) {
        formData.append("inTimeImage", userToSave.inTimeImage);
      }

      await axios.put(
        `http://77.37.45.224:8000/api/user/editInTime/${_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update the users state with the updated user object
      // After updating the image
      const updatedUsers = users.map((user) =>
        user._id === _id
          ? {
            ...user,
            editMode: false,
            originalInTimeImage: user.inTimeImage,
            inTimeImage: user.inTimeImage instanceof File
              ? `${user.inTimeImage.name}?${Date.now()}`
              : user.inTimeImage
          }
          : user
      );
      setUsers(updatedUsers);
      message.success("Attendance edit successfully");
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

  //Delete user data
  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://77.37.45.224:8000/api/user/deleteLog/${_id}`);
      fetchUsers(currentPage);
    } catch (error) {
      console.log("Error deleting log:", error);
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
                                  type="time"
                                  value={
                                    user.inTime.split("T")[1].split(".")[0]
                                  } // Extract time portion
                                  onChange={(e) => {
                                    const currentDate = new Date()
                                      .toISOString()
                                      .split("T")[0]; // Get current date
                                    const updatedUsers = users.map((u) =>
                                      u._id === user._id
                                        ? {
                                          ...u,
                                          inTime: `${currentDate}T${e.target.value}:00.000Z`,
                                        }
                                        : u // Update time portion
                                    );
                                    setUsers(updatedUsers);
                                  }}
                                />
                              ) : (
                                user.inTime.split("T")[1].split(".")[0] // Display time portion
                              )}
                            </td>

                            <td>
                              {user.editMode ? (
                                <input
                                  type="time"
                                  value={
                                    user.outTime
                                      ? user.outTime.split("T")[1].split(".")[0]
                                      : ""
                                  } // Check if outTime exists
                                  onChange={(e) => {
                                    const currentDate = new Date()
                                      .toISOString()
                                      .split("T")[0]; // Get current date
                                    const updatedUsers = users.map((u) =>
                                      u._id === user._id
                                        ? {
                                          ...u,
                                          outTime: `${currentDate}T${e.target.value}:00.000Z`,
                                        }
                                        : u // Update time portion
                                    );
                                    setUsers(updatedUsers);
                                  }}
                                />
                              ) : user.outTime ? (
                                user.outTime.split("T")[1].split(".")[0]
                              ) : (
                                "-"
                              )}
                            </td>

                            <td>{user.totalHours ? user.totalHours : "-"}</td>
                            <td>
                              {user.editMode ? (
                                <input
                                  type="file"
                                  onChange={(e) => {
                                    const updatedUsers = users.map((u) =>
                                      u._id === user._id
                                        ? {
                                          ...u,
                                          inTimeImage: e.target.files[0],
                                        }
                                        : u
                                    );
                                    setUsers(updatedUsers);
                                  }}
                                />
                              ) : user.inTimeImage &&
                                typeof user.inTimeImage === "string" ? (
                                <img
                                  src={`http://77.37.45.224:8000/${user.inTimeImage}?${Date.now()}`}
                                  alt="User img"
                                  style={{
                                    maxWidth: "100px",
                                    maxHeight: "100px",
                                  }}
                                />
                              ) : (
                                "-"
                              )}
                            </td>

                            <td className="statusbtn">
                              {user.editMode ? (
                                <>
                                  <button
                                    className="savebtn"
                                    onClick={() => handleSave(user._id)}
                                  >
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
                                  <button
                                    className="approvebtn"
                                    onClick={() => handleApprove(user._id)}
                                  >
                                    <FontAwesomeIcon icon={faCheck} />
                                  </button>
                                  <button
                                    className="editbtn"
                                    onClick={() => handleEdit(user._id)}
                                  >
                                    <FontAwesomeIcon icon={faEdit} />
                                  </button>
                                  <button
                                    className="deletebtn"
                                    onClick={() =>
                                      showDeleteConfirmation(user._id)
                                    }
                                  >
                                    <FontAwesomeIcon icon={faTrash} />
                                  </button>
                                </>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
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
                        <th>Status</th>
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
                              <td>{user.Designation}</td>
                              <td>{user.count}</td>
                              <td className="statusbtn">
                                <button className="approvebtn">
                                  <FontAwesomeIcon icon={faCheck} />
                                </button>
                                <button className="editbtn">
                                  <FontAwesomeIcon icon={faEdit} />
                                </button>
                              </td>
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
