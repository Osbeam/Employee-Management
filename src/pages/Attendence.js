import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Attendance() {
  const [activeTab, setActiveTab] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const logout =()=>{

  }
  return (
   <>
    <div className='dashboard'>
      <div className='header'>
        <div className='header-container'>
        
          <div className='right'>
   

          </div>
        </div>
      </div>
      <div className='content'>
        <div className='content-container'>
          <div className="tabs">
            <button className={activeTab === 'dailyAttendance' ? 'tab active' : 'tab'} onClick={() => setActiveTab('dailyAttendance')}>Daily Attendance</button>
            <button className={activeTab === 'allReports' ? 'tab active' : 'tab'} onClick={() => setActiveTab('allReports')}>All Reports</button>
          </div>
          <div className="tab-content">
            {activeTab === 'dailyAttendance' && 
            <table>
                <tr>
                    <td>Employee Id</td>
                    <td>Employee Name</td>
                    <td>In Time</td>
                    <td>Out time</td>
                    <td>Duration</td>
                    <td>View</td>
                    <td>Status</td>
                </tr>
            </table>
            }
            {activeTab === 'allReports' && 
             <table>
             <tr>
                 <td>Employee Id</td>
                 <td>Employee Name</td>
                 <td>Designation</td>
                 <td>Present days</td>
                 <td>Status</td>
             </tr>
         </table>
            }
          </div>
        </div>
      </div>
    </div>
   </>
  )
}
