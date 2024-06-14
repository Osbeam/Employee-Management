import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function New_employee() {
  const initialFormData = {
    FirstName: "",
    MiddleName: "",
    LastName: "",
    MobileNumber: "",
    EmailId: "",
    BloodGroup: "",
    CurrentAddress1: "",
    CurrentAddress2: "",
    CurrentCity: "",
    CurrentState: "",
    CurrentPincode: "",
    PermanentAddress1: "",
    PermanentAddress2: "",
    PermanentCity: "",
    PermanentState: "",
    PermanentPincode: "",
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
    VeriableAllowance: "",
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
    PF: false,
    ESI: false,
    PT: false,
    TDS: false,
    Password: "",
    Role: [],
  };

  const [formData, setformData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setformData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const [sameAsAbove, setSameAsAbove] = useState(false);
  const handleSameAsAboveChange = (e) => {
    const { checked } = e.target;
    setSameAsAbove(checked);
    if (checked) {
      setformData((prevData) => ({
        ...prevData,
        PermanentAddress1: prevData.CurrentAddress1,
        PermanentAddress2: prevData.CurrentAddress2,
        PermanentCity: prevData.CurrentCity,
        PermanentState: prevData.CurrentState,
        PermanentPincode: prevData.CurrentPincode,
      }));
    } else {
      setformData((prevData) => ({
        ...prevData,
        PermanentAddress1: "",
        PermanentAddress2: "",
        PermanentCity: "",
        PermanentState: "",
        PermanentPincode: "",
      }));
    }
  };

  const validateFormData = () => {
    const requiredFields = [
      "FirstName",
      "MiddleName",
      "LastName",
      "MobileNumber",
      "EmailId",
      "BloodGroup",
      "CurrentAddress1",
      "CurrentAddress2",
      "CurrentCity",
      "CurrentState",
      "CurrentPincode",
      "PermanentAddress1",
      "PermanentAddress2",
      "PermanentCity",
      "PermanentState",
      "PermanentPincode",
      "HighestQualification",
      "Year",
      "TotalExperience",
      "LastCompanyName",
      "JoiningDate",
      "RelievingDate",
      // "EmployeeID",
      "Department",
      "SubDepartment",
      "Designation",
      "ReportingTo",
      "ManagerName",
      "CompanyName",
      "BasicSalary",
      "FixedAllowance",
      "SpecialAllowance",
      "VeriableAllowance",
      "NoteBook",
      "Stationery",
      "JoiningKit",
      "OfficialMobileNumber",
      "MobileIMEINumber",
      // "PanCard",
      // "AadharCard",
      // "Photo",
      // "AddressProof",
      // "HighestQuaCertificate",
      // "LastComRellievingLetter",
      // "BankDetails",
      "BankName",
      "AccountHolderName",
      "AccountNumber",
      "IFSCCode",
      "Password",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        return false;
      }
    }
    return true;
  };

  const resetForm = () => {
    setformData(initialFormData);
    setSameAsAbove(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFormData()) {
      toast.error("Please fill all the fields.");
      return;
    }

    try {
      const deductionsArray = [];
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

      const updatedFormData = {
        ...formData,
        CurrentAddress: {
          Caddress1: formData.CurrentAddress1,
          Caddress2: formData.CurrentAddress2,
          City1: formData.CurrentCity,
          State1: formData.CurrentState,
          Pincode1: formData.CurrentPincode,
        },
        PermanentAddress: {
          Paddress1: formData.PermanentAddress1,
          Paddress2: formData.PermanentAddress2,
          City2: formData.PermanentCity,
          State2: formData.PermanentState,
          Pincode2: formData.PermanentPincode,
        },
        Deductions: deductionsArray,
      };

      const response = await axios.post(
        "http://77.37.45.224:8000/api/user/employeeInfo",
        updatedFormData
      );

      if (response.status === 200) {
        toast.success("Employee registered successfully!");
        resetForm(); // Reset form on successful submission
      }
      console.log("Form submitted successfully!", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Email or mobile number already exists.");
    }
  };

  const [departments, setDepartments] = useState([]);
  const [subDepartments, setSubDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);

  useEffect(() => {
    // Fetch departments
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://77.37.45.224:8000/api/department/getDepartments");
        setDepartments(response.data.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  const handleDepartmentChange = (e) => {
    const departmentId = e.target.value;
    setformData((prevData) => ({
      ...prevData,
      Department: departmentId,
      SubDepartment: "", // Clear sub-department selection
      Designation: "" // Clear designation selection
    }));

    const selectedDepartment = departments.find(dep => dep._id === departmentId);
    if (selectedDepartment) {
      setSubDepartments(selectedDepartment.SubDepartment || []);
      setDesignations([]);
    }
  };

  const handleSubDepartmentChange = async (e) => {
    const subDepartmentId = e.target.value;
    setformData((prevData) => ({
      ...prevData,
      SubDepartment: subDepartmentId,
      Designation: "" // Clear designation selection
    }));

    try {
      const response = await axios.get(`http://77.37.45.224:8000/api/department/getDesignation?subDepartment=${subDepartmentId}`);
      setDesignations(response.data.data || []);
    } catch (error) {
      console.error("Error fetching designations:", error);
    }
  };

  const handleDesignationChange = (e) => {
    const designationId = e.target.value;
    setformData((prevData) => ({
      ...prevData,
      Designation: designationId
    }));
  };

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Basic Information" key="1">
        <form className="new-emp-form" onSubmit={handleSubmit}>
          <div className="form-container">
            <h2>Employee Registration Form</h2>
            <p>Basic Information</p>
            <div className="inner-container">
              <label style={{ marginRight: "66px" }}>Full Name :</label>
              <select style={{ marginRight: '5px' }}>
                <option>Select title</option>
                <option>Mr</option>
                <option>Miss</option>
                <option>Mrs</option>
              </select>

              <input
                style={{ width: '202px' }}
                type="text"
                name="FirstName"
                value={formData.FirstName}
                onChange={handleInputChange}
                placeholder="First Name"
              />
              <input
                style={{ width: '202px' }}
                type="text"
                name="MiddleName"
                value={formData.MiddleName}
                onChange={handleInputChange}
                placeholder="Middle Name"
              />
              <input
                style={{ width: '202px' }}
                type="text"
                name="LastName"
                value={formData.LastName}
                onChange={handleInputChange}
                placeholder="Last Name"
              />
              <br />
              <label style={{ marginRight: "59px" }}>Mobile no. :</label>
              <input
                type="number"
                style={{ width: "26%" }}
                placeholder="Mobile no."
                name="MobileNumber"
                value={formData.MobileNumber}
                onChange={handleInputChange}
              />
              <label style={{ marginRight: "15px", marginLeft: "23px" }}>
                EmailId id :
              </label>
              <input
                type="Email"
                style={{ width: "26%" }}
                placeholder=" Email id"
                name="EmailId"
                value={formData.EmailId}
                onChange={handleInputChange}
              />
              <br />
              <label style={{ marginRight: "51px" }}>Blood Group :</label>
              <select
                name="BloodGroup"
                value={formData.BloodGroup}
                onChange={handleInputChange}
                placeholder="Blood group"
                required
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
                placeholder="Current address line 1"
                name="CurrentAddress1"
                value={formData.CurrentAddress1}
                onChange={handleInputChange}
              />
              <br />
              <input
                style={{ marginLeft: "137px", width: "62%" }}
                placeholder="Current address line 2"
                name="CurrentAddress2"
                value={formData.CurrentAddress2}
                onChange={handleInputChange}
              />
              <br />
              <select
                style={{ marginLeft: "137px" }}
                name="CurrentCity"
                value={formData.CurrentCity}
                onChange={handleInputChange}
              >
                <option value="">Select city</option>
                <option value="Pune">Pune</option>
                <option value="Panaji">Panaji</option>
              </select>
              <select
                name="CurrentState"
                value={formData.CurrentState}
                onChange={handleInputChange}
              >
                <option value="">Select state</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Goa">Goa</option>
              </select>
              <input
                placeholder="Pincode"
                type="number"
                name="CurrentPincode"
                value={formData.CurrentPincode}
                onChange={handleInputChange}
              />
              <br />

              <label style={{ marginRight: "26px" }}>Same as above :</label>
              <input
                type="checkbox"
                checked={sameAsAbove}
                onChange={handleSameAsAboveChange}
              />
              <br />
              <label>Permanent Address :</label>
              <input
                style={{ width: "62%" }}
                placeholder="Permanent address line 1"
                name="PermanentAddress1"
                value={formData.PermanentAddress1}
                onChange={handleInputChange}
              />
              <br />
              <input
                style={{ marginLeft: "137px", width: "62%" }}
                placeholder="Permanent address line 2"
                name="PermanentAddress2"
                value={formData.PermanentAddress2}
                onChange={handleInputChange}
              />
              <br />
              <select
                style={{ marginLeft: "137px" }}
                name="PermanentCity"
                value={formData.PermanentCity}
                onChange={handleInputChange}
              >
                <option value="">Select city</option>
                <option value="Pune">Pune</option>
                <option value="Panaji">Panaji</option>
              </select>
              <select
                name="PermanentState"
                value={formData.PermanentState}
                onChange={handleInputChange}
              >
                <option value="">Select state</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Goa">Goa</option>
              </select>
              <input
                placeholder="Pincode"
                type="number"
                name="PermanentPincode"
                value={formData.PermanentPincode}
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
              </select>
              <br />
              <label style={{ marginRight: "35px" }}>Total Experience :</label>
              <input
                style={{ width: "27%" }}
                type="number"
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
                type="number"
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
                type="number"
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
              {/* <button type="submit">Next</button> */}
            </div>
          </div>
        </form>
      </TabPane>
      <TabPane tab="Employee Structure" key="2">
        <div className="form-container">
          <div className="inner-container">
            <h2>Job Profile</h2>
            <label style={{ marginRight: "38px", marginLeft: "0px" }}>
              Department:
            </label>
            <select
              style={{ width: '236px' }}
              onChange={handleDepartmentChange}
              value={formData.Department}
            >
              <option value="">Select Department</option>
              {departments && departments.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.name}
                </option>
              ))}
            </select>
            <label style={{ marginRight: "39px" }}>Sub Department:</label>
            <select
              style={{ width: '236px' }}
              onChange={handleSubDepartmentChange}
              value={formData.SubDepartment}
            >
              <option value="">Select Sub-Department</option>
              {subDepartments && subDepartments.map((subDepartment) => (
                <option key={subDepartment._id} value={subDepartment._id}>
                  {subDepartment.name}
                </option>
              ))}
            </select>
            <br />
            <label style={{ marginRight: "37px" }}>Designation:</label>
            <select
              style={{ width: '236px' }}
              onChange={handleDesignationChange}
              value={formData.Designation}
            >
              <option value="">Select Designation</option>
              {designations && designations.map((designation) => (
                <option key={designation._id} value={designation._id}>
                  {designation.name}
                </option>
              ))}
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
            </select>
            <label style={{ marginRight: "52px" }}>Joining Date :</label>
            <input
              type="date"
              style={{ width: "20%" }}
              placeholder="Joining Date."
              name="DateOfJoining"
              value={formData.DateOfJoining}
              onChange={handleInputChange}
            />
            <br />
            <label style={{ marginRight: "16px" }}>Company name :</label>
            <select
              style={{ width: "20%", marginLeft: '-5px' }}
              name="CompanyName"
              value={formData.CompanyName}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="Osbeam IT">Osbeam IT</option>
              <option value="ShawNiks Solutions">ShawNiks Solutions</option>
            </select>
            <label style={{ marginRight: '108px' }}>Role :</label>
            <select
              name='Role'
              style={{ width: "20.00%" }}
              value={formData.Role}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="Other">Other</option>
              <option value="Admin">Admin</option>
              <option value="HR">HR</option>
            </select>
            <br />
            <label style={{ marginRight: "43px" }}>Password :</label>
            <input
              type="text"
              placeholder="Enter password"
              name='Password'
              style={{ width: "56.20%" }}
              value={formData.Password}
              onChange={handleInputChange}
            />
            <br />
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
                    type="number"
                    id="basicSalaryPerMonth"
                    name="BasicSalary"
                    value={formData.BasicSalary}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid-item7">
                  <input type="text" id="basicSalaryPerAnnual" disabled />
                </div>
                <div className="grid-item8">Fixed Allowance</div>
                <div className="grid-item9">
                  <input
                    type="number"
                    id="FixedAllowancePerMonth"
                    name="FixedAllowance"
                    value={formData.FixedAllowance}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid-item10">
                  <input type="text" id="FixedAllowancePerAnnual" disabled />
                </div>
                <div className="grid-item11">Special Allowance</div>
                <div className="grid-item12">
                  <input
                    type="number"
                    id="specialallowncePerMonth"
                    name="SpecialAllowance"
                    value={formData.SpecialAllowance}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid-item13">
                  <input type="text" id="specialallowncePerAnnual" disabled />
                </div>
                <div className="grid-item14">Variable Allowance</div>
                <div className="grid-item15">
                  <input
                    type="number"
                    id="variableAllowancePerMonth"
                    name="VeriableAllowance"
                    value={formData.VeriableAllowance}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid-item16">
                  <input type="text" id="variableAllowancePerAnnual" disabled />
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
            {/* <button style={{ float: "left" }}>Back</button>
            <button >Next</button> */}
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
              type="number"
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
            {/* <button style={{ float: "left" }}>Back</button>
            <button >Submit</button> */}
          </div>
        </div>
      </TabPane>
      <TabPane tab="Documents" key="4">
        <div className="form-container">
          <div className="inner-container">
            <h2>Documents</h2>
            <label style={{ marginRight: "147px" }}>Pan Card :</label>
            <input
              type="file"
              name="PanCard"
              onChange={handleInputChange}
              style={{ width: "34%" }}
            />
            <br />
            <label style={{ marginRight: "126px" }}>Aadhar Card :</label>
            <input
              type="file"
              name="AadharCard"
              onChange={handleInputChange}
              style={{ width: "34%" }}
            />
            <br />
            <label style={{ marginRight: "169px" }}>Photo :</label>
            <input
              type="file"
              name="Photo"
              onChange={handleInputChange}
              style={{ width: "34%" }}
            />
            <br />
            <label style={{ marginRight: "116px" }}>Address Proof :</label>
            <input
              type="file"
              name="AddressProof"
              onChange={handleInputChange}
              style={{ width: "34%" }}
            />
            <br />
            <label style={{ marginRight: "9px" }}>
              Highest Qualification Certificate :
            </label>
            <input
              type="file"
              name="HighestQuaCertificate"
              onChange={handleInputChange}
              style={{ width: "34%" }}
            />
            <br />
            <label style={{ marginRight: "12px" }}>
              Last Company Relieving Letter :
            </label>
            <input
              type="file"
              name="LastComRellievingLetter"
              onChange={handleInputChange}
              style={{ width: "34%" }}
            />
            <br />
            <label style={{ marginRight: "125px" }}>Bank Details :</label>
            <input
              type="file"
              name="BankDetails"
              onChange={handleInputChange}
              style={{ width: "34%" }}
            />
            <br />
            <label style={{ marginRight: "137px" }}>Bank Name :</label>
            <select
              name="BankName"
              value={formData.BankName}
              onChange={handleInputChange}
              style={{ width: "404px" }}
            >
              <option value="">Select Bank</option>
              <option value="Bank of Maharashtra">Bank of Maharashtra</option>
            </select>
            <br />
            <label style={{ marginRight: "67px" }}>
              Account Holder Name :
            </label>
            <input
              type="text"
              name="AccountHolderName"
              value={formData.AccountHolderName}
              onChange={handleInputChange}
              style={{ width: "34%" }}
              placeholder="Account Holder Name"
            />
            <br />
            <label style={{ marginRight: "130px" }}>Account no. :</label>
            <input
              type="number"
              name="AccountNumber"
              value={formData.AccountNumber}
              onChange={handleInputChange}
              style={{ width: "34%" }}
              placeholder="Account no."
            />
            <br />
            <label style={{ marginRight: "135px" }}>IFSC Code :</label>
            <input
              type="text"
              name="IFSCCode"
              value={formData.IFSCCode}
              onChange={handleInputChange}
              style={{ width: "34%" }}
              placeholder="IFSC Code"
            />
            <br />
          </div>
        </div>
        <div>
          <div className="submit-container">
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
        <ToastContainer />
      </TabPane>
      {/* <TabPane tab="Generate letter" key="5">
        <div className="form-container">
          <div className="inner-container">
            <label style={{ marginRight: "19px" }}>Appointment Letter :</label>
            <button onClick={handleGenerateClick}>Generate</button>
            {showOfferLetter && employee && <Offer_letter employee={employee} />}
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
              Official  Email Id :
            </label>
            <input style={{ width: "30.5%" }} placeholder="official  EmailId id" />
            <button className="assets-button">Generate</button>
            <br />

          </div>
        </div>
      </TabPane> */}
    </Tabs>
  );
}