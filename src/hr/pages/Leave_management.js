import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Leave_management() {
    return (
        <>
            <div className='lm-main-container'>
      <div className='lm-main-container'>
                <div className='lm-container'>
                    <div className='LM-head-container'>
                        <h1>Shradha</h1>
                        <h1>Leave Management</h1>
                        <select className='LM-head-container-dropdown'>
                            <option>Select</option>
                            <option>Rock</option>
                            <option>Paper</option>
                            <option>Scissor</option>
                        </select>
                    </div>
                    <div className='LM-inner-container'>
                        <section class="LM-leave-section">
                            <div class="LM-section-container">
                                <div class="LM-circle-container">
                                    <div class="LM-circle LM-sick-leave">
                                        <div class="LM-number">0</div>
                                    </div>
                                </div>
                                <div class="LM-leave-type">Sick Leave</div>
                                <div class="LM-leave-info LM-sick-leave-info">
                                    <div>Available: 10</div>
                                    <div>Taken: 2</div>
                                </div>
                            </div>
                            <div class="LM-section-container">
                                <div class="LM-circle-container">
                                    <div class="LM-circle LM-earned-leave">
                                        <div class="LM-number">0</div>
                                    </div>
                                </div>
                                <div class="LM-leave-type">Earned Leave</div>
                                <div class="LM-leave-info LM-earned-leave-info">
                                    <div>Available: 10</div>
                                    <div>Taken: 2</div>
                                </div>
                            </div>
                            <div class="LM-section-container">
                                <div class="LM-circle-container">
                                    <div class="LM-circle LM-casual-leave">
                                        <div class="LM-number">0</div>
                                    </div>
                                </div>
                                <div class="LM-leave-type">Casual Leave</div>
                                <div class="LM-leave-info LM-casual-leave-info">
                                    <div>Available: 10</div>
                                    <div>Taken: 2</div>
                                </div>
                            </div>
                            <div class="LM-section-container">
                                <div class="LM-circle-container">
                                    <div class="LM-circle LM-holiday-leave">
                                        <div class="LM-number">0</div>
                                    </div>
                                </div>
                                <div class="LM-leave-type">Holiday Leave</div>
                                <div class="LM-leave-info LM-holiday-leave-info">
                                    <div>Available: 10</div>
                                    <div>Taken: 2</div>
                                </div>
                            </div>
                        </section>

                        <section className='LM-leave-History-section'>
                        <div className='LR-main-container'>
                                <div className='LR-heading'>
                                    <h1>Leave History</h1>
                                </div>
                                <div className='LR-container'>
                                    <div className='LR-inner-card'>
                                        <div className='LR-type-date'>
                                            <p>Sick Leave</p>
                                            <div>
                                                <p>Start Date</p>
                                                <p>04 Jun 2024</p>
                                            </div>
                                            <div>
                                                <p>End Date</p>
                                                <p>06 Jun 2024</p>
                                            </div>
                                            <div>
                                                <p>Total Days</p>
                                                <p>02 Days</p>
                                            </div>
                                        </div>
                                        <div className='LR-para'>
                                            <p>Lorem Ipsum is simply dummy text 
                                                of the printing and typeset</p>
                                                <button className='LR-btn-approve'>Approved <FontAwesomeIcon icon={faCheck}/></button>
                                        </div>
                                    
                                    </div>
                                    
                                </div>
                            </div>
                        </section>
                        <aside className='LM-leave-Request-section'>
                            <div className='rs-main-container'>
                                <div className='rs-heading'>
                                    <h1>Leave Requests</h1>
                                </div>
                                <div className='rs-container'>
                                    <div className='rs-inner-card'>
                                        <div className='rs-type-date'>
                                            <p>Start Date : 6 Jun 2024</p>
                                            <p>End Date : 9 Jun 2024</p>
                                            <p>Leave Type : Casual Leave</p>
                                        </div>
                                        <div className='rs-para'>
                                            <p>Lorem Ipsum is simply dummy text 
                                                of the printing and typeset</p>
                                        </div>
                                        <div className='rs-btn'>
                                            <button className='rs-btn-approve'>Approved <FontAwesomeIcon icon={faCheck}/></button>
                                            <button className='rs-btn-decline'>Declined <FontAwesomeIcon icon={faTimes}/></button>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                       </aside>
                    </div>
                </div>
            </div>
            </div> 
          
        </>
    )
}
