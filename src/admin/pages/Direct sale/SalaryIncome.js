import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Form, Input, Tabs, Button, Select, DatePicker } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";

const { TabPane } = Tabs;
const { Option } = Select;

const SalaryIncome = () => {
  const [activeKey, setActiveKey] = useState("1");
  const tabsRef = useRef(null);
  const { dataId } = useParams();
  const { userId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    GrossSalaryPerMonth: "",
    NetSalaryPerMonth: "",
    // ... other direct properties
    SalaryDetails: [],
    BankDetails: [],
    Analysis: [],
    Score: [],
  });

  useEffect(() => {
    console.log("Current Data State:", data);
  }, [data]);

  // Debugging log
  console.log("data State:", data);

  const handleInputs = (fieldName, value) => {
    setData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleInputsSalary = (fieldName, value, index) => {
    const updatedSalaryDetails = [...data.SalaryDetails];
    updatedSalaryDetails[index] = {
      ...updatedSalaryDetails[index],
      [fieldName]: value,
    };
    setData({ ...data, SalaryDetails: updatedSalaryDetails });
  };

  const handleInputsAnalysis = (fieldName, value, index) => {
    setData((prevdata) => {
      const updatedAnalysis = Array.isArray(prevdata.Analysis)
        ? [...prevdata.Analysis]
        : [];
      if (updatedAnalysis[index]) {
        updatedAnalysis[index] = {
          ...updatedAnalysis[index],
          [fieldName]: value,
        };
      }
      return { ...prevdata, Analysis: updatedAnalysis };
    });
  };

  const handleInputsBankDetails = (fieldName, value, index) => {
    const updatedBankDetails = [...data.BankDetails];
    updatedBankDetails[index] = {
      ...updatedBankDetails[index],
      [fieldName]: value,
    };
    setData({ ...data, BankDetails: updatedBankDetails });
  };

  const handleNext = () => {
    const nextKey = activeKey === "1" ? "2" : "1";
    setActiveKey(nextKey);
    tabsRef.current?.scrollIntoView();
  };

  const addNewRow = () => {
    setData((prevdata) => ({
      ...prevdata,
      SalaryDetails: [
        ...prevdata.SalaryDetails,
        {
          Month: "",
          GrossSalary: "",
          NetSalary: "",
          OtherIncome: "",
          TotalIncome: "",
          PaymentMode: "",
          DateOfPayment: "",
        },
      ],
    }));
  };

  const addNewRowToSecondTable = () => {
    setData((prevdata) => ({
      ...prevdata,
      BankDetails: [
        ...prevdata.BankDetails,
        {
          ABB: "",
          DR1: "",
          DR2: "",
          DR3: "",
          DR4: "",
          DR5: "",
        },
      ],
    }));
  };

  const addNewRowToAnalysis = () => {
    setData((prevdata) => ({
      ...prevdata,
      Analysis: [
        ...(Array.isArray(prevdata.Analysis) ? prevdata.Analysis : []),
        {
          CibilAnalysis: "",
          Bounce: "",
          Enquiry: "",
          RecentFunding: "",
        },
      ],
    }));
  };

  const handleInputsScore = (fieldName, value, index) => {
    setData((prevdata) => {
      const updatedScore = Array.isArray(prevdata.Score)
        ? [...prevdata.Score]
        : [];
      if (updatedScore[index]) {
        updatedScore[index] = { ...updatedScore[index], [fieldName]: value };
      }
      return { ...prevdata, Score: updatedScore };
    });
  };

  const addNewRowToScore = () => {
    setData((prevdata) => ({
      ...prevdata,
      Score: [
        ...(Array.isArray(prevdata.Score) ? prevdata.Score : []),
        {
          CibilScore: "",
          PayOut: "",
          Settelement1Yr: "",
          Settelement2Yr: "",
        },
      ],
    }));
  };
  
  useEffect(() => {
    const fetchSalaryIncomeData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://77.37.45.224:8000/api/salaryIncome/GetAllSalaryIncome?currentPage=1`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtoken")}`,
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          console.log("API Response:", result);

          const salaryIncomeData = result.data || [];
          const selectedRecord = salaryIncomeData.find(
            (item) => item._id === dataId
          );

          if (selectedRecord) {
            console.log("Found Record:", selectedRecord);
            setData(selectedRecord); // Populate the form with the selected record
          } else {
            console.error("Record not found with _id:", dataId);
          }
        } else {
          console.error("Error fetching salary income data");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSalaryIncomeData();
  }, [dataId]);

  const handleEdit = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `http://77.37.45.224:8000/api/salaryIncome/EditSalaryData`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtoken")}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        toast.success("Employee updated successfully");
        setTimeout(() => navigate(`/admin/${userId}/directsales`), 1000);
      } else {
        toast.error("Unable to update employee");
      }
    } catch (error) {
      toast.error("Unable to update employee");
      console.error("Error updating employee:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectChange = (value) => {
    handleInputs("DeductionFromSalary", value);
  };
  const handleSelectChangeForm16 = (value) => {
    handleInputs("Form16", value);
  };
  const handleSelectChangeForm16Last2Year = (value) => {
    handleInputs("LastTwoYearsForm16", value);
  };
  const handleSelectChangeOtherIncomeSource = (value) => {
    handleInputs("AnotherSourceOfIncome", value);
  };
  const handleSelectChangeOtherSourceIncome = (value) => {
    handleInputs("OtherSourceOfIncome", value);
  };
  const handleSelectChangeIncomType = (value) => {
    handleInputs("IncomeType", value);
  };
  const handleSelectChangePFAapplicability = (value) => {
    handleInputs("PFApplicability", value);
  };
  const handleSelectChangeForm26AS = (value) => {
    handleInputs("Form26AS", value);
  };
  const handleSelectChangeSex = (value) => {
    handleInputs("Sex", value);
  };
  const handleSelectChangeMaritalStatus = (value) => {
    handleInputs("MaritalStatus", value);
  };

  return (
    <>
      <div className="directlead-header">
        <div className="dl-heading">
          <h2>Income Type - Salary Income</h2>
        </div>
      </div>
      <div className="breadcrumb">
        <a href="#" onClick={() => navigate(`/admin/${userId}/directsales`)}>
          Direct Sales
        </a>{" "}
        &gt; <span>Salary Income</span>
      </div>
      <div className="dl-container">
        <Tabs ref={tabsRef} activeKey={activeKey} onChange={setActiveKey}>
          <TabPane
            style={{ marginTop: "50px" }}
            tab="Salary Income Form 1"
            key="1"
          >
            <Form layout="vertical">
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item
                    label="Gross Salary Per Month"
                    className="FormItem"
                  >
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="GrossSalaryPerMonth"
                      value={data.GrossSalaryPerMonth || ""}
                      onChange={(e) =>
                        handleInputs("GrossSalaryPerMonth", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Net Salary Per Month" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="NetSalaryPerMonth"
                      value={data.NetSalaryPerMonth || ""}
                      onChange={(e) =>
                        handleInputs("NetSalaryPerMonth", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item
                    label="What are the deductions from your salary?"
                    className="FormItem"
                  >
                    <Select
                      mode="multiple"
                      placeholder="Please select"
                      value={data.DeductionFromSalary || []}
                      onChange={handleSelectChange}
                      autoComplete="off"
                      name="DeductionFromSalary"
                    >
                      <Option value="ProvidentFund">Provident Fund</Option>
                      <Option value="ProfessionalTax">Professional Tax</Option>
                      <Option value="ESI">ESI</Option>
                      <Option value="TDS">TDS</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Is Form 16 Available?" className="FormItem">
                    <Select
                      placeholder="Select"
                      value={data.Form16 || ""}
                      onChange={(value) =>
                        handleSelectChangeForm16(value, "Form16")
                      }
                      autoComplete="off"
                      name="Form16"
                    >
                      <Option value="Yes">Yes</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item
                    label="If Yes, Do you have Form 16 for last 2 years?"
                    className="FormItem"
                  >
                    <Select
                      placeholder="Please select"
                      value={data.LastTwoYearsForm16 || []}
                      onChange={handleSelectChangeForm16Last2Year}
                      autoComplete="off"
                      name="LastTwoYearsForm16"
                    >
                      <Option value="Yes">Yes</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}></Col>
              </Row>

              <hr style={{ marginBottom: "50px" }} />

              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Name of the company?" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="CompanyName"
                      value={data.CompanyName || ""}
                      onChange={(e) =>
                        handleInputs("CompanyName", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Date of Joining" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      type="Date"
                      name="DateOfJoining"
                      value={data.DateOfJoining || ""}
                      onChange={(e) =>
                        handleInputs("DateOfJoining", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item
                    label="Your company is formed as?"
                    className="FormItem"
                  >
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="CompanyFormedAs"
                      value={data.CompanyFormedAs || ""}
                      onChange={(e) =>
                        handleInputs("CompanyFormedAs", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Your Company belongs from Industry?"
                    className="FormItem"
                  >
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="BelongFromIndustry"
                      value={data.BelongFromIndustry || ""}
                      onChange={(e) =>
                        handleInputs("BelongFromIndustry", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Previous Company Name" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="PreviousCompanyName"
                      value={data.PreviousCompanyName || ""}
                      onChange={(e) =>
                        handleInputs("PreviousCompanyName", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Total Work Experience" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="TotalWorkExperience"
                      value={data.TotalWorkExperience || ""}
                      onChange={(e) =>
                        handleInputs("TotalWorkExperience", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item
                    label="Do you have another source of Income?"
                    className="FormItem"
                  >
                    <Select
                      placeholder="Please select"
                      value={data.AnotherSourceOfIncome || []}
                      onChange={handleSelectChangeOtherIncomeSource}
                      autoComplete="off"
                      name="AnotherSourceOfIncome"
                    >
                      <Option value="Yes">Yes</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Other sources of Income?"
                    className="FormItem"
                  >
                    <Select
                      placeholder="Please select"
                      value={data.OtherSourceOfIncome || []}
                      onChange={handleSelectChangeOtherSourceIncome}
                      autoComplete="off"
                      name="OtherSourceOfIncome"
                    >
                      <Option value="">Select</Option>
                      <Option value="BusinessIncome">Business Income</Option>
                      <Option value="ProfessionalIncome">
                        Professional Income
                      </Option>
                      <Option value="Other">Other</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <div className="dl-btn">
                <button type="button" onClick={handleNext}>
                  Next
                </button>
              </div>
            </Form>
          </TabPane>

          <TabPane
            style={{ marginTop: "50px" }}
            tab="Salary Income Form 2"
            key="2"
          >
            <Form layout="vertical">
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Lead Id" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="LeadId"
                      value={data.LeadId || ""}
                      onChange={(e) => handleInputs("LeadId", e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Lead Date" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      type="Date"
                      name="LeadDate"
                      value={data.LeadDate || ""}
                      onChange={(e) => handleInputs("LeadDate", e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Sourcing Channel" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="SourcingChanel"
                      value={data.SourcingChanel || ""}
                      onChange={(e) =>
                        handleInputs("SourcingChanel", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Source Name" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="SourceName"
                      value={data.SourceName || ""}
                      onChange={(e) =>
                        handleInputs("SourceName", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Loan Type" className="FormItem">
                    <Input
                      placeholder="Enter Loan Type"
                      autoComplete="off"
                      name="LoanType"
                      value={data.LoanType || ""}
                      onChange={(e) => handleInputs("LoanType", e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Loan Amount" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="LoanAmount"
                      value={data.LoanAmount || ""}
                      onChange={(e) =>
                        handleInputs("LoanAmount", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Lead Name" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="LeadName"
                      value={data.LeadName || ""}
                      onChange={(e) => handleInputs("LeadName", e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Mobile Number" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="MobileNo1"
                      value={data.MobileNo1 || ""}
                      onChange={(e) =>
                        handleInputs("MobileNo1", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Email Id" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="EmailId"
                      value={data.EmailId || ""}
                      onChange={(e) => handleInputs("EmailId", e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Date of Birth" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      type="Date"
                      name="DateOfBirth"
                      value={data.DateOfBirth || ""}
                      onChange={(e) =>
                        handleInputs("DateOfBirth", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Age" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="Age"
                      value={data.Age || ""}
                      onChange={(e) => handleInputs("Age", e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Sex" className="FormItem">
                    <Select
                      placeholder="Select"
                      value={data.Sex || ""}
                      onChange={(value) => handleSelectChangeSex(value, "Sex")}
                      autoComplete="off"
                      name="Sex"
                    >
                      <Option value="Male">Male</Option>
                      <Option value="Female">Female</Option>
                      <Option value="Other">Other</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Marital Status" className="FormItem">
                    <Select
                      placeholder="Select"
                      value={data.MaritalStatus || ""}
                      onChange={(value) =>
                        handleSelectChangeMaritalStatus(value, "MaritalStatus")
                      }
                      autoComplete="off"
                      name="MaritalStatus"
                    >
                      <Option value="Married">Married</Option>
                      <Option value="Un-Married">Un-Married</Option>
                      <Option value="Other">Other</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Residence Type" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="ResidenceType"
                      value={data.ResidenceType || ""}
                      onChange={(e) =>
                        handleInputs("ResidenceType", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Residence City" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="ResidenceCity"
                      value={data.ResidenceCity || ""}
                      onChange={(e) =>
                        handleInputs("ResidenceCity", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={24}>
                  <Form.Item label="Permanent Address" className="FormItemAdd">
                    {/* <Input placeholder="Please enter" style={{ marginBottom: '15px' }} /> */}
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="PermanentAddress"
                      value={data.PermanentAddress || ""}
                      onChange={(e) =>
                        handleInputs("PermanentAddress", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={8}>
                  <Form.Item label="City " className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="PCity"
                      value={data.PCity || ""}
                      onChange={(e) => handleInputs("PCity", e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="State" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="PState"
                      value={data.PState || ""}
                      onChange={(e) => handleInputs("PState", e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Pincode" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="PPinCode"
                      value={data.PPinCode || ""}
                      onChange={(e) => handleInputs("PPinCode", e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <hr style={{ marginBottom: "35px" }} />
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Income Type" className="FormItem">
                    <Select
                      placeholder="Select"
                      value={data.IncomeType || ""}
                      onChange={(value) =>
                        handleSelectChangeIncomType(value, "IncomeType")
                      }
                      autoComplete="off"
                      name="IncomeType"
                    >
                      <Option value="BusinessIncome">Business Income</Option>
                      <Option value="ProfessionalIncome">
                        Professional Income
                      </Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Organization Name" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="OrganizationName"
                      value={data.OrganizationName || ""}
                      onChange={(e) =>
                        handleInputs("OrganizationName", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Designation" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="Designation"
                      value={data.Designation || ""}
                      onChange={(e) =>
                        handleInputs("Designation", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Formation Type" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="FormationType"
                      value={data.FormationType || ""}
                      onChange={(e) =>
                        handleInputs("FormationType", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Industry Type" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="IndustryType"
                      value={data.IndustryType || ""}
                      onChange={(e) =>
                        handleInputs("IndustryType", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Mobile Number" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="MobileNo1"
                      value={data.MobileNo1 || ""}
                      onChange={(e) =>
                        handleInputs("MobileNo1", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Current Experience" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="CurrentExperience"
                      value={data.CurrentExperience || ""}
                      onChange={(e) =>
                        handleInputs("CurrentExperience", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Experience Proof" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="ExperienceProof"
                      value={data.ExperienceProof || ""}
                      onChange={(e) =>
                        handleInputs("ExperienceProof", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Dated" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      type="Date"
                      name="Dated"
                      value={data.Dated || ""}
                      onChange={(e) => handleInputs("Dated", e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="PF Applicability" className="FormItem">
                    <Select
                      placeholder="Select"
                      value={data.PFApplicability || ""}
                      onChange={(value) =>
                        handleSelectChangePFAapplicability(
                          value,
                          "PFApplicability"
                        )
                      }
                      autoComplete="off"
                      name="PFApplicability"
                    >
                      <Option value="Yes">Yes</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Form 16/ 26AS" className="FormItem">
                    <Select
                      placeholder="Select"
                      value={data.Form26AS || ""}
                      onChange={(value) =>
                        handleSelectChangeForm26AS(value, "Form26AS")
                      }
                      autoComplete="off"
                      name="Form26AS"
                    >
                      <Option value="Yes">Yes</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <hr style={{ marginBottom: "35px" }} />

              <table>
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Gross Salary</th>
                    <th>Net Salary</th>
                    <th>Other Income</th>
                    <th>Total Income</th>
                    <th>Payment Mode</th>
                    <th>Date of Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {data.SalaryDetails && data.SalaryDetails.length > 0 ? (
                    data.SalaryDetails.map((detail, index) => (
                      <tr key={index}>
                        <td>
                          <Input
                            placeholder="Please enter"
                            autoComplete="off"
                            name="Month"
                            value={detail.Month || ""}
                            onChange={(e) =>
                              handleInputsSalary("Month", e.target.value, index)
                            }
                          />
                        </td>
                        <td>
                          <Input
                            placeholder="Please enter"
                            autoComplete="off"
                            name="GrossSalary"
                            value={detail.GrossSalary || ""}
                            onChange={(e) =>
                              handleInputsSalary(
                                "GrossSalary",
                                e.target.value,
                                index
                              )
                            }
                          />
                        </td>
                        <td>
                          <Input
                            placeholder="Please enter"
                            autoComplete="off"
                            name="NetSalary"
                            value={detail.NetSalary || ""}
                            onChange={(e) =>
                              handleInputsSalary(
                                "NetSalary",
                                e.target.value,
                                index
                              )
                            }
                          />
                        </td>
                        <td>
                          <Input
                            placeholder="Please enter"
                            autoComplete="off"
                            name="OtherIncome"
                            value={detail.OtherIncome || ""}
                            onChange={(e) =>
                              handleInputsSalary(
                                "OtherIncome",
                                e.target.value,
                                index
                              )
                            }
                          />
                        </td>
                        <td>
                          <Input
                            placeholder="Please enter"
                            autoComplete="off"
                            name="TotalIncome"
                            value={detail.TotalIncome || ""}
                            onChange={(e) =>
                              handleInputsSalary(
                                "TotalIncome",
                                e.target.value,
                                index
                              )
                            }
                          />
                        </td>
                        <td>
                          <Input
                            placeholder="Please enter"
                            autoComplete="off"
                            name="PaymentMode"
                            value={detail.PaymentMode || ""}
                            onChange={(e) =>
                              handleInputsSalary(
                                "PaymentMode",
                                e.target.value,
                                index
                              )
                            }
                          />
                        </td>
                        <td>
                          <DatePicker
                            style={{ width: "100%" }}
                            value={
                              detail.DateOfPayment
                                ? moment(detail.DateOfPayment)
                                : null
                            }
                            onChange={(date, dateString) =>
                              handleInputsSalary(
                                "DateOfPayment",
                                dateString,
                                index
                              )
                            }
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">No salary details available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <Button
                onClick={addNewRow}
                type="primary"
                style={{ marginBottom: "20px" }}
              >
                Add Record
              </Button>

              <table style={{ marginTop: "35px" }}>
                <thead>
                  <tr>
                    <th>ABB</th>
                    <th>DR-1</th>
                    <th>DR-2</th>
                    <th>DR-3</th>
                    <th>DR-4</th>
                    <th>DR-5</th>
                  </tr>
                </thead>
                <tbody>
                  {data.BankDetails.length > 0 ? (
                    data.BankDetails.map((detail, index) => (
                      <tr key={index}>
                        <td>
                          <Input
                            placeholder="Please enter"
                            autoComplete="off"
                            name="ABB"
                            value={detail.ABB || ""}
                            onChange={(e) =>
                              handleInputsBankDetails(
                                "ABB",
                                e.target.value,
                                index,
                                "BankDetails"
                              )
                            }
                          />
                        </td>
                        <td>
                          <Input
                            placeholder="Please enter"
                            autoComplete="off"
                            name="DR1"
                            value={detail.DR1 || ""}
                            onChange={(e) =>
                              handleInputsBankDetails(
                                "DR1",
                                e.target.value,
                                index,
                                "BankDetails"
                              )
                            }
                          />
                        </td>
                        <td>
                          <Input
                            placeholder="Please enter"
                            autoComplete="off"
                            name="DR2"
                            value={detail.DR2 || ""}
                            onChange={(e) =>
                              handleInputsBankDetails(
                                "DR2",
                                e.target.value,
                                index,
                                "BankDetails"
                              )
                            }
                          />
                        </td>
                        <td>
                          <Input
                            placeholder="Please enter"
                            autoComplete="off"
                            name="DR3"
                            value={detail.DR3 || ""}
                            onChange={(e) =>
                              handleInputsBankDetails(
                                "DR3",
                                e.target.value,
                                index,
                                "BankDetails"
                              )
                            }
                          />
                        </td>
                        <td>
                          <Input
                            placeholder="Please enter"
                            autoComplete="off"
                            name="DR4"
                            value={detail.DR4 || ""}
                            onChange={(e) =>
                              handleInputsBankDetails(
                                "DR4",
                                e.target.value,
                                index,
                                "BankDetails"
                              )
                            }
                          />
                        </td>
                        <td>
                          <Input
                            placeholder="Please enter"
                            autoComplete="off"
                            name="DR5"
                            value={detail.DR5 || ""}
                            onChange={(e) =>
                              handleInputsBankDetails(
                                "DR5",
                                e.target.value,
                                index,
                                "BankDetails"
                              )
                            }
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No data available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <Button
                onClick={addNewRowToSecondTable}
                type="primary"
                style={{ marginBottom: "20px", marginTop: "35px" }}
              >
                Add Record
              </Button>

              <table style={{ marginTop: "35px" }}>
                <thead>
                  <tr>
                    <th>Cibil Analysis</th>
                    <th>Bounce</th>
                    <th>Enquiry</th>
                    <th>Recent Funding</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data.Analysis) && data.Analysis.length > 0 ? (
                    data.Analysis.map((detail, index) => (
                      <tr key={index}>
                        <td>
                          <Input
                            placeholder="Please enter"
                            autoComplete="off"
                            name="CibilAnalysis"
                            value={detail.CibilAnalysis || ""}
                            onChange={(e) =>
                              handleInputsAnalysis(
                                "CibilAnalysis",
                                e.target.value,
                                index
                              )
                            }
                          />
                        </td>
                        <td>
                          <Input
                            placeholder="Please enter"
                            autoComplete="off"
                            name="Bounce"
                            value={detail.Bounce || ""}
                            onChange={(e) =>
                              handleInputsAnalysis(
                                "Bounce",
                                e.target.value,
                                index
                              )
                            }
                          />
                        </td>
                        <td>
                          <Input
                            placeholder="Please enter"
                            autoComplete="off"
                            name="Enquiry"
                            value={detail.Enquiry || ""}
                            onChange={(e) =>
                              handleInputsAnalysis(
                                "Enquiry",
                                e.target.value,
                                index
                              )
                            }
                          />
                        </td>
                        <td>
                          <Input
                            placeholder="Please enter"
                            autoComplete="off"
                            name="RecentFunding"
                            value={detail.RecentFunding || ""}
                            onChange={(e) =>
                              handleInputsAnalysis(
                                "RecentFunding",
                                e.target.value,
                                index
                              )
                            }
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">No data available.</td>
                    </tr>
                  )}
                </tbody>
              </table>

              <Button
                type="primary"
                onClick={addNewRowToAnalysis}
                style={{ marginTop: "10px" }}
              >
                Add New Row
              </Button>

              <table style={{ marginTop: "35px" }}>
                <thead>
                  <tr>
                    <th>CIBIL SCORE</th>
                    <th>PAYOUT</th>
                    <th>SETTLEMENT 1 YEAR</th>
                    <th>SETTLEMENT 2 YEAR</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data.Score) && data.Score.length > 0 ? (
                    data.Score.map((score, index) => (
                      <tr key={index}>
                        <td>
                          <Input
                            placeholder="Enter Cibil Score"
                            autoComplete="off"
                            name="CibilScore"
                            value={score.CibilScore || ""}
                            onChange={(e) =>
                              handleInputsScore(
                                "CibilScore",
                                e.target.value,
                                index
                              )
                            }
                          />
                        </td>
                        <td>
                          <Input
                            placeholder="Enter Payout"
                            autoComplete="off"
                            name="PayOut"
                            value={score.PayOut || ""}
                            onChange={(e) =>
                              handleInputsScore("PayOut", e.target.value, index)
                            }
                          />
                        </td>
                        <td>
                          <Input
                            placeholder="Enter Settlement 1 Yr"
                            autoComplete="off"
                            name="Settelement1Yr"
                            value={score.Settelement1Yr || ""}
                            onChange={(e) =>
                              handleInputsScore(
                                "Settelement1Yr",
                                e.target.value,
                                index
                              )
                            }
                          />
                        </td>
                        <td>
                          <Input
                            placeholder="Enter Settlement 2 Yr"
                            autoComplete="off"
                            name="Settelement2Yr"
                            value={score.Settelement2Yr || ""}
                            onChange={(e) =>
                              handleInputsScore(
                                "Settelement2Yr",
                                e.target.value,
                                index
                              )
                            }
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">No data available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <Button
                type="primary"
                onClick={addNewRowToScore}
                style={{ marginTop: "10px" }}
              >
                Add New Row
              </Button>

              <div style={{ marginTop: "35px" }}>
                <label>
                  Loan Eligibility:
                  <Input
                    placeholder="Enter Loan Eligibility"
                    autoComplete="off"
                    value={data.LoanEligibility || ""}
                    onChange={(e) =>
                      setData({ ...data, LoanEligibility: e.target.value })
                    }
                  />
                </label>
                <label style={{ marginLeft: "20px" }}>
                  Loan Stage:
                  <Input
                    placeholder="Enter Loan Stage"
                    autoComplete="off"
                    value={data.LoanStage || ""}
                    onChange={(e) =>
                      setData({ ...data, LoanStage: e.target.value })
                    }
                  />
                </label>
              </div>

              <div className="dl-btn">
                <button type="button" onClick={handleEdit}>
                  Save
                </button>
              </div>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default SalaryIncome;
