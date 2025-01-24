import React, { useState, useRef, useEffect } from "react";
import { Col, Row, Form, Input, Tabs, Select, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { TabPane } = Tabs;
const { Option } = Select;

const ProfessionalIncome = () => {
  const [activeKey, setActiveKey] = useState("1");
  const tabsRef = useRef(null);
  const navigate = useNavigate();
  const { userId, dataId } = useParams();
  console.log("User DataId:", dataId);
  const [data, setData] = useState({
    IncomeDetails: [],
    TurnOverDetails: [],
    BankDetails: [],
  });
  console.log("User State:", data);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://77.37.45.224:8000/api/salaryIncome/getAllIncomeInfo`
        );
        const data = await response.json();

        if (data.success) {
          const professionalIncome = data.data.ProfessionalIncome.find(
            (income) => income._id === dataId
          );
          if (professionalIncome) {
            setData(professionalIncome); // Populate user state with fetched business income data
          }
        } else {
          toast.error("Failed to fetch data.");
        }
      } catch (error) {
        toast.error("Error fetching data.");
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [dataId]);

  const handleInputs = (fieldName, value) => {
    setData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleNext = () => {
    const nextKey = activeKey === "1" ? "2" : "1";
    setActiveKey(nextKey);
    tabsRef.current?.scrollIntoView();
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://77.37.45.224:8000/api/professionalIncome/EditProfessionalIncomesData",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const result = await response.json();
        // Show success toast
        toast.success("Data submitted successfully!");
        setTimeout(() => navigate(`/admin/${userId}/directsales`), 1000);

        console.log("Data submitted successfully:", result);
      } else {
        // Show error toast
        toast.error("Failed to submit data");
        console.error("Failed to submit data");
      }
    } catch (error) {
      // Show error toast
      toast.error("Error submitting form");
      console.error("Error submitting form:", error);
    }
  };

  const handleYearWiseITRChange = (index, field, value) => {
    const updatedYearWiseITR = [...data.YearWiseITR];
    updatedYearWiseITR[index][field] = value;
    setData((prevData) => ({
      ...prevData,
      YearWiseITR: updatedYearWiseITR,
    }));
  };
  const handleIncomeDetailsChange = (index, fieldName, value) => {
    setData((prevData) => {
      const updatedIncomeDetails = [...prevData.IncomeDetails];
      updatedIncomeDetails[index] = {
        ...updatedIncomeDetails[index],
        [fieldName]: value,
      };
      return {
        ...prevData,
        IncomeDetails: updatedIncomeDetails,
      };
    });
  };
  const handleTurnOverDetailsChange = (index, fieldName, value) => {
    setData((prevData) => {
      const updatedTurnOverDetails = [...prevData.TurnOverDetails];
      updatedTurnOverDetails[index] = {
        ...updatedTurnOverDetails[index],
        [fieldName]: value,
      };
      return {
        ...prevData,
        TurnOverDetails: updatedTurnOverDetails,
      };
    });
  };
  const handleBankDetailsChange = (index, fieldName, value) => {
    setData((prevData) => {
      const updatedBankDetails = [...prevData.BankDetails];
      updatedBankDetails[index] = {
        ...updatedBankDetails[index],
        [fieldName]: value,
      };
      return {
        ...prevData,
        BankDetails: updatedBankDetails,
      };
    });
  };

  const addIncomeDetailRow = () => {
    setData((prevData) => ({
      ...prevData,
      IncomeDetails: [
        ...(prevData.IncomeDetails || []), // Ensure it's always an array, fallback to empty array if undefined or null
        {
          AssesmentYear: "",
          GrossIncome: "",
          NetIncome: "",
          OtherIncome: "",
          TotalIncome: "",
          PaymentMode: "",
          DateOfFilling: "",
        },
      ],
    }));
  };
  const addTurnOverDetailRow = () => {
    setData((prevData) => ({
      ...prevData,
      TurnOverDetails: [
        ...(prevData.TurnOverDetails || []),
        {
          TurnOver: "",
          ITR: "",
          GST: "",
          Banking: "",
          Export: "",
          Other: "",
        },
      ],
    }));
  };
  const addBankDetailRow = () => {
    setData((prevData) => ({
      ...prevData,
      BankDetails: [
        ...(prevData.BankDetails || []),
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
  const addNewYearWiseITR = () => {
    setData((prevData) => ({
      ...prevData,
      YearWiseITR: [
        ...prevData.YearWiseITR,
        { FillingDate: "", Profit: "", TurnOver: "" }, // Default values for new row
      ],
    }));
  };

  const handleSelectChangeITRStatus = (value) => {
    handleInputs("ITRStatus", value);
  };
  const handleSelectChangeSex = (value) => {
    handleInputs("Sex", value);
  };
  const handleSelectChangeMaritalStatus = (value) => {
    handleInputs("MaritalStatus", value);
  };
  const handleSelectChangePFAapplicability = (value) => {
    handleInputs("PFApplicability", value);
  };
  const handleSelectChangeForm26AS = (value) => {
    handleInputs("Form26AS", value);
  };
  const handleSelectChangeCertificateOfPractice = (value) => {
    handleInputs("CertificateOfPractice", value);
  };
  const handleSelectChangeGstRegistration = (value) => {
    handleInputs("GstRegistration", value);
  };
  const handleSelectChangeShopActLicence = (value) => {
    handleInputs("ShopActLicence", value);
  };
  const handleSelectChangeAadharUdhyog = (value) => {
    handleInputs("AadharUdhyog", value);
  };
  const handleSelectChangeCurrentAccount = (value) => {
    handleInputs("CurrentAccount", value);
  };

  return (
    <>
      <div className="directlead-header">
        <div className="dl-heading">
          <h2>Income Type - Professional Income</h2>
        </div>
      </div>
      <div className="breadcrumb">
        <a onClick={() => navigate(`/admin/${userId}/directsales`)}>
          Direct Sales
        </a>{" "}
        &gt; <span>Professsional Income</span>
      </div>
      <div className="dl-container">
        <Tabs ref={tabsRef} activeKey={activeKey} onChange={setActiveKey}>
          <TabPane
            style={{ marginTop: "50px" }}
            tab="Professional Income Form 1"
            key="1"
          >
            <Form layout="vertical" onFinish={handleSubmit}>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item
                    label="Name of the Profession"
                    className="FormItem"
                  >
                    <Input
                      name="Name"
                      value={data.Name || ""}
                      onChange={(e) => handleInputs("Name", e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Type of Profession" className="FormItem">
                    <Input
                      name="TypeOfProfession"
                      value={data?.TypeOfProfession || ""}
                      onChange={(e) =>
                        handleInputs("TypeOfProfession", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item
                    label="Profession Formation Type"
                    className="FormItem"
                  >
                    <Input
                      name="ProfessionFormationType"
                      value={data?.ProfessionFormationType || ""}
                      onChange={(e) =>
                        handleInputs("ProfessionFormationType", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Profession Formation Date"
                    className="FormItem"
                  >
                    <Input
                      name="ProfessionFormationDate"
                      type="Date"
                      value={data?.ProfessionFormationDate || ""}
                      onChange={(e) =>
                        handleInputs("ProfessionFormationDate", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Office Type" className="FormItem">
                    <Input
                      name="OfficeType"
                      value={data?.OfficeType || ""}
                      onChange={(e) =>
                        handleInputs("OfficeType", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Office Ownership" className="FormItem">
                    <Input
                      name="OfficeOwnership"
                      value={data?.OfficeOwnership || ""}
                      onChange={(e) =>
                        handleInputs("OfficeOwnership", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Office Location" className="FormItem">
                    <Input
                      name="OfficeLocation"
                      value={data?.OfficeLocation || ""}
                      onChange={(e) =>
                        handleInputs("OfficeLocation", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <hr style={{ marginBottom: "50px" }} />

              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Have you filed ITR ?" className="FormItem">
                    <Select
                      placeholder="Please select"
                      value={data.ITRStatus || []}
                      onChange={handleSelectChangeITRStatus}
                      autoComplete="off"
                      name="ITRStatus"
                    >
                      <Option value="Yes">Yes</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}></Col>
              </Row>
              <Row gutter={[8, 8, 8]}>
                <Form.Item label="Year Wise ITR" className="FormItem">
                  {data?.YearWiseITR?.map((item, index) => (
                    <Row style={{ width: "650px" }} key={index} gutter={[8, 8]}>
                      <Col span={8}>
                        <Form.Item label="Filling Date">
                          <Input
                            placeholder="Filling Date"
                            type="date"
                            value={item.FillingDate}
                            onChange={(e) =>
                              handleYearWiseITRChange(
                                index,
                                "FillingDate",
                                e.target.value
                              )
                            }
                            disabled={data?.ITRStatus === "No"}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Profit">
                          <Input
                            placeholder="Profit"
                            value={item.Profit}
                            onChange={(e) =>
                              handleYearWiseITRChange(
                                index,
                                "Profit",
                                e.target.value
                              )
                            }
                            disabled={data?.ITRStatus === "No"}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Turn Over">
                          <Input
                            placeholder="Turn Over"
                            value={item.TurnOver}
                            onChange={(e) =>
                              handleYearWiseITRChange(
                                index,
                                "TurnOver",
                                e.target.value
                              )
                            }
                            disabled={data?.ITRStatus === "No"}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  ))}
                  {/* Button to add a new row */}
                  <Button
                    type="dashed"
                    onClick={addNewYearWiseITR}
                    style={{ marginTop: 2 }}
                  >
                    Add New Record
                  </Button>
                </Form.Item>
              </Row>
              <hr style={{ marginBottom: "50px" }} />

              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item
                    label="Do  you have Certificate of practice number ?"
                    className="FormItem"
                  >
                    <Select
                      placeholder="Select"
                      value={data?.CertificateOfPractice || ""}
                      onChange={(value) =>
                        handleSelectChangeCertificateOfPractice(
                          value,
                          "CertificateOfPractice"
                        )
                      }
                      autoComplete="off"
                      name="CertificateOfPractice"
                    >
                      <Option value="Yes">Yes</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label=" Certificate of practice number  "
                    className="FormItem"
                  >
                    <Input
                      value={data?.CertificateOfPracticeNumber || ""}
                      name="CertificateOfPracticeNumber"
                      onChange={(e) =>
                        handleInputs(
                          "CertificateOfPracticeNumber",
                          e.target.value
                        )
                      }
                      disabled={data?.CertificateOfPractice === "No"}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item
                    label="Date of  Certificate of practice number"
                    className="FormItem"
                  >
                    <Input
                      value={data?.DateOfCertificateOfPracticeNumber || ""}
                      name="DateOfCertificateOfPracticeNumber"
                      type="Date"
                      onChange={(e) =>
                        handleInputs(
                          "DateOfCertificateOfPracticeNumber",
                          e.target.value
                        )
                      }
                      disabled={data?.CertificateOfPractice === "No"}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <hr style={{ marginBottom: "50px" }} />

              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item
                    label="Do you have GST Registration number ?"
                    className="FormItem"
                  >
                    <Select
                      placeholder="Select"
                      value={data?.GstRegistration || ""}
                      onChange={(value) =>
                        handleSelectChangeGstRegistration(
                          value,
                          "GstRegistration"
                        )
                      }
                      autoComplete="off"
                      name="GstRegistration"
                    >
                      <Option value="Yes">Yes</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="GST Number" className="FormItem">
                    <Input
                      value={data?.GstNumber || ""}
                      name="GstNumber"
                      onChange={(e) =>
                        handleInputs("GstNumber", e.target.value)
                      }
                      disabled={data?.GstRegistration === "No"}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Date of Registration" className="FormItem">
                    <Input
                      value={data?.DateOfGstRegistration || ""}
                      name="DateOfGstRegistration"
                      type="Date"
                      onChange={(e) =>
                        handleInputs("DateOfGstRegistration", e.target.value)
                      }
                      disabled={data?.GstRegistration === "No"}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <hr style={{ marginBottom: "50px" }} />

              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item
                    label="Do you have Shop Act License Number ?"
                    className="FormItem"
                  >
                    <Select
                      placeholder="Select"
                      value={data?.ShopActLicence || ""}
                      onChange={(value) =>
                        handleSelectChangeShopActLicence(
                          value,
                          "ShopActLicence"
                        )
                      }
                      autoComplete="off"
                      name="ShopActLicence"
                    >
                      <Option value="Yes">Yes</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label=" Shop Act License Number"
                    className="FormItem"
                  >
                    <Input
                      value={data?.ShopActLicenceNumber || ""}
                      name="ShopActLicenceNumber"
                      onChange={(e) =>
                        handleInputs("ShopActLicenceNumber", e.target.value)
                      }
                      disabled={data?.ShopActLicence === "No"}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item
                    label="Date of Shop Act License Number"
                    className="FormItem"
                  >
                    <Input
                      value={data?.DateOfShopActLicenceNumber || ""}
                      name="DateOfShopActLicenceNumber"
                      type="Date"
                      onChange={(e) =>
                        handleInputs(
                          "DateOfShopActLicenceNumber",
                          e.target.value
                        )
                      }
                      disabled={data?.ShopActLicence === "No"}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <hr style={{ marginBottom: "50px" }} />

              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item
                    label="Do you have Aadhaar Udhyog Number ?"
                    className="FormItem"
                  >
                    <Select
                      placeholder="Select"
                      value={data?.AadharUdhyog || ""}
                      onChange={(value) =>
                        handleSelectChangeAadharUdhyog(value, "AadharUdhyog")
                      }
                      autoComplete="off"
                      name="AadharUdhyog"
                    >
                      <Option value="Yes">Yes</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label=" Aadhaar Udhyog Number"
                    className="FormItem"
                  >
                    <Input
                      value={data?.AadharUdhyogNumber || ""}
                      name="AadharUdhyogNumber"
                      onChange={(e) =>
                        handleInputs("AadharUdhyogNumber", e.target.value)
                      }
                      disabled={data?.AadharUdhyog === "No"}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item
                    label="Date of Aadhaar Udhyog Number "
                    className="FormItem"
                  >
                    <Input
                      value={data?.DateOfAadharUdhyogNumber || ""}
                      name="DateOfAadharUdhyogNumber"
                      type="Date"
                      onChange={(e) =>
                        handleInputs("DateOfAadharUdhyogNumber", e.target.value)
                      }
                      disabled={data?.AadharUdhyog === "No"}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <hr style={{ marginBottom: "50px" }} />

              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Current Account" className="FormItem">
                    <Select
                      placeholder="Select"
                      value={data?.CurrentAccount || ""}
                      onChange={(value) =>
                        handleSelectChangeCurrentAccount(
                          value,
                          "CurrentAccount"
                        )
                      }
                      autoComplete="off"
                      name="CurrentAccount"
                    >
                      <Option value="Yes">Yes</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label=" Account Number" className="FormItem">
                    <Input
                      value={data?.AccountNumber || ""}
                      name="AccountNumber"
                      onChange={(e) =>
                        handleInputs("AccountNumber", e.target.value)
                      }
                      disabled={data?.CurrentAccount === "No"} 
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Date of Opening" className="FormItem">
                    <Input
                      value={data?.DateOfOpening || ""}
                      name="DateOfOpening"
                      type="Date"
                      onChange={(e) =>
                        handleInputs("DateOfOpening", e.target.value)
                      }
                      disabled={data?.CurrentAccount === "No"} 
                    />
                  </Form.Item>
                </Col>
              </Row>
              <hr style={{ marginBottom: "50px" }} />

              <Row gutter={[8, 8]}>
                {data.BankAnalysis &&
                  data.BankAnalysis.length > 0 &&
                  data.BankAnalysis.map((item, index) => (
                    <>
                      <Col span={12} key={`tentativeABB-${index}`}>
                        <Form.Item label="Tentative ABB" className="FormItem">
                          <Input
                            placeholder="Please enter"
                            autoComplete="off"
                            name="TentativeABB" // Just the field name without BankAnalysis prefix
                            value={item.TentativeABB || ""}
                            onChange={(e) =>
                              handleInputs(
                                "BankAnalysis.TentativeABB",
                                e.target.value,
                                index
                              )
                            }
                          />
                        </Form.Item>
                      </Col>

                      <Col span={12} key={`tentativeTurnover-${index}`}>
                        <Form.Item
                          label="Tentative Turnover"
                          className="FormItem"
                        >
                          <Input
                            placeholder="Please enter"
                            autoComplete="off"
                            name="TentativeTurnover" // Just the field name without BankAnalysis prefix
                            value={item.TentativeTurnover || ""}
                            onChange={(e) =>
                              handleInputs(
                                "BankAnalysis.TentativeTurnover",
                                e.target.value,
                                index
                              )
                            }
                          />
                        </Form.Item>
                      </Col>
                    </>
                  ))}
              </Row>

              <hr style={{ marginBottom: "50px" }} />

              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item
                    label="Do you have any other source of Income?"
                    className="FormItem"
                  >
                    <Select
                      value={data?.AnotherSourceOfIncome || ""}
                      name="AnotherSourceOfIncome"
                      onChange={(value) =>
                        handleInputs("AnotherSourceOfIncome", value)
                      }
                      placeholder="Select Yes or No"
                    >
                      <Select.Option value="Yes">Yes</Select.Option>
                      <Select.Option value="No">No</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item label="Specify Other Source of Income" className="FormItem">
    <Select
        value={data?.OtherSourceOfIncome || ''}
        name="OtherSourceOfIncome"
        onChange={(value) => handleInputs('OtherSourceOfIncome', value)}
        placeholder="Select Source of Income"
        disabled={data?.AnotherSourceOfIncome === "No"} // Disable dropdown when "No" is selected
    >
        <Select.Option value="Select option" >Select option</Select.Option>
        <Select.Option value="Salary Income">Salary Income</Select.Option>
        <Select.Option value="Business Income">Business Income</Select.Option>
        <Select.Option value="Others">Others</Select.Option>
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
            tab="Professional Income Form 2"
            key="2"
          >
            <Form layout="vertical">
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Lead Id" className="FormItem">
                    <Input
                      value={data?.LeadId || ""}
                      name="LeadId"
                      onChange={(e) => handleInputs("LeadId", e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Lead Date" className="FormItem">
                    <Input
                      value={data?.LeadDate || ""}
                      name="LeadDate"
                      type="Date"
                      onChange={(e) => handleInputs("LeadDate", e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Sourcing Channel" className="FormItem">
                    <Input
                      value={data?.SourcingChanel || ""}
                      name="SourcingChanel"
                      onChange={(e) =>
                        handleInputs("SourcingChanel", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Source Name" className="FormItem">
                    <Input
                      value={data?.SourceName || ""}
                      name="SourceName"
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
                      value={data?.LoanType || ""}
                      name="LoanType"
                      onChange={(e) => handleInputs("LoanType", e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Loan Amount" className="FormItem">
                    <Input
                      value={data?.LoanAmount || ""}
                      name="LoanAmount"
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
                      value={data?.LeadName || ""}
                      name="LeadName"
                      onChange={(e) => handleInputs("LeadName", e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Mobile Number" className="FormItem">
                    <Input
                      value={data?.MobileNo1 || ""}
                      name="MobileNo1"
                      onChange={(e) =>
                        handleInputs("MobileNo1", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Email Id" className="FormItem">
                    <Input
                      value={data?.EmailId || ""}
                      name="EmailId"
                      onChange={(e) => handleInputs("EmailId", e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Date of Birth" className="FormItem">
                    <Input
                      value={data?.DateOfBirth || ""}
                      name="DateOfBirth"
                      type="Date"
                      onChange={(e) =>
                        handleInputs("DateOfBirth", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Age" className="FormItem">
                    <Input
                      value={data?.Age || ""}
                      name="Age"
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
                      value={data?.Sex || ""}
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
                      value={data?.MaritalStatus || ""}
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
                      value={data?.ResidenceType || ""}
                      name="ResidenceType"
                      onChange={(e) =>
                        handleInputs("ResidenceType", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Residence City" className="FormItem">
                    <Input
                      value={data?.ResidenceCity || ""}
                      name="ResidenceCity"
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
                    <Input
                      value={data?.PermanentAddress || ""}
                      name="PermanentAddress"
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
                      value={data?.PCity || ""}
                      name="PCity"
                      onChange={(e) => handleInputs("PCity", e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="State" className="FormItem">
                    <Input
                      value={data?.PState || ""}
                      name="PState"
                      onChange={(e) => handleInputs("PState", e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Pincode" className="FormItem">
                    <Input
                      value={data?.PPinCode || ""}
                      name="PPinCode"
                      onChange={(e) => handleInputs("PPinCode", e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <hr style={{ marginBottom: "35px" }} />

              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Income Type" className="FormItem">
                    <Input
                      value={data?.IncomeType || ""}
                      name="IncomeType"
                      onChange={(e) =>
                        handleInputs("IncomeType", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Organization Name" className="FormItem">
                    <Input
                      value={data?.OrganizationName || ""}
                      name="OrganizationName"
                      onChange={(e) =>
                        handleInputs("OrganizationName", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Designation" className="FormItem">
                    <Input
                      value={data?.Designation || ""}
                      name="Designation"
                      onChange={(e) =>
                        handleInputs("Designation", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Office Type" className="FormItem">
                    <Input
                      value={data?.OfficeType || ""}
                      name="OfficeType"
                      onChange={(e) =>
                        handleInputs("OfficeType", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Formation Type" className="FormItem">
                    <Input
                      value={data?.FormationType || ""}
                      name="FormationType"
                      onChange={(e) =>
                        handleInputs("FormationType", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Industry Type" className="FormItem">
                    <Input
                      value={data?.IndustryType || ""}
                      name="IndustryType"
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
                      value={data?.MobileNo1 || ""}
                      name="MobileNo1"
                      onChange={(e) =>
                        handleInputs("MobileNo1", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Current Experience" className="FormItem">
                    <Input
                      value={data?.CurrentExperience || ""}
                      name="CurrentExperience"
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
                      value={data?.ExperienceProof || ""}
                      name="ExperienceProof"
                      onChange={(e) =>
                        handleInputs("ExperienceProof", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Dated" className="FormItem">
                    <Input
                      value={data?.Dated || ""}
                      name="Dated"
                      type="Date"
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
                      value={data?.PFApplicability || ""}
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
                      value={data?.Form26AS || ""}
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
                    <th>Assessment Year</th>
                    <th>Gross Income</th>
                    <th>Net Income</th>
                    <th>Other Income</th>
                    <th>Total Income</th>
                    <th>Payment Mode</th>
                    <th>Date of Filing</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.IncomeDetails?.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <Input
                          placeholder="Assessment Year"
                          value={item.AssesmentYear}
                          onChange={(e) =>
                            handleIncomeDetailsChange(
                              index,
                              "AssesmentYear",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <Input
                          placeholder="Gross Income"
                          value={item.GrossIncome}
                          onChange={(e) =>
                            handleIncomeDetailsChange(
                              index,
                              "GrossIncome",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <Input
                          placeholder="Net Income"
                          value={item.NetIncome}
                          onChange={(e) =>
                            handleIncomeDetailsChange(
                              index,
                              "NetIncome",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <Input
                          placeholder="Other Income"
                          value={item.OtherIncome}
                          onChange={(e) =>
                            handleIncomeDetailsChange(
                              index,
                              "OtherIncome",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <Input
                          placeholder="Total Income"
                          value={item.TotalIncome}
                          onChange={(e) =>
                            handleIncomeDetailsChange(
                              index,
                              "TotalIncome",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <Input
                          placeholder="Payment Mode"
                          value={item.PaymentMode}
                          onChange={(e) =>
                            handleIncomeDetailsChange(
                              index,
                              "PaymentMode",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <Input
                          placeholder="Date of Filing"
                          value={item.DateOfFilling}
                          onChange={(e) =>
                            handleIncomeDetailsChange(
                              index,
                              "DateOfFilling",
                              e.target.value
                            )
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button
                type="primary"
                onClick={addIncomeDetailRow}
                style={{ marginTop: "20px", marginBottom: "15px" }}
              >
                Add Record
              </Button>

              <table
                style={{
                  marginTop: "35px",
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr>
                    <th>Turnover</th>
                    <th>ITR</th>
                    <th>GST</th>
                    <th>Banking</th>
                    <th>Export</th>
                    <th>Other</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.TurnOverDetails?.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <Form.Item>
                          <Input
                            placeholder="Turn Over"
                            value={item.TurnOver}
                            onChange={(e) =>
                              handleTurnOverDetailsChange(
                                index,
                                "TurnOver",
                                e.target.value
                              )
                            }
                          />
                        </Form.Item>
                      </td>
                      <td>
                        <Form.Item>
                          <Input
                            placeholder="ITR"
                            value={item.ITR}
                            onChange={(e) =>
                              handleTurnOverDetailsChange(
                                index,
                                "ITR",
                                e.target.value
                              )
                            }
                          />
                        </Form.Item>
                      </td>
                      <td>
                        <Form.Item>
                          <Input
                            placeholder="GST"
                            value={item.GST}
                            onChange={(e) =>
                              handleTurnOverDetailsChange(
                                index,
                                "GST",
                                e.target.value
                              )
                            }
                          />
                        </Form.Item>
                      </td>
                      <td>
                        <Form.Item>
                          <Input
                            placeholder="Banking"
                            value={item.Banking}
                            onChange={(e) =>
                              handleTurnOverDetailsChange(
                                index,
                                "Banking",
                                e.target.value
                              )
                            }
                          />
                        </Form.Item>
                      </td>
                      <td>
                        <Form.Item>
                          <Input
                            placeholder="Export"
                            value={item.Export}
                            onChange={(e) =>
                              handleTurnOverDetailsChange(
                                index,
                                "Export",
                                e.target.value
                              )
                            }
                          />
                        </Form.Item>
                      </td>
                      <td>
                        <Form.Item>
                          <Input
                            placeholder="Other"
                            value={item.Other}
                            onChange={(e) =>
                              handleTurnOverDetailsChange(
                                index,
                                "Other",
                                e.target.value
                              )
                            }
                          />
                        </Form.Item>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button
                type="primary"
                onClick={addTurnOverDetailRow}
                style={{ marginTop: "20px", marginBottom: "15px" }}
              >
                Add Record
              </Button>

              <table
                style={{
                  marginTop: "35px",
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr>
                    <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                      ABB
                    </th>
                    <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                      DR-1
                    </th>
                    <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                      DR-2
                    </th>
                    <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                      DR-3
                    </th>
                    <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                      DR-4
                    </th>
                    <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                      DR-5
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.BankDetails?.map((item, index) => (
                    <tr key={index}>
                      <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                        <Form.Item>
                          <Input
                            placeholder="ABB"
                            value={item.ABB}
                            onChange={(e) =>
                              handleBankDetailsChange(
                                index,
                                "ABB",
                                e.target.value
                              )
                            }
                          />
                        </Form.Item>
                      </td>
                      <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                        <Form.Item>
                          <Input
                            placeholder="DR-1"
                            value={item.DR1}
                            onChange={(e) =>
                              handleBankDetailsChange(
                                index,
                                "DR1",
                                e.target.value
                              )
                            }
                          />
                        </Form.Item>
                      </td>
                      <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                        <Form.Item>
                          <Input
                            placeholder="DR-2"
                            value={item.DR2}
                            onChange={(e) =>
                              handleBankDetailsChange(
                                index,
                                "DR2",
                                e.target.value
                              )
                            }
                          />
                        </Form.Item>
                      </td>
                      <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                        <Form.Item>
                          <Input
                            placeholder="DR-3"
                            value={item.DR3}
                            onChange={(e) =>
                              handleBankDetailsChange(
                                index,
                                "DR3",
                                e.target.value
                              )
                            }
                          />
                        </Form.Item>
                      </td>
                      <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                        <Form.Item>
                          <Input
                            placeholder="DR-4"
                            value={item.DR4}
                            onChange={(e) =>
                              handleBankDetailsChange(
                                index,
                                "DR4",
                                e.target.value
                              )
                            }
                          />
                        </Form.Item>
                      </td>
                      <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                        <Form.Item>
                          <Input
                            placeholder="DR-5"
                            value={item.DR5}
                            onChange={(e) =>
                              handleBankDetailsChange(
                                index,
                                "DR5",
                                e.target.value
                              )
                            }
                          />
                        </Form.Item>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button
                type="primary"
                onClick={addBankDetailRow}
                style={{ marginTop: "20px", marginBottom: "15px" }}
              >
                Add Record
              </Button>

              <div className="dl-btn-sbmt">
                <button type="button" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </Form>
          </TabPane>
        </Tabs>
      </div>
      <ToastContainer />
    </>
  );
};

export default ProfessionalIncome;
