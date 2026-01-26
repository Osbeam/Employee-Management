import React from 'react'
import './CpApp.css'
import ProImg from '../Channel Partner/Images/dummy-profile.png'
import { FaUser, FaEnvelope, FaPhoneAlt, FaBirthdayCake } from 'react-icons/fa';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

export default function CpDetails() {
    return (
        <>
            <div>
                <div className='main-div'>
                    <div className='Profile-div'>
                        <div className='img-div'>
                            <img src={ProImg} alt="Profile" className='profile-img' />
                            <div className='img-user-name'>
                                <h3 className='user-name'><FaUser className='icon' /> Vishal Bhave</h3>
                                <h4 className='user-name'><FaEnvelope className='icon' /> vishalbhave@gmail.com</h4>
                                <h4 className='user-name'><FaPhoneAlt className='icon' /> 7896582365</h4>
                                <h4 className='user-name'><FaBirthdayCake className='icon' /> 18/08/2000</h4>
                            </div>
                            <div className=''>
                                {/* <h1>hi</h1> */}
                            </div>
                        </div>
                    </div>
                    <div className='details-div'>
                        <div className='personal-details-div'>
                            <div className='personal-details'>
                                <div className='personal-details-heading'><h1>Personal Details</h1></div>
                                <div className="details-grid">
                                    <div className="detail-item">
                                        <label>Gender</label>
                                        <p>Male</p>
                                    </div>
                                    <div className="detail-item">
                                        <label>Date of Birth</label>
                                        <p>18 August 2000</p>
                                    </div>
                                    <div className="detail-item">
                                        <label>Blood Group</label>
                                        <p>AB+</p>
                                    </div>
                                    <div className="detail-item">
                                        <label>Registered Email</label>
                                        <p>vishalbhave@gmail.com</p>
                                    </div>
                                </div>
                                <div className="address-section">
                                    <label>Permanent Address</label>
                                    <p>Santoshnagar, Katraj, Pune, MH-411046</p>
                                </div>
                                <div className="address-section">
                                    <label>Residential Address</label>
                                    <p>Santoshnagar, Katraj, Pune, MH-411046</p>
                                </div>
                            </div>
                        </div>
                        <div className='data-details-div'>
                            <div className='data-details'>
                                <div className='data-details-heading'>
                                    <h1>Data Details</h1>
                                    </div>
                                <div className='data-tabs'>
                                    <Tabs defaultActiveKey='1'>
                                        <TabPane tab="Cold Data" key="1">
                                            <div className='data-table'>
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>Name</th>
                                                            <th>Address</th>
                                                            <th>Data Name</th>
                                                            <th>Mo No</th>
                                                            <th>Field 1</th>
                                                            <th>Field 2</th>
                                                            <th>Field 3</th>
                                                            <th>Field 4</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Raju</td>
                                                            <td>Pune</td>
                                                            <td>Banking</td>
                                                            <td>9875641235</td>
                                                            <td>Data 1</td>
                                                            <td>Data 2</td>
                                                            <td>Data 3</td>
                                                            <td>Data 4</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </TabPane>
                                        <TabPane tab="Loans" key="2">
                                            <div className='data-table'>
                                            <table>
                                                    <thead>
                                                        <tr>
                                                            <th>Name</th>
                                                            <th>Address</th>
                                                            <th>Data Name</th>
                                                            <th>Mo No</th>
                                                            <th>Field 1</th>
                                                            <th>Field 2</th>
                                                            <th>Field 3</th>
                                                            <th>Field 4</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Rajesh</td>
                                                            <td>Mumbai</td>
                                                            <td>IT Industry</td>
                                                            <td>5478965896</td>
                                                            <td>Data 1</td>
                                                            <td>Data 2</td>
                                                            <td>Data 3</td>
                                                            <td>Data 4</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </TabPane>
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
