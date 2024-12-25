import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function LeaveManagement() {
    const [leaveData, setLeaveData] = useState([]);
    const [leaveHistoryData, setLeaveHistoryData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [leaveRequestData, setLeaveRequestData] = useState([]);
    const [updatingRequest, setUpdatingRequest] = useState(null);


    // Fetch leave data from API
    const fetchLeaveBalance = async () => {
        try {
            const response = await fetch('http://77.37.45.224:8000/api/leaveManagement/getAllLeaveBalance');
            const data = await response.json();
            if (data.success) {
                setLeaveData(data.data);
                setSelectedUser(data.data[0]); // Set the first user as the default selected user
            }
        } catch (error) {
            console.error('Error fetching leave data:', error);
        }
    };

    // Fetch leave history data from API
    const fetchLeaveHistory = async () => {
        try {
            const response = await fetch('http://77.37.45.224:8000/api/leaveManagement/getAllLeaveHistory');
            const data = await response.json();
            if (data.success && Array.isArray(data.data)) {
                setLeaveHistoryData(data.data);
            } else {
                setLeaveHistoryData([]);
            }
        } catch (error) {
            console.error('Error fetching leave history:', error);
            setLeaveHistoryData([]);
        }
    };

    // Fetch leave request data from API
    const fetchLeaveRequests = async () => {
        try {
            const response = await fetch('http://77.37.45.224:8000/api/leaveManagement/getAllLeaveRequests');
            const data = await response.json();
            if (data.success && Array.isArray(data.data)) {
                setLeaveRequestData(data.data);
            } else {
                setLeaveRequestData([]);
            }
        } catch (error) {
            console.error('Error fetching leave requests:', error);
            setLeaveRequestData([]);
        }
    };

    // Fetch all necessary data
    useEffect(() => {
        fetchLeaveBalance();
        fetchLeaveHistory();
        fetchLeaveRequests();
    }, []);

    // Refetch data after updating leave status
    const updateLeaveStatus = async (leaveHistoryId, status) => {
        setUpdatingRequest(leaveHistoryId);
        try {
            const response = await fetch('http://77.37.45.224:8000/api/leaveManagement/updateLeaveStatus', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    leaveId: leaveHistoryId,
                    status: status,
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.success) {
                // Refetch data after update
                fetchLeaveHistory();
                fetchLeaveRequests();
            } else {
                console.error('Error updating leave request:', data.message);
            }
        } catch (error) {
            console.error('Error updating leave request:', error);
        } finally {
            setUpdatingRequest(null);
        }
    };

    const handleApprove = (leaveHistoryId) => {
        updateLeaveStatus(leaveHistoryId, 'Approved');
    };

    const handleDecline = (leaveHistoryId) => {
        updateLeaveStatus(leaveHistoryId, 'Rejected');
    };

    // Filter leave history for selected user
    const filteredHistory = selectedUser && selectedUser.userId ?
        leaveHistoryData.find(history => history.userId?._id === selectedUser.userId._id)?.LeaveHistory || [] : [];


    const handleUserChange = (e) => {
        const userId = e.target.value;
        const user = leaveData.find(user => user.userId === userId);
        setSelectedUser(user);
    };

    return (
        <>
            <div className='lm-main-container'>
                <div className='lm-main-container'>
                    <div className='LM-head-container'>
                        <h1>Leave Management</h1>
                        <select className='LM-head-container-dropdown' onChange={handleUserChange}>
                            {leaveData.map(user => (
                                <option key={user.userId} value={user.userId}>
                                    {user.Name} {user.Surname}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='lm-container'>
                        <div className='LM-inner-container'>
                            <section class="LM-leave-section">
                                <div class="LM-section-container">
                                    <div class="LM-circle-container">
                                        <div className="LM-circle LM-sick-leave">
                                            <div className="LM-number">
                                                {selectedUser && selectedUser.LeaveBalances.SickLeave.Available}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="LM-leave-type">Sick Leave</div>
                                    <div class="LM-leave-info LM-sick-leave-info">
                                        <div>Available:{selectedUser && selectedUser.LeaveBalances.SickLeave.Available}</div>
                                        <div>Taken:{selectedUser && selectedUser.LeaveBalances.SickLeave.Taken}</div>
                                    </div>
                                </div>
                                <div class="LM-section-container">
                                    <div class="LM-circle-container">
                                        <div class="LM-circle LM-earned-leave ">
                                            <div className="LM-number">
                                                {selectedUser && selectedUser.LeaveBalances.EarnedLeave.Available}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="LM-leave-type">Earned Leave</div>
                                    <div class="LM-leave-info LM-earned-leave-info">
                                        <div>Available:{selectedUser && selectedUser.LeaveBalances.EarnedLeave.Available}</div>
                                        <div>Taken:{selectedUser && selectedUser.LeaveBalances.EarnedLeave.Taken}</div>
                                    </div>
                                </div>
                                <div class="LM-section-container">
                                    <div class="LM-circle-container">
                                        <div class="LM-circle LM-casual-leave">
                                            <div className="LM-number">

                                                {selectedUser && selectedUser.LeaveBalances.CasualLeave.Available}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="LM-leave-type">Casual Leave</div>
                                    <div class="LM-leave-info LM-casual-leave-info">
                                        <div>Available:{selectedUser && selectedUser.LeaveBalances.CasualLeave.Available}</div>
                                        <div>Taken:{selectedUser && selectedUser.LeaveBalances.CasualLeave.Taken}</div>
                                    </div>
                                </div>
                                <div class="LM-section-container">
                                    <div class="LM-circle-container">
                                        <div class="LM-circle LM-holiday-leave">
                                            <div className="LM-number">

                                                {selectedUser && selectedUser.LeaveBalances.HolidayLeave.Available}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="LM-leave-type">Holiday Leave</div>
                                    <div class="LM-leave-info LM-holiday-leave-info">
                                        <div>Available:{selectedUser && selectedUser.LeaveBalances.HolidayLeave.Available}</div>
                                        <div>Taken:{selectedUser && selectedUser.LeaveBalances.HolidayLeave.Taken}</div>
                                    </div>
                                </div>
                                <div class="LM-section-container">
                                    <div class="LM-circle-container">
                                        <div class="LM-circle LM-holiday-National-leave-info">
                                            <div className="LM-number">

                                                {selectedUser && selectedUser.LeaveBalances.NationalHolidayLeave.Available}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="LM-leave-type">Natioanl Holiday </div>
                                    <div class="LM-leave-info LM-holiday-National-leave-info">
                                        <div>Available:{selectedUser && selectedUser.LeaveBalances.NationalHolidayLeave.Available}</div>
                                        <div>Taken:{selectedUser && selectedUser.LeaveBalances.NationalHolidayLeave.Taken}</div>
                                    </div>
                                </div>
                            </section>
                            <section className='LM-leave-History-section'>
                                <div className='LR-main-container'>
                                    <div className='LR-heading'>
                                        <h1>Leave History</h1>
                                    </div>
                                    <div className='LR-container'>
                                        {filteredHistory.length > 0 ? (
                                            filteredHistory.map((history, index) => (
                                                <div className='LR-inner-card' key={index}>
                                                    <div className='LR-type-date'>
                                                        <p>{history.LeaveType}</p>
                                                        <div>
                                                            <p>Start Date</p>
                                                            <p>{history.StartDate}</p>
                                                        </div>
                                                        <div>
                                                            <p>End Date</p>
                                                            <p>{history.EndDate}</p>
                                                        </div>
                                                        <div>
                                                            <p>Total Days</p>
                                                            <p>{history.LeaveDays}</p>
                                                        </div>
                                                    </div>
                                                    <div className='LR-para'>
                                                        <p>{history.Reason || 'No description available.'}</p>
                                                        <button className='LR-btn-approve'>
                                                            {history.Status} <FontAwesomeIcon icon={faCheck} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No data available for this user.</p>
                                        )}
                                    </div>
                                </div>
                            </section>
                            <aside className='LM-leave-Request-section'>
                                <div className='rs-main-container'>
                                    <div className='rs-heading'>
                                        <h1>Leave Requests</h1>
                                    </div>
                                    <div className='rs-container'>
                                        {leaveRequestData.length > 0 ? (
                                            leaveRequestData.flatMap((request, index) => {
                                                const leaveHistories = Array.isArray(request.LeaveHistory) ? request.LeaveHistory : [];

                                                return leaveHistories.length > 0 ? (
                                                    leaveHistories.map((leaveHistory, leaveIndex) => (
                                                        <div className='rs-inner-card' key={`${index}-${leaveIndex}`}>
                                                            <div className='rs-user-name'>
                                                                <p>{request.userId?.FirstName} {request.userId?.LastName}</p>
                                                            </div>
                                                            <div className='rs-type-date'>
                                                                <p>Start Date: {leaveHistory.StartDate}</p>
                                                                <p>End Date: {leaveHistory.EndDate}</p>
                                                                <p>Leave Type: {leaveHistory.LeaveType}</p>
                                                                <p>Leave Days: {leaveHistory.LeaveDays}</p>
                                                            </div>
                                                            <div className='rs-para'>
                                                                <p>{leaveHistory.Reason}</p>
                                                            </div>
                                                            <button className='rs-btn-approve' onClick={() => handleApprove(leaveHistory._id)}>
                                                                Approved <FontAwesomeIcon icon={faCheck} />
                                                            </button>
                                                            <button className='rs-btn-decline' onClick={() => handleDecline(leaveHistory._id)}>
                                                                Declined <FontAwesomeIcon icon={faTimes} />
                                                            </button>
                                                        </div>
                                                    ))
                                                ) : null;
                                            })
                                        ) : (
                                            <p>No leave requests available.</p>
                                        )}
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
