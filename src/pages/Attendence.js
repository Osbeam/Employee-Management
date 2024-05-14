import axios from "axios";
import { Modal, message  } from "antd";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Attendance() {
  const [activeTab, setActiveTab] = useState("dailyAttendance");
  const [users, setUsers] = useState([]);
  const [allusers, setAllUser] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  //Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://77.37.45.224:3000/api/user/getLogUsers"
      );
      const usersWithEditMode = response.data.data.map((user) => ({
        ...user,
        editMode: false,
      }));
      setUsers(usersWithEditMode);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  //Fetch approved users
  useEffect(() => {
    const today = new Date();
    const startDate = today.toISOString().split("T")[0];
    const endDate = startDate;

    const fetchAllUser = async () => {
      try {
        const response = await axios.get(
          `http://77.37.45.224:3000/api/user/getApprovedLogUsers?approved=true&startDate=${startDate}&endDate=${endDate}`
        );
        setAllUser(response.data.data);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    fetchAllUser();
  }, []);

  //Approve users
  const handleApprove = async (_id) => {
    try {
      await axios.put(`http://77.37.45.224:3000/api/user/editLogUser/${_id}`, {
        isPresent: true,
        approved: true,
      });
      fetchUsers();
      // Show success message
      message.success('Attendance approved successfully');
    } catch (error) {
      console.log("Error approving log:", error);
      // Show error message if needed
      message.error('Failed to approve attendance');
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
      if (userToSave.inTimeImage) {
        formData.append("inTimeImage", userToSave.inTimeImage);
      }

      await axios.put(
        `http://77.37.45.224:3000/api/user/editInTime/${_id}`,
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
              inTimeImage: `${user.inTimeImage}?${Date.now()}`,
            }
          : user
      );
      setUsers(updatedUsers);
      message.success('Attendance edit successfully');
    } catch (error) {
      console.log("Error editing user:", error);
      message.error('Failed to edit attendance');
    }
  };

  //Delete user data
  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://77.37.45.224:3000/api/user/deleteLog/${_id}`);
      fetchUsers();
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
                          <td>{index + 1}</td>
                          <td>{user.userId ? user.userId.EmployeeID : "-"}</td>
                          <td>{user.userId ? user.userId.UserName : "-"}</td>

                          <td>
                            {user.editMode ? (
                              <input
                                type="input"
                                value={user.inTime}
                                onChange={(e) => {
                                  const updatedUsers = users.map((u) =>
                                    u._id === user._id
                                      ? { ...u, inTime: e.target.value }
                                      : u
                                  );
                                  setUsers(updatedUsers);
                                }}
                              />
                            ) : (
                              user.inTime
                            )}
                          </td>
                          <td>
                            {user.editMode ? (
                              <input
                                type="input"
                                value={user.outTime}
                                onChange={(e) => {
                                  const updatedUsers = users.map((u) =>
                                    u._id === user._id
                                      ? { ...u, outTime: e.target.value }
                                      : u
                                  );
                                  setUsers(updatedUsers);
                                }}
                              />
                            ) : (
                              user.outTime
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
                                src={`http://77.37.45.224:3000/${
                                  user.inTimeImage
                                }?${Date.now()}`}
                                alt="User img"
                                style={{ maxWidth: "100px" }}
                              />
                            ) : (
                              "-"
                            )}
                          </td>

                          <td className="statusbtn">
                            {user.editMode ? (
                              <button
                                className="savebtn"
                                onClick={() => handleSave(user._id)}
                              >
                                 <FontAwesomeIcon icon={faCheck} />
                              </button>
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
              )}

              {activeTab === "allReports" && (
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
                    {Array.isArray(allusers) && allusers.length > 0 ? (
                      allusers.map((report, index) => {
                        console.log("Report:", report);
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{report.logs.userId.EmployeeID}</td>
                            <td>{report.logs.userId.UserName}</td>
                            <td>{report.logs.userId.Designation}</td>
                            <td>{report.count}</td>
                            <td className="statusbtn">
                              <button
                                className="approvebtn"
                                // onClick={() =>
                                //   handleApprove(report.logs.userId)
                                // }
                              >
                                <FontAwesomeIcon icon={faCheck} />
                              </button>
                              <button
                                className="editbtn"
                                // onClick={() => handleEdit(report.logs.userId)}
                              >
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
