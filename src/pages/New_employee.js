import { Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import React from 'react'

export default function New_employee() {
  return (
    <Tabs defaultActiveKey='1'>
      <TabPane tab='Basic Information' key='1'>
        <form className='new-emp-form'>
          <div className='form-container'>
            <h2>Employee Registration Form</h2>
            <p>Basic Information</p>
            <div className='inner-container'>
              <label style={{ marginRight: '59px' }}>Full Name :</label>
              <input placeholder='Mr/Miss/Mrs' />
              <input placeholder='First name' />
              <input placeholder='Middle name' />
              <input placeholder='Last name' />
              <br />
              <label style={{ marginRight: '59px' }}>Mobile no. :</label>
              <input style={{ width: '27%' }} placeholder='Mobile no.' />
              <label style={{ marginRight: '15px',marginLeft:'23px'}}>Email id :</label>
              <input style={{ width: '26%' }} placeholder='Email id' /><br />
              <label style={{ marginRight: '51px' }}>Blood Group :</label>
              <select placeholder='Blood group'>
                <option value='A'>Select blood group</option>
                <option value='A+'>A+</option>
                <option value='B+'>B+</option>
                <option value='A-'>A-</option>
                <option value='B-'>B-</option>
                <option value='AB-'>AB+</option>
                <option value='AB-'>AB-</option>
                <option value='o+'>O+</option>
                <option value='o-'>O-</option>
              </select><br />
              <label style={{ marginRight: '22px' }}>Current Address :</label>
              <input style={{ width: '62%' }} placeholder='Current address' /><br />
              <input style={{ marginLeft: '137px', width: '62%' }} placeholder='Current address' /><br />
              <select style={{ marginLeft: '137px' }}>
                <option value='A'>Select city</option>
                <option value='A'>Pune</option>
                <option value='A'>Panaji</option>
              </select>
              <select>
                <option value=''>Select state</option>
                <option value='mh'>Maharashtra</option>
                <option value='g'>Goa</option>
              </select>
              <input placeholder='Pincode' /><br />

              <label style={{ marginRight: '26px' }}>Same as above :</label>
              <input type='checkbox' /><br />
              <label>Permanent Address :</label>
              <input style={{ width: '62%' }} placeholder='Permanent address' /><br />
              <input style={{ marginLeft: '137px', width: '62%' }} placeholder='Permanent address' /><br />
              <select style={{ marginLeft: '137px' }} placeholder='Blood group'>
                <option value='A'>Select city</option>
                <option value='A'>Pune</option>
                <option value='A'>Panaji</option>
              </select>
              <select placeholder='State'>
                <option value=''>Select state</option>
                <option value='mh'>Maharashtra</option>
                <option value='g'>Goa</option>
              </select>
              <input placeholder='Pincode' /><br />
            </div>
            <hr style={{ marginTop: 30 }} />


            <div className='inner-container'>
              <h2>Qualification and Experience</h2>
              <label style={{ marginRight: '16px' }}>Highest Qualification :</label>
              <select style={{width:'325px'}}>
                <option value=''>Select </option>
                <option value='mcs'>Mcs</option>
                <option value='bcs'>Bcs</option>
              </select>
              <label style={{ marginRight: '113px',marginLeft:'-28px' }}>Year :</label>
              <select style={{width:'314px'}}>
                <option value=''>Select year</option>
                <option value=''>2018</option>
                <option value=''>2017</option>
              </select><br />
              <label style={{ marginRight: '35px' }}>Total Experience :</label>
              <input style={{ width: '27%' }} placeholder='Total Experience.' />
              <label style={{ marginRight: '7px',marginLeft:'15px' }}>Last Company Name :</label>
              <input style={{ width: '26%' }} placeholder='Last Company Name' /><br />
              <label style={{ marginRight: '59px' }}>Joining Date :</label>
              <input type='date' style={{ width: '27%' }} placeholder='Joining Date.' />
              <label style={{ marginRight: '46px',marginLeft:'17px' }}>Relieving Date :</label>
              <input type='date' style={{ width: '26%' }} placeholder='Relieving Date' /><br />
            </div>
            <hr style={{ marginTop: 30 }} />


            <div className='inner-container'>
              <h2>Reference</h2>
              <p>Reference 1</p>
              <label style={{ marginRight: '35px' }}>Reference name:</label>
              <input style={{ width: '27%' }} placeholder='Reference name.' />
              <label style={{ marginRight: '25px', marginLeft:'20px' }}>Relation :</label>
              <input style={{ width: '26%' }} placeholder='Relation' /><br />
              <label style={{ marginRight: '63px' }}>Contact no. :</label>
              <input style={{ width: '27%' }} placeholder='Contact no.' />
              <label style={{ marginRight: '25px', marginLeft:'20px' }}>Address :</label>
              <input style={{ width: '26%' }} placeholder='Address' /><br />

              <p>Reference 2</p>
              <label style={{ marginRight: '35px' }}>Reference name:</label>
              <input style={{ width: '27%' }} placeholder='Reference name.' />
              <label style={{ marginRight: '25px', marginLeft:'20px' }}>Relation :</label>
              <input style={{ width: '26%' }} placeholder='Relation' /><br />
              <label style={{ marginRight: '63px' }}>Contact no. :</label>
              <input style={{ width: '27%' }} placeholder='Contact no.' />
              <label style={{ marginRight: '25px', marginLeft:'20px' }}>Address :</label>
              <input style={{ width: '26%' }} placeholder='Address' /><br />
            </div>
          </div>
          <div >
            <div className='submit-container'>
              <button>Next</button>
            </div>
          </div>
        </form>
      </TabPane>
      <TabPane tab='Employee Structure' key='2'>
        <div className='form-container'>
          <div className='inner-container'>
            <h2>Job Profile</h2>
            <label style={{ marginRight: '28px' }}>Employee Id :</label>
            <input style={{ width: '20%' }} placeholder='Employee id' />
            <label style={{ marginRight: '63px',marginLeft:'45px'}}>Department :</label>
            <select style={{ width: '20%' }}>
              <option value=''>Select </option>
              <option value='it'>IT</option>
              <option value='sales'>sales</option>
            </select><br />
            <label style={{ marginRight: '37px' }}>Designation :</label>
            <select style={{ width: '20%' }}>
              <option value=''>Select </option>
              <option value='Developer'>Developer</option>
              <option value='Sales executive'>Sales executive</option>
            </select>
      
            <label style={{ marginRight: '60px' }}>Reporting to :</label>
            <select style={{ width: '20%' }}>
              <option value=''>Select </option>
              <option value='hr'>hr</option>
              <option value='team-lead'>Team lead</option>
            </select><br />
            <label style={{ marginRight: '16px' }}>Manager name :</label>
            <select style={{ width: '20%' }}>
              <option value=''>Select </option>
              <option value='name'>Vishal</option>
              <option value='namee'>Sidhhant</option>
            </select>
            <label style={{ marginRight: '52px' }}>Joining Date :</label>
            <input type='date' style={{ width: '20%' }} placeholder='Joining Date.' /><br />
            <label style={{ marginRight: '16px' }}>Company name :</label>
            <select style={{ width: '55.8%' }}>
              <option value=''>Select </option>
              <option value='company'>Osbeam IT</option>
              <option value='companyy'>ShawNiks Solutions</option>
            </select>
          </div>
          <hr style={{ marginTop: 30 }} />

          <div className='form-container'>
            <div className='inner-container'>
              <h2>CTC</h2>
              <div className="grid-container">
                <div className="grid-item1">Salary Component</div>
                <div className="grid-item2">Amount</div>
                <div className="grid-item3">Per Month</div>
                <div className="grid-item4">Per Annual</div>
                <div className="grid-item5">Basic Salary</div>
                <div className="grid-item6"><input type="text" id="basicSalaryPerMonth" /></div>
                <div className="grid-item7"><input type="text" id="basicSalaryPerAnnual" /></div>
                <div className="grid-item8">Fixed Allowance</div>
                <div className="grid-item9"><input type="text" id="FixedAllowancePerMonth" /></div>
                <div className="grid-item10"><input type="text" id="FixedAllowancePerAnnual" /></div>
                <div className="grid-item11">Special Allowance</div>
                <div className="grid-item12"><input type="text" id="specialallowncePerMonth" /></div>
                <div className="grid-item13"><input type="text" id="specialallowncePerAnnual" /></div>
                <div className="grid-item14">Variable Allowance</div>
                <div className="grid-item15"><input type="text" id="variableAllowancePerMonth" /></div>
                <div className="grid-item16"><input type="text" id="variableAllowancePerAnnual" /></div>
                <div className="grid-item17">
                  <p>Deductions</p>
                  <div style={{ display:'flex',marginLeft:'30px' }}>
                    <div style={{marginRight:'40px'}}>
                      <label>PF</label>
                      <input type='checkbox' />
                    </div>
                    <div style={{marginRight:'40px'}}>
                      <label>ESI</label>
                      <input type='checkbox' />
                    </div>
                    <div style={{marginRight:'40px'}}>
                      <label>PT</label>
                      <input type='checkbox' />
                    </div>
                    <div> 
                      <label>TDS</label>
                      <input type='checkbox' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div >
          <div className='submit-container'>
            <button style={{ float: 'left' }}>Back</button>
            <button>Next</button>
          </div>
        </div>
      </TabPane>
      <TabPane tab='Assets' key='3'>
        <div className='form-container'>
          <div className='inner-container'>
            <h2>Joining Kit</h2>
            <label style={{ marginRight: '67px' }}>Offer Letter :</label>
            <button>Generate</button>
            <button>Download</button><br />
            <label style={{ marginRight: '19px' }}>Appointment Letter :</label>
            <button>Generate</button>
            <button>Download</button><br />
            <label style={{ marginRight: '89px' }}>ID Card :</label>
            <button>Generate</button>
            <button>Download</button><br />
            <label style={{ marginRight: '41px' }}>Vendor ID Card :</label>
            <button>Generate</button>
            <button>Download</button><br />
            <label style={{ marginRight: '10px' }}>Vendor Visiting Card :</label>
            <button>Generate</button>
            <button>Download</button><br />
            
            <label style={{ marginRight: '78px' }}>Notebook :</label>
            <label for="yes" style={{fontSize:'18px'}}>Yes</label>
            <input style={{ marginRight: '62px' }} type="radio" id="yes" name="choice" value="yes" />
            <label for="no" style={{fontSize:'18px'}}>No</label>
            <input type="radio" id="no" name="choice" value="no" /> <br />

            <label style={{ marginRight: '75px' }}>Stationary :</label>
            <label for="yes" style={{fontSize:'18px'}}>Yes</label>
            <input style={{ marginRight: '62px' }} type="radio" id="yes" name="choice" value="yes" />
            <label for="no" style={{fontSize:'18px'}}>No</label>
            <input type="radio" id="no" name="choice" value="no" /> <br />

            <label style={{ marginRight: '74px' }}>Joining Kit :</label>
            <label for="yes" style={{fontSize:'18px'}}>Yes</label>
            <input style={{ marginRight: '62px' }} type="radio" id="yes" name="choice" value="yes" />
            <label for="no" style={{fontSize:'18px'}}>No</label>
            <input type="radio" id="no" name="choice" value="no" /> <br />
          </div>
          <hr style={{ marginTop: 30 }} />

          <div className='inner-container'>
            <h2>Office Asset Allocation</h2>
            <label style={{ marginRight: '12px' }}>Official Mobile no. :</label>
            <input style={{ width: '30.5%' }} placeholder='official mobile no.' />
            <label style={{ marginRight: '15px',marginLeft:'10px' }}>Official Email Id :</label>
            <input style={{ width: '30.5%' }} placeholder='official email id' />
            <button className='assets-button'>Generate</button><br />
            <label style={{ marginRight: '26px' }}>Mobile IMEI no. :</label>
            <input style={{ width: '30.5%' }} placeholder='mobile imei no.' />
            <input style={{ width: '30.5%' }} placeholder='mobile imei no.' /><br />
          </div>
        </div>
        <div >
          <div className='submit-container'>
            <button style={{ float: 'left' }}>Back</button>
            <button>Next</button>
          </div>
        </div>
      </TabPane>
      <TabPane tab='Documents' key='4'>
        <div className='form-container'>
          <div className='inner-container'>
            <h2>Documents</h2>
            <label style={{ marginRight: '143px' }}>Pan Card. :</label>
            <input style={{ width: '34%' }} placeholder='Pan Card.' />
            <button>Upload</button><br />
            <label style={{ marginRight: '126px' }}>Aadhar Card :</label>
            <input style={{ width: '34%' }} placeholder='Aadhar Card' />
            <button>Upload</button><br />
            <label style={{ marginRight: '175px' }}>Photo :</label>
            <button>Upload</button><br />
            <label style={{ marginRight: '115px' }}>Address Proof :</label>
            <input style={{ width: '34%' }} placeholder='Address Proof' />
            <button>Upload</button><br />
            <label style={{ marginRight: '9px' }}>Highest Qualification Certificate :</label>
            <input style={{ width: '34%' }} placeholder='' />
            <button>Upload</button><br />
            <label style={{ marginRight: '12px' }}>Last Company Relieving Letter :</label>
            <input type='date' style={{ width: '34%' }} />
            <button>Upload</button><br />
            <label style={{ marginRight: '132px' }}>Bank Details :</label>
            <button>Upload</button><br />
            <label style={{ marginRight: '137px' }}>Bank Name :</label>
            <select style={{ width: '411px' }}>
              <option>Select Bank </option>
              <option>Bank of Mharashtra</option>
            </select><br />
            <label style={{ marginRight: '67px' }}>Account Holder Name :</label>
            <input style={{ width: '34%' }} placeholder='Account Holder Name' /><br />
            <label style={{ marginRight: '130px' }}>Account no. :</label>
            <input style={{ width: '34%' }} placeholder='Account no.' /><br />
            <label style={{ marginRight: '135px' }}>IFSC Code :</label>
            <input style={{ width: '34%' }} placeholder='IFSC Code' /><br />
          </div>
        </div>
        <div >
          <div className='submit-container'>
            <button>Back</button>
          </div>
        </div>
      </TabPane>
    </Tabs>
  )
}
