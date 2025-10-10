
import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Form, Input, Tabs, Button, Select, DatePicker, Modal } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";

const { TabPane } = Tabs;
const { Option } = Select;

const SalaryIncome = () => {
  const [activeKey, setActiveKey] = useState("1");
  const tabsRef = useRef(null);
  const { dataId, currentPage } = useParams();
  const { userId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [data, setData] = useState({
    SalaryDetails: [],
    BankDetails: [],
    Analysis: [],
    Score: [],
  });

  useEffect(() => {
    const fetchSalaryIncomeData = async () => {
      try {
        setIsLoading(true); // Set loading state to true
        const response = await fetch(
          `http://77.37.45.224:8000/api/salaryIncome/GetAllSalaryIncome?currentPage=${currentPage}`,
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
            toast.error("Record not found.");
          }
        } else {
          const errorText = await response.text();
          console.error("Error fetching salary income data:", errorText);
          toast.error("Failed to fetch data from the server.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("An error occurred while fetching the data.");
      } finally {
        setIsLoading(false); // Set loading state to false
      }
    };

    if (currentPage && dataId) {
      fetchSalaryIncomeData();
    } else {
      console.error("Invalid parameters: currentPage or dataId is missing");
    }
  }, [dataId, currentPage]);


  const handleEdit = async () => {
    try {
      setIsLoading(true);

      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        const value = data[key];

        // Handle arrays
        if (Array.isArray(value)) {
          // Separate File objects
          const files = value.filter((item) => item instanceof File);
          files.forEach((file) => formData.append(key, file));

          // Non-file data
          const nonFiles = value.filter((item) => !(item instanceof File));
          if (nonFiles.length > 0) {
            formData.append(
              key,
              typeof nonFiles[0] === "string" ? nonFiles[0] : JSON.stringify(nonFiles)
            );
          }

          // Handle single File
        } else if (value instanceof File) {
          formData.append(key, value);

          // Handle primitive values
        } else if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      const response = await fetch(
        `http://77.37.45.224:8000/api/salaryIncome/EditSalaryData`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtoken")}`,
            // Content-Type is omitted for multipart/form-data
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success("Employee updated successfully");
        setTimeout(() => navigate(`/admin/${userId}/directsales`), 1000);
      } else {
        toast.error(result.message || "Unable to update employee");
        console.error("Update response:", result);
      }

    } catch (error) {
      toast.error("Unable to update employee");
      console.error("Error updating employee:", error);
    } finally {
      setIsLoading(false);
    }
  };




  const handleInputs = (fieldName, value) => {
    setData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleFileUpload = (file, fieldName) => {
    handleInputs(fieldName, [file]); // store File object
  };

  const handlePreview = (url) => {
    setPreviewImage(url);
    setPreviewVisible(true);
  };

  const handleCancelPreview = () => {
    setPreviewVisible(false);
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

  // Move to previous tab
  const handlePrev = () => {
    const prevKey = (parseInt(activeKey) - 1).toString();
    if (parseInt(activeKey) > 1) setActiveKey(prevKey);
  };

  //  Move to next tab
  const handleNext = () => {
    const nextKey = (parseInt(activeKey) + 1).toString();
    if (parseInt(activeKey) < 7) setActiveKey(nextKey); // change "5" to total tab count
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

      <div
        className="dl-container"
        style={{
          position: "relative",
          height: "calc(100vh - 150px)", // adjust based on header + breadcrumb height
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Tabs ref={tabsRef} activeKey={activeKey} onChange={setActiveKey} type="card">
          {/* ------------------ 1. Personal Details ------------------ */}

          <TabPane style={{ marginTop: "50px" }} tab="Personal Details" key="1" >
            <div
              style={{
                overflowY: "auto",
                maxHeight: "calc(100vh - 220px)", // header + breadcrumb + tab headers height
                paddingRight: "16px",
              }}
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
                    <Form.Item label=" Lead Name" className="FormItem">
                      <Input
                        placeholder="Please enter"
                        autoComplete="off"
                        name="LeadName"
                        value={data.LeadName || ""}
                        onChange={(e) => handleInputs("LeadName", e.target.value)}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Mobile No" className="FormItem">
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
                </Row>

                <Row gutter={[8, 8]}>
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
                </Row>

                <Row gutter={[8, 8]}>
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
                </Row>

                <Row gutter={[8, 8]}>
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
                </Row>

                <Row gutter={[8, 8]}>
                  <Col span={12}>
                    <Form.Item label="Residency City" className="FormItem">
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
                  <Col span={12}>
                    <Form.Item label="Permanent Address" className="FormItem">
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
                  <Col span={12}>
                    <Form.Item label="Permenent city" className="FormItem">
                      <Input
                        placeholder="Please enter"
                        autoComplete="off"
                        name="PCity"
                        value={data.PCity || ""}
                        onChange={(e) => handleInputs("PCity", e.target.value)}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
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
                </Row>
                <Row gutter={[8, 8]}>
                  <Col span={12}>
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
                {/* ✅ Navigation Buttons */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    marginTop: "1.5rem", // same as mt-6
                  }}
                >
                  <Button type="primary" onClick={handleNext}>
                    Next →
                  </Button>
                </div>
              </Form>
            </div>
          </TabPane>

          {/* ------------------ 2. Company Details ------------------ */}

          <TabPane style={{ marginTop: "50px" }} tab="Company Details" key="2" >
            <div
              style={{
                overflowY: "auto",
                maxHeight: "calc(100vh - 220px)", // header + breadcrumb + tab headers height
                paddingRight: "16px",
              }}
            >
              <Form layout="vertical">
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
                    <Form.Item label="Your company is formed as?" className="FormItem">
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
                    <Form.Item label="Your Company belongs from Industry?" className="FormItem">
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
                </Row>

                <Row gutter={[8, 8]}>
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
                {/* ✅ Navigation Buttons */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "1.5rem", // same as mt-6
                  }}
                >
                  <Button onClick={handlePrev}>← Back</Button>
                  <Button type="primary" onClick={handleNext}>
                    Next →
                  </Button>
                </div>
              </Form>
            </div>
          </TabPane>
          {/* ------------------ 1. Income Details ------------------ */}

          <TabPane style={{ marginTop: "50px" }} tab="Salary Details" key="3" >
            <div
              style={{
                overflowY: "auto",
                maxHeight: "calc(100vh - 220px)", // header + breadcrumb + tab headers height
                paddingRight: "16px",
              }}
            >
              <Form layout="vertical">
                <Row gutter={[8, 8]}>
                  <Col span={12}>
                    <Form.Item label="Gross Salary Per Month" className="FormItem">
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
                </Row>

                <hr style={{ marginBottom: "35px" }} />

                {/* Salary Details Table */}
                <div style={{
                  overflowX: "auto",
                  scrollbarWidth: "thin", // for Firefox
                  scrollbarColor: "#ccc transparent", // for Firefox
                }}>
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
                </div>

                <Button
                  onClick={addNewRow}
                  type="primary"
                  style={{ marginBottom: "20px" }}
                >
                  Add Record
                </Button>
                {/* ✅ Navigation Buttons */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "1.5rem", // same as mt-6
                  }}
                >
                  <Button onClick={handlePrev}>← Back</Button>
                  <Button type="primary" onClick={handleNext}>
                    Next →
                  </Button>
                </div>
              </Form>
            </div>
          </TabPane>

          {/* ------------------ 4. Income Sources ------------------ */}
          <TabPane style={{ marginTop: "50px" }} tab="Income Sources" key="4">
            <div
              style={{
                overflowY: "auto",
                maxHeight: "calc(100vh - 220px)", // header + breadcrumb + tab headers height
                paddingRight: "16px",
              }}
            >
              <Form layout="vertical">
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
                        <Option value="ProfessionalIncome">Professional Income</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Do you have another source of Income?" className="FormItem">
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
                {/* ✅ Navigation Buttons */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "1.5rem", // same as mt-6
                  }}
                >
                  <Button onClick={handlePrev}>← Back</Button>
                  <Button type="primary" onClick={handleNext}>
                    Next →
                  </Button>
                </div>
              </Form>
            </div>
          </TabPane>

          {/* ------------------ 5.Bank statement summery  ------------------ */}
          <TabPane style={{ marginTop: "50px" }} tab="Bank Statement Summary" key="5">
            <div
              style={{
                overflowY: "auto",
                maxHeight: "calc(100vh - 220px)", // header + breadcrumb + tab headers height
                paddingRight: "16px",
              }}
            >

              <div style={{
                overflowX: "auto",
                scrollbarWidth: "thin", // for Firefox
                scrollbarColor: "#ccc transparent", // for Firefox
              }}>
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
              </div>
              <Button
                onClick={addNewRowToSecondTable}
                type="primary"
                style={{ marginBottom: "20px", marginTop: "35px" }}
              >
                Add Record
              </Button>
              {/* ✅ Navigation Buttons */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "1.5rem", // same as mt-6
                }}
              >
                <Button onClick={handlePrev}>← Back</Button>
                <Button type="primary" onClick={handleNext}>
                  Next →
                </Button>
              </div>
            </div>
          </TabPane>

          {/* ------------------ 6. CIBIL & Analysis ------------------ */}
          <TabPane style={{ marginTop: "50px" }} tab="CIBIL & Analysis" key="6">
            <div
              style={{
                overflowY: "auto",
                maxHeight: "calc(100vh - 220px)", // header + breadcrumb + tab headers height
                paddingRight: "16px",
              }}
            >
              <table>
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
                style={{ marginTop: "10px", marginBottom: '30px' }}
              >
                Add New Row
              </Button>

              {/* Analysis Table */}
              <table>
                <thead>
                  <tr>
                    <th>CibilScore</th>
                    <th>Payout</th>
                    <th>Settlement 1 Year</th>
                    <th>Settlement 2 Year</th>
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
              {/* ✅ Navigation Buttons */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "1.5rem", // same as mt-6
                }}
              >
                <Button onClick={handlePrev}>← Back</Button>
                <Button type="primary" onClick={handleNext}>
                  Next →
                </Button>
              </div>
            </div>
          </TabPane>

          {/* ------------------ 7.  Document ------------------ */}
          <TabPane style={{ marginTop: "50px" }} tab="Document" key="7">
            <div
              style={{
                overflowY: "auto",
                maxHeight: "calc(100vh - 220px)", // header + breadcrumb + tab headers height
                paddingRight: "16px",
              }}
            >
              <Form layout="vertical">
                <Row gutter={[8, 8]}>
                  <Col span={12}>
                    <Form.Item label="Photo">
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

                        {data.UploadPhoto && data.UploadPhoto.length > 0 ? (
                          <img
                            src={
                              typeof data.UploadPhoto[0] === "string"
                                ? `http://77.37.45.224:8000/${data.UploadPhoto[0]}`
                                : URL.createObjectURL(data.UploadPhoto[0])
                            }
                            alt="Uploaded Preview"
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              border: "1px solid #ccc",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setPreviewImage(
                                typeof data.UploadPhoto[0] === "string"
                                  ? `http://77.37.45.224:8000/${data.UploadPhoto[0]}`
                                  : URL.createObjectURL(data.UploadPhoto[0])
                              );
                              setPreviewVisible(true);
                            }}
                          />
                        ) : (
                          <p>No Image Available</p>
                        )}

                        <Input
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) handleFileUpload(file, "UploadPhoto");
                          }}
                        />

                        {data.UploadPhoto && data.UploadPhoto[0] && (
                          <div style={{ width: "260px", color: "#555", marginTop: "0px" }}>
                            {typeof data.UploadPhoto[0] === "string"
                              ? data.UploadPhoto[0].split("/").pop()
                              : data.UploadPhoto[0].name}
                          </div>
                        )}
                      </div>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Aadhar Card" className="FormItem">
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {data.UploadAadhar && data.UploadAadhar.length > 0 ? (
                          <img
                            src={
                              typeof data.UploadAadhar[0] === "string"
                                ? `http://77.37.45.224:8000/${data.UploadAadhar[0]}`
                                : URL.createObjectURL(data.UploadAadhar[0])
                            }

                            alt="Uploaded Preview"
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              border: "1px solid #ccc",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setPreviewImage(
                                typeof data.UploadAadhar[0] === "string"
                                  ? `http://77.37.45.224:8000/${data.UploadAadhar[0]}`
                                  : URL.createObjectURL(data.UploadAadhar[0])
                              );
                              setPreviewVisible(true);
                            }}

                          />
                        ) : (
                          <p>No Image Available</p>
                        )}

                        <Input
                          type="file"
                          name="UploadAadhar"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) handleFileUpload(file, "UploadAadhar");
                          }}
                        />

                        {data.UploadAadhar && data.UploadAadhar[0] && (
                          <div style={{ width: "260px", color: "#555", marginTop: "0px" }}>
                            {typeof data.UploadAadhar[0] === "string"
                              ? data.UploadAadhar[0].split("/").pop()
                              : data.UploadAadhar[0].name}
                          </div>
                        )}
                      </div>
                    </Form.Item>
                  </Col>
                </Row>

                <hr style={{ color: "gray", marginBottom: "20px" }}></hr>

                <Row gutter={[8, 8]}>
                  <Col span={12}>
                    <Form.Item label="Appointment Letter">
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

                        {data.AppointmentLetter && data.AppointmentLetter.length > 0 ? (
                          <img
                            src={
                              typeof data.AppointmentLetter[0] === "string"
                                ? `http://77.37.45.224:8000/${data.AppointmentLetter[0]}`
                                : URL.createObjectURL(data.AppointmentLetter[0])
                            }
                            alt="Uploaded Preview"
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              border: "1px solid #ccc",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setPreviewImage(
                                typeof data.AppointmentLetter[0] === "string"
                                  ? `http://77.37.45.224:8000/${data.AppointmentLetter[0]}`
                                  : URL.createObjectURL(data.AppointmentLetter[0])
                              );
                              setPreviewVisible(true);
                            }}
                          />
                        ) : (
                          <p>No Image Available</p>
                        )}

                        <Input
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) handleFileUpload(file, "AppointmentLetter");
                          }}
                        />

                        {data.AppointmentLetter && data.AppointmentLetter[0] && (
                          <div style={{ width: "260px", color: "#555", marginTop: "0px" }}>
                            {typeof data.AppointmentLetter[0] === "string"
                              ? data.AppointmentLetter[0].split("/").pop()
                              : data.AppointmentLetter[0].name}
                          </div>
                        )}
                      </div>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Appraisal Letter">
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {data.AppraisalLetter && data.AppraisalLetter.length > 0 ? (
                          <img
                            src={
                              typeof data.AppraisalLetter[0] === "string"
                                ? `http://77.37.45.224:8000/${data.AppraisalLetter[0]}`
                                : URL.createObjectURL(data.AppraisalLetter[0])
                            }
                            alt="Uploaded Preview"
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              border: "1px solid #ccc",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setPreviewImage(
                                typeof data.AppraisalLetter[0] === "string"
                                  ? `http://77.37.45.224:8000/${data.AppraisalLetter[0]}`
                                  : URL.createObjectURL(data.AppraisalLetter[0])
                              );
                              setPreviewVisible(true);
                            }}
                          />
                        ) : (
                          <p>No Image Available</p>
                        )}

                        <Input
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) handleFileUpload(file, "AppraisalLetter");
                          }}
                        />

                        {data.AppraisalLetter && data.AppraisalLetter[0] && (
                          <div style={{ width: "260px", color: "#555", marginTop: "0px" }}>
                            {typeof data.AppraisalLetter[0] === "string"
                              ? data.AppraisalLetter[0].split("/").pop()
                              : data.AppraisalLetter[0].name}
                          </div>
                        )}
                      </div>
                    </Form.Item>
                  </Col>
                </Row>

                <hr style={{ color: "gray", marginBottom: "20px" }}></hr>
                <Row gutter={[8, 8]}>
                  <Col span={12}>
                    <Form.Item label="Previous Company Relieving Letter">
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {data.PreviousCompanyRelievingLetter && data.PreviousCompanyRelievingLetter.length > 0 ? (
                          <img
                            src={
                              typeof data.PreviousCompanyRelievingLetter[0] === "string"
                                ? `http://77.37.45.224:8000/${data.PreviousCompanyRelievingLetter[0]}`
                                : URL.createObjectURL(data.PreviousCompanyRelievingLetter[0])
                            }
                            alt="Uploaded Preview"
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              border: "1px solid #ccc",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setPreviewImage(
                                typeof data.PreviousCompanyRelievingLetter[0] === "string"
                                  ? `http://77.37.45.224:8000/${data.PreviousCompanyRelievingLetter[0]}`
                                  : URL.createObjectURL(data.PreviousCompanyRelievingLetter[0])
                              );
                              setPreviewVisible(true);
                            }}
                          />
                        ) : (
                          <p>No Image Available</p>
                        )}

                        <Input
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) handleFileUpload(file, "PreviousCompanyRelievingLetter");
                          }}
                        />

                        {data.PreviousCompanyRelievingLetter && data.PreviousCompanyRelievingLetter[0] && (
                          <div style={{ width: "260px", color: "#555", marginTop: "0px" }}>
                            {typeof data.PreviousCompanyRelievingLetter[0] === "string"
                              ? data.PreviousCompanyRelievingLetter[0].split("/").pop()
                              : data.PreviousCompanyRelievingLetter[0].name}
                          </div>
                        )}
                      </div>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Company Id Card">
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {data.CompanyIdCard && data.CompanyIdCard.length > 0 ? (
                          <img
                            src={
                              typeof data.CompanyIdCard[0] === "string"
                                ? `http://77.37.45.224:8000/${data.CompanyIdCard[0]}`
                                : URL.createObjectURL(data.CompanyIdCard[0])
                            }
                            alt="Uploaded Preview"
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              border: "1px solid #ccc",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setPreviewImage(
                                typeof data.CompanyIdCard[0] === "string"
                                  ? `http://77.37.45.224:8000/${data.CompanyIdCard[0]}`
                                  : URL.createObjectURL(data.CompanyIdCard[0])
                              );
                              setPreviewVisible(true);
                            }}
                          />
                        ) : (
                          <p>No Image Available</p>
                        )}

                        <Input
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) handleFileUpload(file, "CompanyIdCard");
                          }}
                        />

                        {data.CompanyIdCard && data.CompanyIdCard[0] && (
                          <div style={{ width: "260px", color: "#555", marginTop: "0px" }}>
                            {typeof data.CompanyIdCard[0] === "string"
                              ? data.CompanyIdCard[0].split("/").pop()
                              : data.CompanyIdCard[0].name}
                          </div>
                        )}
                      </div>
                    </Form.Item>
                  </Col>
                </Row>

                <hr style={{ color: "gray", marginBottom: "20px" }}></hr>
                <Row gutter={[8, 8]}>
                  <Col span={12}>
                    <Form.Item label="Current Address Proof">
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {data.CurrentAddressProof && data.CurrentAddressProof.length > 0 ? (
                          <img
                            src={
                              typeof data.CurrentAddressProof[0] === "string"
                                ? `http://77.37.45.224:8000/${data.CurrentAddressProof[0]}`
                                : URL.createObjectURL(data.CurrentAddressProof[0])
                            }
                            alt="Uploaded Preview"
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              border: "1px solid #ccc",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setPreviewImage(
                                typeof data.CurrentAddressProof[0] === "string"
                                  ? `http://77.37.45.224:8000/${data.CurrentAddressProof[0]}`
                                  : URL.createObjectURL(data.CurrentAddressProof[0])
                              );
                              setPreviewVisible(true);
                            }}
                          />
                        ) : (
                          <p>No Image Available</p>
                        )}

                        <Input
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) handleFileUpload(file, "CurrentAddressProof");
                          }}
                        />

                        {data.CurrentAddressProof && data.CurrentAddressProof[0] && (
                          <div style={{ width: "260px", color: "#555", marginTop: "0px" }}>
                            {typeof data.CurrentAddressProof[0] === "string"
                              ? data.CurrentAddressProof[0].split("/").pop()
                              : data.CurrentAddressProof[0].name}
                          </div>
                        )}
                      </div>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Permanent Address Proof">
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {data.PermanentAddressProof && data.PermanentAddressProof.length > 0 ? (
                          <img
                            src={
                              typeof data.PermanentAddressProof[0] === "string"
                                ? `http://77.37.45.224:8000/${data.PermanentAddressProof[0]}`
                                : URL.createObjectURL(data.PermanentAddressProof[0])
                            }
                            alt="Uploaded Preview"
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              border: "1px solid #ccc",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setPreviewImage(
                                typeof data.PermanentAddressProof[0] === "string"
                                  ? `http://77.37.45.224:8000/${data.PermanentAddressProof[0]}`
                                  : URL.createObjectURL(data.PermanentAddressProof[0])
                              );
                              setPreviewVisible(true);
                            }}
                          />
                        ) : (
                          <p>No Image Available</p>
                        )}

                        <Input
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) handleFileUpload(file, "PermanentAddressProof");
                          }}
                        />

                        {data.PermanentAddressProof && data.PermanentAddressProof[0] && (
                          <div style={{ width: "260px", color: "#555", marginTop: "0px" }}>
                            {typeof data.PermanentAddressProof[0] === "string"
                              ? data.PermanentAddressProof[0].split("/").pop()
                              : data.PermanentAddressProof[0].name}
                          </div>
                        )}
                      </div>
                    </Form.Item>
                  </Col>
                </Row>

                <hr style={{ color: "gray", marginBottom: "20px" }}></hr>
                <Row gutter={[8, 8]}>
                  <Col span={12}>
                    <Form.Item label="Relationship Proof">
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {data.RelationshipProof && data.RelationshipProof.length > 0 ? (
                          <img
                            src={
                              typeof data.RelationshipProof[0] === "string"
                                ? `http://77.37.45.224:8000/${data.RelationshipProof[0]}`
                                : URL.createObjectURL(data.RelationshipProof[0])
                            }
                            alt="Uploaded Preview"
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              border: "1px solid #ccc",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setPreviewImage(
                                typeof data.RelationshipProof[0] === "string"
                                  ? `http://77.37.45.224:8000/${data.RelationshipProof[0]}`
                                  : URL.createObjectURL(data.RelationshipProof[0])
                              );
                              setPreviewVisible(true);
                            }}
                          />
                        ) : (
                          <p>No Image Available</p>
                        )}

                        <Input
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) handleFileUpload(file, "RelationshipProof");
                          }}
                        />

                        {data.RelationshipProof && data.RelationshipProof[0] && (
                          <div style={{ width: "260px", color: "#555", marginTop: "0px" }}>
                            {typeof data.RelationshipProof[0] === "string"
                              ? data.RelationshipProof[0].split("/").pop()
                              : data.RelationshipProof[0].name}
                          </div>
                        )}
                      </div>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Pan">
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {data.UploadPan && data.UploadPan.length > 0 ? (
                          <img
                            src={
                              typeof data.UploadPan[0] === "string"
                                ? `http://77.37.45.224:8000/${data.UploadPan[0]}`
                                : URL.createObjectURL(data.UploadPan[0])
                            }
                            alt="Uploaded Preview"
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              border: "1px solid #ccc",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setPreviewImage(
                                typeof data.UploadPan[0] === "string"
                                  ? `http://77.37.45.224:8000/${data.UploadPan[0]}`
                                  : URL.createObjectURL(data.UploadPan[0])
                              );
                              setPreviewVisible(true);
                            }}
                          />
                        ) : (
                          <p>No Image Available</p>
                        )}

                        <Input
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) handleFileUpload(file, "UploadPan");
                          }}
                        />

                        {data.UploadPan && data.UploadPan[0] && (
                          <div style={{ width: "260px", color: "#555", marginTop: "0px" }}>
                            {typeof data.UploadPan[0] === "string"
                              ? data.UploadPan[0].split("/").pop()
                              : data.UploadPan[0].name}
                          </div>
                        )}
                      </div>
                    </Form.Item>

                  </Col>
                </Row>

                <hr style={{ color: "gray", marginBottom: "20px" }}></hr>
                <Row gutter={[8, 8]}>
                  <Col span={12}>
                    <Form.Item label="Upload Bank Statement 3,6,12">
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {data.UploadBankStatement3_6_12 && data.UploadBankStatement3_6_12.length > 0 ? (
                          <img
                            src={
                              typeof data.UploadBankStatement3_6_12[0] === "string"
                                ? `http://77.37.45.224:8000/${data.UploadBankStatement3_6_12[0]}`
                                : URL.createObjectURL(data.UploadBankStatement3_6_12[0])
                            }
                            alt="Uploaded Preview"
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              border: "1px solid #ccc",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setPreviewImage(
                                typeof data.UploadBankStatement3_6_12[0] === "string"
                                  ? `http://77.37.45.224:8000/${data.UploadBankStatement3_6_12[0]}`
                                  : URL.createObjectURL(data.UploadBankStatement3_6_12[0])
                              );
                              setPreviewVisible(true);
                            }}
                          />
                        ) : (
                          <p>No Image Available</p>
                        )}

                        <Input
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) handleFileUpload(file, "UploadBankStatement3_6_12");
                          }}
                        />

                        {data.UploadBankStatement3_6_12 && data.UploadBankStatement3_6_12[0] && (
                          <div style={{ width: "260px", color: "#555", marginTop: "0px" }}>
                            {typeof data.UploadBankStatement3_6_12[0] === "string"
                              ? data.UploadBankStatement3_6_12[0].split("/").pop()
                              : data.UploadBankStatement3_6_12[0].name}
                          </div>
                        )}
                      </div>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Salary Slip 1">
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {data.SalarySlip1 && data.SalarySlip1.length > 0 ? (
                          <img
                            src={
                              typeof data.SalarySlip1[0] === "string"
                                ? `http://77.37.45.224:8000/${data.SalarySlip1[0]}`
                                : URL.createObjectURL(data.SalarySlip1[0])
                            }
                            alt="Uploaded Preview"
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              border: "1px solid #ccc",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setPreviewImage(
                                typeof data.SalarySlip1[0] === "string"
                                  ? `http://77.37.45.224:8000/${data.SalarySlip1[0]}`
                                  : URL.createObjectURL(data.SalarySlip1[0])
                              );
                              setPreviewVisible(true);
                            }}
                          />
                        ) : (
                          <p>No Image Available</p>
                        )}

                        <Input
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) handleFileUpload(file, "SalarySlip1");
                          }}
                        />

                        {data.SalarySlip1 && data.SalarySlip1[0] && (
                          <div style={{ width: "260px", color: "#555", marginTop: "0px" }}>
                            {typeof data.SalarySlip1[0] === "string"
                              ? data.SalarySlip1[0].split("/").pop()
                              : data.SalarySlip1[0].name}
                          </div>
                        )}
                      </div>
                    </Form.Item>
                  </Col>
                </Row>

                <hr style={{ color: "gray", marginBottom: "20px" }}></hr>
                <Row gutter={[8, 8]}>
                  <Col span={12}>
                    <Form.Item label="Salary Slip 2">
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {data.SalarySlip2 && data.SalarySlip2.length > 0 ? (
                          <img
                            src={
                              typeof data.SalarySlip2[0] === "string"
                                ? `http://77.37.45.224:8000/${data.SalarySlip2[0]}`
                                : URL.createObjectURL(data.SalarySlip2[0])
                            }
                            alt="Uploaded Preview"
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              border: "1px solid #ccc",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setPreviewImage(
                                typeof data.SalarySlip2[0] === "string"
                                  ? `http://77.37.45.224:8000/${data.SalarySlip2[0]}`
                                  : URL.createObjectURL(data.SalarySlip2[0])
                              );
                              setPreviewVisible(true);
                            }}
                          />
                        ) : (
                          <p>No Image Available</p>
                        )}

                        <Input
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) handleFileUpload(file, "SalarySlip2");
                          }}
                        />

                        {data.SalarySlip2 && data.SalarySlip2[0] && (
                          <div style={{ width: "260px", color: "#555", marginTop: "0px" }}>
                            {typeof data.SalarySlip2[0] === "string"
                              ? data.SalarySlip2[0].split("/").pop()
                              : data.SalarySlip2[0].name}
                          </div>
                        )}
                      </div>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="SalarySlip3">
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {data.SalarySlip3 && data.SalarySlip3.length > 0 ? (
                          <img
                            src={
                              typeof data.SalarySlip3[0] === "string"
                                ? `http://77.37.45.224:8000/${data.SalarySlip3[0]}`
                                : URL.createObjectURL(data.SalarySlip3[0])
                            }
                            alt="Uploaded Preview"
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              border: "1px solid #ccc",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setPreviewImage(
                                typeof data.SalarySlip3[0] === "string"
                                  ? `http://77.37.45.224:8000/${data.SalarySlip3[0]}`
                                  : URL.createObjectURL(data.SalarySlip3[0])
                              );
                              setPreviewVisible(true);
                            }}
                          />
                        ) : (
                          <p>No Image Available</p>
                        )}

                        <Input
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) handleFileUpload(file, "SalarySlip3");
                          }}
                        />

                        {data.SalarySlip3 && data.SalarySlip3[0] && (
                          <div style={{ width: "260px", color: "#555", marginTop: "0px" }}>
                            {typeof data.SalarySlip3[0] === "string"
                              ? data.SalarySlip3[0].split("/").pop()
                              : data.SalarySlip3[0].name}
                          </div>
                        )}
                      </div>
                    </Form.Item>
                  </Col>
                </Row>

                <div className="dl-btn">
                  <button type="button" onClick={handleEdit}>
                    Submit
                  </button>
                </div>
                {/* ✅ Navigation Buttons */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    marginTop: "1.5rem", // same as mt-6
                  }}
                >
                  <Button onClick={handlePrev}>← Back</Button>

                </div>
                {/* Modal for full-screen preview */}
                <Modal
                  visible={previewVisible}
                  footer={null}
                  onCancel={handleCancelPreview}
                  centered
                  width="80%"
                >
                  <img
                    alt="Preview"
                    style={{ width: "100%", height: "auto" }}
                    src={previewImage}
                  />
                </Modal>
              </Form>
            </div>
          </TabPane>
        </Tabs>
      </div>
      <ToastContainer />
    </>
  );
};

export default SalaryIncome;

