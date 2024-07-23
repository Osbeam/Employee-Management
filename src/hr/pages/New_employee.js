import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Country, State, City } from 'country-state-city';

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
    Position: "",
    ManagedBy: "",
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
    MrMissMrs: "",
    DateOfJoining: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [sameAsAbove, setSameAsAbove] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [subDepartments, setSubDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [managers, setManagers] = useState([]);
  const [currentStates, setCurrentStates] = useState([]);
  const [currentCities, setCurrentCities] = useState([]);
  const [permanentStates, setPermanentStates] = useState([]);
  const [permanentCities, setPermanentCities] = useState([]);
  const [activeTabKey, setActiveTabKey] = useState("1");

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://77.37.45.224:8000/api/department/getDepartments");
        setDepartments(response.data.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    const fetchManagers = async () => {

      try {
        const authToken = localStorage.getItem('jwtoken')
        const response = await axios.get(`http://77.37.45.224:8000/api/user/getTeamLeaders`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          }
        );
        // Ensure the response data is an array and contains the necessary fields
        if (Array.isArray(response.data.data)) {
          setManagers(response.data.data);
        } else {
          console.error("Invalid response format for managers:", response.data);
          setManagers([]);
        }
      } catch (error) {
        console.error("Error fetching managers:", error);
        setManagers([]);
      }
    };

    const statesData = State.getStatesOfCountry('IN');
    setCurrentStates(statesData);
    setPermanentStates(statesData);

    fetchDepartments();
    fetchManagers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSameAsAboveChange = (e) => {
    const { checked } = e.target;
    setSameAsAbove(checked);
    if (checked) {
      setFormData((prevData) => ({
        ...prevData,
        PermanentAddress1: prevData.CurrentAddress1,
        PermanentAddress2: prevData.CurrentAddress2,
        PermanentCity: prevData.CurrentCity,
        PermanentState: prevData.CurrentState,
        PermanentPincode: prevData.CurrentPincode,
      }));
      setPermanentCities(City.getCitiesOfState('IN', formData.CurrentState));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        PermanentAddress1: "",
        PermanentAddress2: "",
        PermanentCity: "",
        PermanentState: "",
        PermanentPincode: "",
      }));
      setPermanentCities([]);
    }
  };

  const handleDepartmentChange = (e) => {
    const departmentId = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      Department: departmentId,
      SubDepartment: "",
      Designation: ""
    }));

    const selectedDepartment = departments.find(dep => dep._id === departmentId);
    if (selectedDepartment) {
      setSubDepartments(selectedDepartment.SubDepartment || []);
      setDesignations([]);
    }
  };

  const handleSubDepartmentChange = async (e) => {
    const subDepartmentId = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      SubDepartment: subDepartmentId,
      Designation: ""
    }));

    try {
      const response = await axios.get(`http://77.37.45.224:8000/api/department/getSubDepartments/${subDepartmentId}`);
      setDesignations(response.data.data.designation || []);
    } catch (error) {
      console.error("Error fetching designations:", error);
    }
  };

  const handleDesignationChange = (e) => {
    const designationId = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      Designation: designationId
    }));
  };

  const handleCurrentStateChange = (e) => {
    const stateCode = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      CurrentState: stateCode,
      CurrentCity: ""
    }));
    setCurrentCities(City.getCitiesOfState('IN', stateCode));
  };

  const handlePermanentStateChange = (e) => {
    const stateCode = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      PermanentState: stateCode,
      PermanentCity: ""
    }));
    setPermanentCities(City.getCitiesOfState('IN', stateCode));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const deductionsArray = [];
      if (formData.PF) deductionsArray.push("PF");
      if (formData.ESI) deductionsArray.push("ESI");
      if (formData.PT) deductionsArray.push("PT");
      if (formData.TDS) deductionsArray.push("TDS");

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
        resetForm();
      }
      console.log("Form submitted successfully!", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Email or mobile number already exists.");
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setSameAsAbove(false);
  };

  const handleTabChange = (key) => {
    setActiveTabKey(key);
  };
  return (
    <Tabs activeKey={activeTabKey} onChange={handleTabChange}>
      <TabPane className="new_emp_tabs" tab="Basic Information" key="1">
        <form className="new-emp-form" onSubmit={handleSubmit}>
          <div className="form-container">
            <h2>Employee Registration Form</h2>
            <p>Basic Information</p>
            <div className="inner-container">
              <label style={{ marginRight: "66px" }}>Full Name :</label>
              <select
                style={{ marginRight: '5px', width: '8%' }}
                name="MrMissMrs"
                value={formData.MrMissMrs}
                onChange={handleInputChange}
              >
                <option>Select title</option>
                <option>Mr</option>
                <option>Miss</option>
                <option>Mrs</option>
              </select>

              <input
                style={{ width: '17%' }}

                type="text"
                name="FirstName"
                value={formData.FirstName}
                onChange={handleInputChange}
                placeholder="First Name"
              />
              <input
                style={{ width: '17%' }}
                type="text"
                name="MiddleName"
                value={formData.MiddleName}
                onChange={handleInputChange}
                placeholder="Middle Name"
              />
              <input
                style={{ width: '17%' }}
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
                Email id :
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
                style={{ marginLeft: '137px', width: '25%' }}
                name="CurrentState"
                value={formData.CurrentState}
                onChange={handleCurrentStateChange}
              >
                <option value="">Select state</option>
                {currentStates.map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </select>

              <select
                style={{ width: '23%', marginLeft: '-50px' }}
                name="CurrentCity"
                value={formData.CurrentCity}
                onChange={handleInputChange}
              >
                <option value="">Select city</option>
                {currentCities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>

              <input
                style={{ width: '13.4%', marginLeft: '-45px' }}
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
                style={{ marginLeft: '137px', width: '25%' }}
                name="PermanentState"
                value={formData.PermanentState}
                onChange={handlePermanentStateChange}
              >
                <option value="">Select state</option>
                {permanentStates.map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </select>
              <select
                style={{ width: '23%', marginLeft: '-50px' }}
                name="PermanentCity"
                value={formData.PermanentCity}
                onChange={handleInputChange}
              >
                <option value="">Select city</option>
                {permanentCities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
              <input
                style={{ width: '13.4%', marginLeft: '-45px' }}
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
                style={{ width: "27%" }}
                name="HighestQualification"
                value={formData.HighestQualification}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="HSC Board">HSC Board</option>
                <option value="SSC Board">SSC Board</option>
                <option value="Diploma">Diploma</option>
                <option value="Engineering">Engineering</option>
                <option value="PhD">PhD</option>
              </select>
              <label style={{ marginRight: "113px", marginLeft: "-30px" }}>Year :</label>
              <select
                style={{ width: "26%" }}
                name="Year"
                value={formData.Year}
                onChange={handleInputChange}
              >
                <option value="">Select year</option>
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
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
            <div className="first-tab-next-btn">
              <button type="button" onClick={() => handleTabChange("2")}>Next</button>
            </div>
          </div>
        </form>
      </TabPane>
      <TabPane tab="Employee Structure" key="2">
        <div className="form-container">
          <div className="inner-container">
            <h2>Job Profile</h2>

            <label style={{ marginRight: "42px", marginLeft: "0px" }}>Department:</label>
            <select
              style={{ width: '20%' }}
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
              style={{ width: '20%' }}
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

            <label style={{ marginRight: "42px" }}>Designation:</label>
            <select
              style={{ width: '20%' }}
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

            <label style={{ marginRight: "86px" }}>Position :</label>
            <select
              style={{ width: "20%" }}
              name="Position"
              value={formData.Position}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="Boss">Boss</option>
              <option value="Manager">Manager</option>
              <option value="TeamLeader">TeamLeader</option>
              <option value="None">None</option>
            </select>

            <br />

            <label style={{ marginRight: "33px" }}>Managed By :</label>
            <select
              style={{ width: "20%" }}
              name="ManagedBy"
              value={formData.ManagedBy || ''}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value='null'>None</option>
              {managers.map((manager) => (
                <option key={manager._id} value={manager._id}>
                  {manager.FirstName} {manager.LastName}
                </option>
              ))}
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
              <option value="Osbeam IT Pvt Ltd">Osbeam IT Pvt Ltd</option>
              <option value="Shaw Associates">Shaw Associates</option>
              <option value="ShawNiks Solutions Pvt Ltd">ShawNiks Solutions Pvt Ltd</option>
              <option value="Damaru Properties">Damaru Properties</option>
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
              style={{ width: "20%" }}
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

          <div>
            <div className="submit-container">
              <button type="button" onClick={() => handleTabChange("1")}>Back</button>
              <button type="button" onClick={() => handleTabChange("3")}>Next</button>
            </div>
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
            <button type="button" onClick={() => handleTabChange("2")}>Back</button>
            <button type="button" onClick={() => handleTabChange("4")}>Next</button>
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
            <label style={{ marginRight: "130px" }}>Bank Name :</label>
            <input
              name="BankName"
              value={formData.BankName}
              onChange={handleInputChange}
              placeholder="Enter Bank Name"
              style={{ width: "34%" }}
            />

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
            <button type="button" onClick={() => handleTabChange("3")}>Back</button>

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
