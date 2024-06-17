import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import React, { useState } from "react";
import axios from "axios";

export default function New_employee() {
  const [formData, setformData] = useState({
    FirstName: "",
    MiddleName: "",
    LastName: "",
    MobileNumber: "",
    Email: "",
    BloodGroup: "",
    CurrentAddress: "",
    City: "",
    State: "",
    Pincode: "",
    PermanentAddress: "",
    HighestQualification: "",
    Year: "",
    TotalExperience: "",
    LastCompanyName: "",
    JoiningDate: "",
    RelievingDate: "",
    Reference1: "",
    Relation1: "",
    ContactNumber1: "",
    Address1: "",
    ReferenceName2: "",
    Relation2: "",
    ContactNumber2: "",
    Address2: "",
    EmployeeID: "",
    Department: "",
    SubDepartment: "",
    Designation: "",
    ReportingTo: "",
    ManagerName: "",
    CompanyName: "",
    BasicSalary: "",
    FixedAllowance: "",
    SpecialAllowance: "",
    VariableAllowance: "",
    Deductions: [],
    NoteBook: "",
    Stationery: "",
    JoiningKit: "",
    OfficialMobileNumber: "",
    MobileIMEINumber: "",
    PanCard: "",
    AadharCard: "",
    Photo: "",
    AddressProof: "",
    HighestQuaCertificate: "",
    LastComRellievingLetter: "",
    BankDetails: "",
    BankName: "",
    AccountHolderName: "",
    AccountNumber: "",
    IFSCCode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Assuming 'Deductions' is an array of strings
      const deductionsArray = []; // Initialize an empty array for deductions
      // Add the selected deductions to the array
      if (formData.PF) {
        deductionsArray.push("PF");
      }
      if (formData.ESI) {
        deductionsArray.push("ESI");
      }
      if (formData.PT) {
        deductionsArray.push("PT");
      }
      if (formData.TDS) {
        deductionsArray.push("TDS");
      }
  
      // Update the 'Deductions' field in formData
      setformData((prevData) => ({
        ...prevData,
        Deductions: deductionsArray,
      }));
  
      const response = await axios.post(
        "http://77.37.45.224:8000/api/user/employeeInfo",
        formData
      );
      console.log("Form submitted successfully!", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Basic Information" key="1">
  <form className="new-emp-form" onSubmit={handleSubmit}>
    <div className="form-container">
      <h2>Employee Registration Form</h2>
      <p>Basic Information</p>
      <div className="inner-container">
        <label style={{ marginRight: "59px" }}>Full Name :</label>
        <input placeholder="Mr/Miss/Mrs" />
        <input
          type="text"
          name="FirstName"
          value={formData.FirstName}
          onChange={handleInputChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="MiddleName"
          value={formData.MiddleName}
          onChange={handleInputChange}
          placeholder="Middle Name"
        />
        <input
          type="text"
          name="LastName"
          value={formData.LastName}
          onChange={handleInputChange}
          placeholder="Last Name"
        />
        <br />
        <label style={{ marginRight: "59px" }}>Mobile no. :</label>
        <input
          style={{ width: "27%" }}
          placeholder="Mobile no."
          name="MobileNumber"
          value={formData.MobileNumber}
          onChange={handleInputChange}
        />
        <label style={{ marginRight: "15px", marginLeft: "23px" }}>
          Email id :
        </label>
        <input
          style={{ width: "26%" }}
          placeholder="Email id"
          name="Email"
          value={formData.Email}
          onChange={handleInputChange}
        />
        <br />
        <label style={{ marginRight: "51px" }}>Blood Group :</label>
        <select
          name="BloodGroup"
          value={formData.BloodGroup}
          onChange={handleInputChange}
          placeholder="Blood group"
        >
          <option value="">Select blood group</option>
          <option value="A+">A+</option>
          <option value="B+">B+</option>
          <option value="A-">A-</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
        <br />
        <label style={{ marginRight: "22px" }}>Current Address :</label>
        <input 
          style={{ width: "62%" }} 
          placeholder="Current address" 
          name="CurrentAddress"
          value={formData.CurrentAddress}
          onChange={handleInputChange}
        />
        <br />
        <input
          style={{ marginLeft: "137px", width: "62%" }}
          placeholder="Current address"
          name="CurrentAddress"
          value={formData.CurrentAddress}
          onChange={handleInputChange}
        />
        <br />
        <select 
          style={{ marginLeft: "137px" }}
          name="City"
          value={formData.City}
          onChange={handleInputChange}
        >
          <option value="">Select city</option>
          <option value="Pune">Pune</option>
          <option value="Panaji">Panaji</option>
        </select>
        <select
          name="State"
          value={formData.State}
          onChange={handleInputChange}
        >
          <option value="">Select state</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Goa">Goa</option>
        </select>
        <input 
          placeholder="Pincode"
          name="Pincode"
          value={formData.Pincode}
          onChange={handleInputChange}
        />
        <br />

        <label style={{ marginRight: "26px" }}>Same as above :</label>
        <input type="checkbox" />
        <br />
        <label>Permanent Address :</label>
        <input 
          style={{ width: "62%" }} 
          placeholder="Permanent address"
          name="PermanentAddress"
          value={formData.PermanentAddress}
          onChange={handleInputChange}
        />
        <br />
        <input
          style={{ marginLeft: "137px", width: "62%" }}
          placeholder="Permanent address"
          name="PermanentAddress"
          value={formData.PermanentAddress}
          onChange={handleInputChange}
        />
        <br />
        <select 
          style={{ marginLeft: "137px" }} 
          placeholder="Blood group"
          name="City"
          value={formData.City}
          onChange={handleInputChange}
        >
          <option value="">Select city</option>
          <option value="Pune">Pune</option>
          <option value="Panaji">Panaji</option>
        </select>
        <select 
          name="State"
          value={formData.State}
          onChange={handleInputChange}
        >
          <option value="">Select state</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Goa">Goa</option>
        </select>
        <input 
          placeholder="Pincode"
          name="Pincode"
          value={formData.Pincode}
          onChange={handleInputChange}
        />
        <br />
            </div>
            <hr style={{ marginTop: 30 }} />

            <div className="inner-container">
  <h2>Qualification and Experience</h2>
  <label style={{ marginRight: "16px" }}>Highest Qualification :</label>
  <select
    style={{ width: "325px" }}
    name="HighestQualification"
    value={formData.HighestQualification}
    onChange={handleInputChange}
  >
    <option value="">Select</option>
    <option value="Bachelor's Degree">Bachelor's Degree</option>
    <option value="Master's Degree">Master's Degree</option>
    <option value="PhD">PhD</option>
    {/* Add more options as needed */}
  </select>
  <label style={{ marginRight: "113px", marginLeft: "-28px" }}>Year :</label>
  <select
    style={{ width: "314px" }}
    name="Year"
    value={formData.Year}
    onChange={handleInputChange}
  >
    <option value="">Select year</option>
    <option value="2021">2021</option>
    <option value="2020">2020</option>
    <option value="2019">2019</option>
    {/* Add more options as needed */}
  </select>
  <br />
  <label style={{ marginRight: "35px" }}>Total Experience :</label>
  <input
    style={{ width: "27%" }}
    placeholder="Total Experience."
    name="TotalExperience"
    value={formData.TotalExperience}
    onChange={handleInputChange}
  />
  <label style={{ marginRight: "7px", marginLeft: "15px" }}>
    Last Company Name :
  </label>
  <input
    style={{ width: "26%" }}
    placeholder="Last Company Name"
    name="LastCompanyName"
    value={formData.LastCompanyName}
    onChange={handleInputChange}
  />
  <br />
  <label style={{ marginRight: "59px" }}>Joining Date :</label>
  <input
    type="date"
    style={{ width: "27%" }}
    placeholder="Joining Date."
    name="JoiningDate"
    value={formData.JoiningDate}
    onChange={handleInputChange}
  />
  <label style={{ marginRight: "46px", marginLeft: "17px" }}>
    Relieving Date :
  </label>
  <input
    type="date"
    style={{ width: "26%" }}
    placeholder="Relieving Date"
    name="RelievingDate"
    value={formData.RelievingDate}
    onChange={handleInputChange}
  />
  <br />
</div>
<hr style={{ marginTop: 30 }} />

<div className="inner-container">
  <h2>Reference</h2>
  <p>Reference 1</p>
  <label style={{ marginRight: "35px" }}>Reference name:</label>
  <input
    style={{ width: "27%" }}
    placeholder="Reference name."
    name="Reference1"
    value={formData.Reference1}
    onChange={handleInputChange}
  />
  <label style={{ marginRight: "25px", marginLeft: "20px" }}>Relation :</label>
  <input
    style={{ width: "26%" }}
    placeholder="Relation"
    name="Relation1"
    value={formData.Relation1}
    onChange={handleInputChange}
  />
  <br />
  <label style={{ marginRight: "63px" }}>Contact no. :</label>
  <input
    style={{ width: "27%" }}
    placeholder="Contact no."
    name="ContanctNumber1"
    value={formData.ContanctNumber1}
    onChange={handleInputChange}
  />
  <label style={{ marginRight: "25px", marginLeft: "20px" }}>Address :</label>
  <input
    style={{ width: "26%" }}
    placeholder="Address"
    name="Address1"
    value={formData.Address1}
    onChange={handleInputChange}
  />
  <br />

  <p>Reference 2</p>
  <label style={{ marginRight: "35px" }}>Reference name:</label>
  <input
    style={{ width: "27%" }}
    placeholder="Reference name."
    name="ReferenceName2"
    value={formData.ReferenceName2}
    onChange={handleInputChange}
  />
  <label style={{ marginRight: "25px", marginLeft: "20px" }}>Relation :</label>
  <input
    style={{ width: "26%" }}
    placeholder="Relation"
    name="Relation2"
    value={formData.Relation2}
    onChange={handleInputChange}
  />
  <br />
  <label style={{ marginRight: "63px" }}>Contact no. :</label>
  <input
    style={{ width: "27%" }}
    placeholder="Contact no."
    name="ContanctNumber2"
    value={formData.ContanctNumber2}
    onChange={handleInputChange}
  />
  <label style={{ marginRight: "25px", marginLeft: "20px" }}>Address :</label>
  <input
    style={{ width: "26%" }}
    placeholder="Address"
    name="Address2"
    value={formData.Address2}
    onChange={handleInputChange}
  />
  <br />
</div>

          </div>
          <div>
            <div className="submit-container">
              <button type="submit">Next</button>
            </div>
          </div>
        </form>
      </TabPane>
      <TabPane tab="Employee Structure" key="2">
  <div className="form-container">
    <div className="inner-container">
      <h2>Job Profile</h2>
      <label style={{ marginRight: "28px" }}>Employee Id :</label>
      <input
        style={{ width: "20%" }}
        placeholder="Employee id"
        name="EmployeeId"
        value={formData.EmployeeId}
        onChange={handleInputChange}
      />
      <label style={{ marginRight: "63px", marginLeft: "45px" }}>
        Department :
      </label>
      <select
        style={{ width: "20%" }}
        name="Department"
        value={formData.Department}
        onChange={handleInputChange}
      >
        <option value="">Select</option>
        <option value="IT">IT</option>
        <option value="Sales">Sales</option>
        {/* Add more options as needed */}
      </select>
      <br />
      <label style={{ marginRight: "37px" }}>Designation :</label>
      <select
        style={{ width: "20%" }}
        name="Designation"
        value={formData.Designation}
        onChange={handleInputChange}
      >
        <option value="">Select</option>
        <option value="Developer">Developer</option>
        <option value="Sales executive">Sales executive</option>
        {/* Add more options as needed */}
      </select>

      <label style={{ marginRight: "60px" }}>Reporting to :</label>
      <select
        style={{ width: "20%" }}
        name="ReportingTo"
        value={formData.ReportingTo}
        onChange={handleInputChange}
      >
        <option value="">Select</option>
        <option value="HR">HR</option>
        <option value="Team Lead">Team Lead</option>
        {/* Add more options as needed */}
      </select>
      <br />
      <label style={{ marginRight: "16px" }}>Manager name :</label>
      <select
        style={{ width: "20%" }}
        name="ManagerName"
        value={formData.ManagerName}
        onChange={handleInputChange}
      >
        <option value="">Select</option>
        <option value="Vishal">Vishal</option>
        <option value="Sidhhant">Sidhhant</option>
        {/* Add more options as needed */}
      </select>
      <label style={{ marginRight: "52px" }}>Joining Date :</label>
      <input
        type="date"
        style={{ width: "20%" }}
        placeholder="Joining Date."
        name="JoiningDate"
        value={formData.JoiningDate}
        onChange={handleInputChange}
      />
      <br />
      <label style={{ marginRight: "16px" }}>Company name :</label>
      <select
        style={{ width: "55.8%", marginLeft: '-5px' }}
        name="CompanyName"
        value={formData.CompanyName}
        onChange={handleInputChange}
      >
        <option value="">Select</option>
        <option value="Osbeam IT">Osbeam IT</option>
        <option value="ShawNiks Solutions">ShawNiks Solutions</option>
        {/* Add more options as needed */}
      </select>
    </div>
    <hr style={{ marginTop: 30 }} />

          <div className="form-container">
            <div className="inner-container">
              <h2>CTC</h2>
              <div className="grid-container">
                <div className="grid-item1">Salary Component</div>
                <div className="grid-item2">Amount</div>
                <div className="grid-item3">Per Month</div>
                <div className="grid-item4">Per Annual</div>
                <div className="grid-item5">Basic Salary</div>
                <div className="grid-item6">
                 
                  <input
                   type="text"
                   id="basicSalaryPerMonth"
                   name="BasicSalary"
                   value={formData.BasicSalary}
                   onChange={handleInputChange}
                 />
                </div>
                <div className="grid-item7">
                  <input type="text" id="basicSalaryPerAnnual" />
                </div>
                <div className="grid-item8">Fixed Allowance</div>
                <div className="grid-item9">
                <input
                   type="text"
                   id="FixedAllowancePerMonth"
                   name="FixedAllowance"
                   value={formData.FixedAllowance}
                   onChange={handleInputChange}
                 />
                 
                </div>
                <div className="grid-item10">
                  <input type="text" id="FixedAllowancePerAnnual" />
                </div>
                <div className="grid-item11">Special Allowance</div>
                <div className="grid-item12">
                <input
                   type="text"
                   id="specialallowncePerMonth"
                   name="SpecialAllowance"
                   value={formData.SpecialAllowance}
                   onChange={handleInputChange}
                 />
              
                </div>
                <div className="grid-item13">
                  <input type="text" id="specialallowncePerAnnual" />
                </div>
                <div className="grid-item14">Variable Allowance</div>
                <div className="grid-item15">
                <input
                   type="text"
                   id="variableAllowancePerMonth"
                   name="VeriableAllowance"
                   value={formData.VeriableAllowance}
                   onChange={handleInputChange}
                 />
                </div>
                <div className="grid-item16">
                  <input type="text" id="variableAllowancePerAnnual" />
                </div>
                <div className="grid-item17">
                <p>Deductions</p>
      <div style={{ display: "flex", marginLeft: "30px" }}>
        <div style={{ marginRight: "40px" }}>
          <label>
            PF
            <input
              type="checkbox"
              name="PF"
              checked={formData.PF}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div style={{ marginRight: "40px" }}>
          <label>
            ESI
            <input
              type="checkbox"
              name="ESI"
              checked={formData.ESI}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div style={{ marginRight: "40px" }}>
          <label>
            PT
            <input
              type="checkbox"
              name="PT"
              checked={formData.PT}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            TDS
            <input
              type="checkbox"
              name="TDS"
              checked={formData.TDS}
              onChange={handleInputChange}
            />
          </label>
        </div>
      </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="submit-container">
            <button style={{ float: "left" }}>Back</button>
            <button >Next</button>
          </div>
        </div>
      </TabPane>
      <TabPane tab="Assets" key="3">
        <div className="form-container">
          <div className="inner-container">
            <h2>Joining Kit</h2>
            <label style={{ marginRight: "78px" }}>Notebook :</label>
            <label htmlFor="noteBookYes" style={{ fontSize: "18px" }}>
              Yes
            </label>
            <input
              style={{ marginRight: "62px" }}
              type="radio"
              id="noteBookYes"
              name="NoteBook"
              value="Yes"
              onChange={handleInputChange}
            />
            <label htmlFor="noteBookNo" style={{ fontSize: "18px" }}>
              No
            </label>
            <input
              type="radio"
              id="noteBookNo"
              name="NoteBook"
              value="No"
              onChange={handleInputChange}
            />
            <br />
            <label style={{ marginRight: "75px" }}>Stationery :</label>
            <label htmlFor="stationeryYes" style={{ fontSize: "18px" }}>
              Yes
            </label>
            <input
              style={{ marginRight: "62px" }}
              type="radio"
              id="stationeryYes"
              name="Stationery"
              value="Yes"
              onChange={handleInputChange}
            />
            <label htmlFor="stationeryNo" style={{ fontSize: "18px" }}>
              No
            </label>
            <input
              type="radio"
              id="stationeryNo"
              name="Stationery"
              value="No"
              onChange={handleInputChange}
            />
            <br />
            <label style={{ marginRight: "74px" }}>Joining Kit :</label>
            <label htmlFor="joiningKitYes" style={{ fontSize: "18px" }}>
              Yes
            </label>
            <input
              style={{ marginRight: "62px" }}
              type="radio"
              id="joiningKitYes"
              name="JoiningKit"
              value="Yes"
              onChange={handleInputChange}
            />
            <label htmlFor="joiningKitNo" style={{ fontSize: "18px" }}>
              No
            </label>
            <input
              type="radio"
              id="joiningKitNo"
              name="JoiningKit"
              value="No"
              onChange={handleInputChange}
            />
            <br />
          </div>
          <hr style={{ marginTop: 30 }} />

          <div className="inner-container">
            <h2>Office Asset Allocation</h2>
            <label style={{ marginRight: "12px" }}>Official Mobile no. :</label>
            <input
              style={{ width: "30.5%" }}
              placeholder="official mobile no."
              name="OfficialMobileNumber"
              value={formData.OfficialMobileNumber}
              onChange={handleInputChange}
            />
            <br />
            <label style={{ marginRight: "26px" }}>Mobile IMEI no. :</label>
            <input
              style={{ width: "30.5%" }}
              placeholder="mobile imei no."
              name="MobileIMEINumber"
              value={formData.MobileIMEINumber}
              onChange={handleInputChange}
            />
            <br />
          </div>
        </div>
        <div>
          <div className="submit-container">
            <button style={{ float: "left" }}>Back</button>
            <button >Submit</button>
          </div>
        </div>
      </TabPane>
      <TabPane tab="Documents" key="4">
        <div className="form-container">
          <div className="inner-container">
            <h2>Documents</h2>
            <label style={{ marginRight: "143px" }}>Pan Card. :</label>
            <input style={{ width: "34%" }} placeholder="Pan Card." />
            <button>Upload</button>
            <br />
            <label style={{ marginRight: "126px" }}>Aadhar Card :</label>
            <input style={{ width: "34%" }} placeholder="Aadhar Card" />
            <button>Upload</button>
            <br />
            <label style={{ marginRight: "175px" }}>Photo :</label>
            <button>Upload</button>
            <br />
            <label style={{ marginRight: "115px" }}>Address Proof :</label>
            <input style={{ width: "34%" }} placeholder="Address Proof" />
            <button>Upload</button>
            <br />
            <label style={{ marginRight: "9px" }}>
              Highest Qualification Certificate :
            </label>
            <input style={{ width: "34%" }} placeholder="" />
            <button>Upload</button>
            <br />
            <label style={{ marginRight: "12px" }}>
              Last Company Relieving Letter :
            </label>
            <input type="date" style={{ width: "34%" }} />
            <button>Upload</button>
            <br />
            <label style={{ marginRight: "132px" }}>Bank Details :</label>
            <button>Upload</button>
            <br />
            <label style={{ marginRight: "137px" }}>Bank Name :</label>
            <select style={{ width: "411px" }}>
              <option>Select Bank </option>
              <option>Bank of Mharashtra</option>
            </select>
            <br />
            <label style={{ marginRight: "67px" }}>Account Holder Name :</label>
            <input style={{ width: "34%" }} placeholder="Account Holder Name" />
            <br />
            <label style={{ marginRight: "130px" }}>Account no. :</label>
            <input style={{ width: "34%" }} placeholder="Account no." />
            <br />
            <label style={{ marginRight: "135px" }}>IFSC Code :</label>
            <input style={{ width: "34%" }} placeholder="IFSC Code" />
            <br />
          </div>
        </div>
        <div>
          <div className="submit-container">
          <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </TabPane>
      <TabPane tab="Generate letter" key="5">
        <div className="form-container">
          <div className="inner-container">
            <label style={{ marginRight: "67px" }}>Offer Letter :</label>
            <button>Generate</button>
            <button>Download</button>
            <br />
            <label style={{ marginRight: "19px" }}>Appointment Letter :</label>
            <button>Generate</button>
            <button>Download</button>
            <br />
            <label style={{ marginRight: "89px" }}>ID Card :</label>
            <button>Generate</button>
            <button>Download</button>
            <br />
            <label style={{ marginRight: "41px" }}>Vendor ID Card :</label>
            <button>Generate</button>
            <button>Download</button>
            <br />
            <label style={{ marginRight: "10px" }}>
              Vendor Visiting Card :
            </label>
            <button>Generate</button>
            <button>Download</button>
            <br />
           
            <label style={{ marginRight: "33px", marginLeft: "0px" }}>
              Official Email Id :
            </label>
            <input style={{ width: "30.5%" }} placeholder="official email id" />
            <button className="assets-button">Generate</button>
            <br />
           
          </div>
        </div>
        <div>
          {/* <div className="submit-container">
            <button style={{ float: "left" }}>Back</button>
            <button>Next</button>
          </div> */}
        </div>
      </TabPane>
    </Tabs>
  );
}
