import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Form, Input, Tabs, Button, Select } from "antd";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const { TabPane } = Tabs;

const BusinessIncome = () => {
  const [activeKey, setActiveKey] = useState("1");
  const tabsRef = useRef(null);
  const navigate = useNavigate();
  const { userId, dataId } = useParams();
  const { Option } = Select;
  const [user, setUser] = useState({
    IncomeDetails: [],
    TurnOverDetails: [],
    BankDetails: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://77.37.45.224:8000/api/salaryIncome/getAllIncomeInfo`
        );
        const data = await response.json();

        if (data.success) {
          const businessIncome = data.data.BusinessIncome.find(
            (income) => income._id === dataId
          );
          if (businessIncome) {
            setUser(businessIncome); // Populate user state with fetched business income data
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

  const handleInputs = (
    name,
    value,
    index = null,
    detailType = "BankAnalysis"
  ) => {
    setUser((prevUser) => {
      // Ensure the detail type array is initialized
      let updatedDetails = [...(prevUser[detailType] || [])];

      if (name.includes("YearWiseITR")) {
        const [field, subField] = name.split("."); // Extract the field and subfield

        // Initialize the array if it's empty
        if (!updatedDetails[index]) {
          updatedDetails[index] = {};
        }

        // Update the specific subfield for the given index
        if (index !== null) {
          updatedDetails[index][subField] = value;
        }
      } else if (name.includes("BankAnalysis")) {
        const [field, subField] = name.split("."); // Extract the field and subfield

        // Initialize the array if it's empty
        if (!updatedDetails[index]) {
          updatedDetails[index] = {};
        }

        // Update the specific subfield for the given index
        if (index !== null) {
          updatedDetails[index][subField] = value;
        }
      } else if (name.startsWith("IncomeDetails")) {
        const subField = name.split(".")[1]; // Extract the subfield (e.g., "GrossIncome")

        // Initialize the array if it's empty
        if (!updatedDetails[index]) {
          updatedDetails[index] = {};
        }

        // Update the specific subfield for the given index
        if (index !== null) {
          updatedDetails[index][subField] = value;
        }
      } else {
        // Handle non-array fields
        return { ...prevUser, [name]: value };
      }

      // Return the updated user object
      return { ...prevUser, [detailType]: updatedDetails };
    });
  };

  //   const handleInputs = (
  //     name,
  //     value,
  //     index = null,
  //     detailType = "IncomeDetails"
  //   ) => {
  //     setUser((prevUser) => {
  //       let updatedDetails = [...(prevUser[detailType] || [])];

  //       // Handle for nested fields like IncomeDetails
  //       if (name.startsWith("IncomeDetails")) {
  //         const subField = name.split(".")[1]; // Extract the subfield (e.g., "GrossIncome")

  //         if (index !== null && updatedDetails[index]) {
  //           updatedDetails[index] = {
  //             ...updatedDetails[index],
  //             [subField]: value, // Update the correct field in the array
  //           };
  //         }
  //       } else {
  //         // For non-nested fields, handle them directly
  //         return { ...prevUser, [name]: value };
  //       }

  //       // Return updated user object with updated details
  //       return { ...prevUser, [detailType]: updatedDetails };
  //     });
  //   };


  // Handle inputs for IncomeDetails
  const handleIncomeDetailsInputs = (field, value, index) => {
    const updatedIncomeDetails = [...user.IncomeDetails];
    if (!updatedIncomeDetails[index]) {
      updatedIncomeDetails[index] = {};
    }
    updatedIncomeDetails[index][field] = value;
    setUser({ ...user, IncomeDetails: updatedIncomeDetails });
  };

  const handleTurnOverDetailsInput = (name, value, index) => {
    setUser((prevUser) => {
      const updatedTurnOverDetails = [...(prevUser.TurnOverDetails || [])];

      // Ensure the target row exists
      if (!updatedTurnOverDetails[index]) {
        updatedTurnOverDetails[index] = {};
      }

      // Update the field in the specified row
      updatedTurnOverDetails[index] = {
        ...updatedTurnOverDetails[index],
        [name]: value,
      };

      return { ...prevUser, TurnOverDetails: updatedTurnOverDetails };
    });
  };

  // Handle input for BankDetails specifically
  const handleBankDetailsInputs = (field, value, index) => {
    const updatedBankDetails = [...user.BankDetails];
    if (!updatedBankDetails[index]) {
      updatedBankDetails[index] = {}; // Ensure the row exists
    }
    updatedBankDetails[index][field] = value;
    setUser({ ...user, BankDetails: updatedBankDetails });
  };

  const handleEdit = async () => {
    try {
      const payload = { ...user, _id: dataId };

      const response = await fetch(
        `http://77.37.45.224:8000/api/bussinessIncome/EditBusinessData`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtoken")}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      if (response.ok) {
        toast.success("Business income updated successfully");
        setTimeout(() => navigate(`/admin/${userId}/directsales`), 2000);
      } else {
        toast.error("Unable to update business income");
        console.error("API Error:", result);
      }
    } catch (error) {
      toast.error("Unable to update business income");
      console.error("Error updating business income:", error);
    }
  };

  //   const parseIncomeDetails = (queryString) => {
  //     const query = new URLSearchParams(queryString);
  //     const details = [];
  //     let currentDetail = {};

  //     query.forEach((value, key) => {
  //       if (key.startsWith("AssesmentYear")) {
  //         if (Object.keys(currentDetail).length > 0) {
  //           details.push(currentDetail);
  //           currentDetail = {};
  //         }
  //         currentDetail["AssesmentYear"] = value;
  //       } else if (key.startsWith("GrossIncome")) {
  //         currentDetail["GrossIncome"] = value;
  //       } else if (key.startsWith("NetIncome")) {
  //         currentDetail["NetIncome"] = value;
  //       } else if (key.startsWith("OtherIncome")) {
  //         currentDetail["OtherIncome"] = value;
  //       } else if (key.startsWith("TotalIncome")) {
  //         currentDetail["TotalIncome"] = value;
  //       } else if (key.startsWith("PaymentMode")) {
  //         currentDetail["PaymentMode"] = value;
  //       } else if (key.startsWith("DateOfFilling")) {
  //         currentDetail["DateOfFilling"] = value;
  //       }
  //     });

  //     if (Object.keys(currentDetail).length > 0) {
  //       details.push(currentDetail);
  //     }

  //     return details;
  //   };

  //   const parseTurnOverDetails = (queryString) => {
  //     const query = new URLSearchParams(queryString);
  //     const details = [];
  //     let currentDetail = {};

  //     query.forEach((value, key) => {
  //       if (key.startsWith("TurnOver")) {
  //         if (Object.keys(currentDetail).length > 0) {
  //           details.push(currentDetail);
  //           currentDetail = {};
  //         }
  //         currentDetail["TurnOver"] = value;
  //       } else if (key.startsWith("ITR")) {
  //         currentDetail["ITR"] = value;
  //       } else if (key.startsWith("GST")) {
  //         currentDetail["GST"] = value;
  //       } else if (key.startsWith("Banking")) {
  //         currentDetail["Banking"] = value;
  //       } else if (key.startsWith("Export")) {
  //         currentDetail["Export"] = value;
  //       } else if (key.startsWith("Other")) {
  //         currentDetail["Other"] = value;
  //       }
  //     });

  //     if (Object.keys(currentDetail).length > 0) {
  //       details.push(currentDetail);
  //     }

  //     return details;
  //   };

  //   const parseBankDetails = (queryString) => {
  //     const query = new URLSearchParams(queryString);
  //     const details = [];
  //     let currentDetail = {};

  //     query.forEach((value, key) => {
  //       if (key.startsWith("ABB")) {
  //         if (Object.keys(currentDetail).length > 0) {
  //           details.push(currentDetail);
  //           currentDetail = {};
  //         }
  //         currentDetail["ABB"] = value;
  //       } else if (key.startsWith("DR1")) {
  //         currentDetail["DR1"] = value;
  //       } else if (key.startsWith("DR2")) {
  //         currentDetail["DR2"] = value;
  //       } else if (key.startsWith("DR3")) {
  //         currentDetail["DR3"] = value;
  //       } else if (key.startsWith("DR4")) {
  //         currentDetail["DR4"] = value;
  //       } else if (key.startsWith("DR5")) {
  //         currentDetail["DR5"] = value;
  //       }
  //     });

  //     if (Object.keys(currentDetail).length > 0) {
  //       details.push(currentDetail);
  //     }

  //     return details;
  //   };

  const addNewRow = () => {
    setUser((prevUser) => ({
      ...prevUser,
      IncomeDetails: [...(prevUser.IncomeDetails || []), {}], // Add an empty object to the array
    }));
  };

  const addTurnOverRow = () => {
    setUser((prevUser) => ({
      ...prevUser,
      TurnOverDetails: [...(prevUser.TurnOverDetails || []), {}], // Add an empty object to the array
    }));
  };

  const addNewBankRow = () => {
    setUser((prevUser) => ({
      ...prevUser,
      BankDetails: [...(prevUser.BankDetails || []), {}], // Add an empty object to the array
    }));
  };

  const addNewYearWiseITR = () => {
    setUser((prevData) => ({
      ...prevData,
      YearWiseITR: [
        ...prevData.YearWiseITR,
        { FillingDate: "", Profit: "", TurnOver: "" }, // Default values for new row
      ],
    }));
  };

  const handleYearWiseITRChange = (index, field, value) => {
    const updatedYearWiseITR = [...user.YearWiseITR];
    updatedYearWiseITR[index][field] = value;
    setUser((prevData) => ({
      ...prevData,
      YearWiseITR: updatedYearWiseITR,
    }));
  };

  const handleNext = () => {
    const nextKey = activeKey === "1" ? "2" : "1";
    setActiveKey(nextKey);
    tabsRef.current?.scrollIntoView();
  };

  const handleSelectChange = (value) => {
    handleInputs("ITRStatus", value);
  };
  const handleSelectChangeGstRegi = (value) => {
    handleInputs("GstRegistration", value);
  };
  const handleSelectChangeIndustryRegi = (value) => {
    handleInputs("IndustryRegistration", value);
  };
  const handleSelectChangeCurrentAcc = (value) => {
    handleInputs("CurrentAccount", value);
  };
  const handleSelectChangeExporter = (value) => {
    handleInputs("Exporter", value);
  };
  const handleSelectChangeTDSDeduction = (value) => {
    handleInputs("TDSDeduction", value);
  };
  const handleSelectChangeForm26AS = (value) => {
    handleInputs("Form26AS", value);
  };
  const handleSelectChangePFApplicability = (value) => {
    handleInputs("PFApplicability", value);
  };
  const handleSelectChangeAnotherIncome = (value) => {
    // Update the value in the user state without triggering tab change
    handleInputs("AnotherSourceOfIncome", value);
  };
  const handleSelectChangeOtherIncome = (value) => {
    handleInputs("OtherSourceOfIncome", value);
  };

  return (
    <>
      <div className="directlead-header">
        <div className="dl-heading">
          <h2>Income Type - Business Income</h2>
        </div>
      </div>
      <div className="breadcrumb">
        <a onClick={() => navigate(`/admin/${userId}/directsales`)}>
          Direct Sales
        </a>{" "}
        &gt; <span>Business Income</span>
      </div>
      <div className="dl-container">
        <Tabs ref={tabsRef} activeKey={activeKey} onChange={setActiveKey}>
          <TabPane
            style={{ marginTop: "50px" }}
            tab="Business Income Form 1"
            key="1"
          >
            <Form layout="vertical">
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Name of the Business" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="BusinessName"
                      value={user.BusinessName || ""}
                      onChange={(e) =>
                        handleInputs("BusinessName", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Type of Business" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="TypeOfBusiness"
                      value={user.TypeOfBusiness || ""}
                      onChange={(e) =>
                        handleInputs("TypeOfBusiness", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Business Industry" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="BusinessIndustry  "
                      value={user.BusinessIndustry || ""}
                      onChange={(e) =>
                        handleInputs("BusinessIndustry", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Business Formation Type"
                    className="FormItem"
                  >
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="BusinessFormationType"
                      value={user.BusinessFormationType || ""}
                      onChange={(e) =>
                        handleInputs("BusinessFormationType", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item
                    label="Business Formation Date"
                    className="FormItem"
                  >
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      type="Date"
                      name="BusinessFormationDate"
                      value={user.BusinessFormationDate || ""}
                      onChange={(e) =>
                        handleInputs("BusinessFormationDate", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Office Type" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="OfficeType"
                      value={user.OfficeType || ""}
                      onChange={(e) =>
                        handleInputs("OfficeType", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Office Ownership" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="OfficeOwnership"
                      value={user.OfficeOwnership || ""}
                      onChange={(e) =>
                        handleInputs("OfficeOwnership", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Business Location" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="BusinessLocation"
                      value={user.BusinessLocation || ""}
                      onChange={(e) =>
                        handleInputs("BusinessLocation", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <hr style={{ marginBottom: "50px" }} />

              <Form.Item label="Year Wise ITR" className="FormItem">
                {user?.YearWiseITR?.map((item, index) => (
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
                          disabled={user?.ITRStatus === "No"}
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
                          disabled={user?.ITRStatus === "No"}
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
                          disabled={user?.ITRStatus === "No"}
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

              <hr style={{ marginBottom: "50px" }} />

              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="GST Registration" className="FormItem">
                    <Select
                      placeholder="Please select"
                      value={user.GstRegistration || []}
                      onChange={handleSelectChangeGstRegi}
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
                      placeholder="Please enter"
                      autoComplete="off"
                      name="GstNumber"
                      value={user.GstNumber || ""}
                      onChange={(e) =>
                        handleInputs("GstNumber", e.target.value)
                      }
                      disabled={user?.GstRegistration === "No"}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Date of Registration" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      type="Date"
                      name="DateOfGstRegistration"
                      value={user.DateOfGstRegistration || ""}
                      onChange={(e) =>
                        handleInputs("DateOfGstRegistration", e.target.value)
                      }
                      disabled={user?.GstRegistration === "No"}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <hr style={{ marginBottom: "50px" }} />

              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item
                    label="Industry specific registration"
                    className="FormItem"
                  >
                    <Select
                      placeholder="Please select"
                      value={user.IndustryRegistration || []}
                      onChange={handleSelectChangeIndustryRegi}
                      autoComplete="off"
                      name="IndustryRegistration"
                    >
                      <Option value="Yes">Yes</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Industry specific registration number"
                    className="FormItem"
                  >
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="IndustryNumber"
                      value={user.IndustryNumber || ""}
                      onChange={(e) =>
                        handleInputs("IndustryNumber", e.target.value)
                      }
                      disabled={user?.IndustryRegistration === "No"}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Date of Registration" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      type="Date"
                      name="DateOfIndustryRegistration"
                      value={user.DateOfIndustryRegistration || ""}
                      onChange={(e) =>
                        handleInputs(
                          "DateOfIndustryRegistration",
                          e.target.value
                        )
                      }
                      disabled={user?.IndustryRegistration === "No"}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <hr style={{ marginBottom: "50px" }} />

              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Current Account" className="FormItem">
                    <Select
                      placeholder="Please select"
                      value={user.CurrentAccount || []}
                      onChange={handleSelectChangeCurrentAcc}
                      autoComplete="off"
                      name="CurrentAccount"
                    >
                      <Option value="Yes">Yes</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Account Number" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="AccountNumber"
                      value={user.AccountNumber || ""}
                      onChange={(e) =>
                        handleInputs("AccountNumber", e.target.value)
                      }
                      disabled={user?.CurrentAccount === "No"}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Date of Opening" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      type="Date"
                      name="DateOfOpening"
                      value={user.DateOfOpening || ""}
                      onChange={(e) =>
                        handleInputs("DateOfOpening", e.target.value)
                      }
                      disabled={user?.CurrentAccount === "No"}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <hr style={{ marginBottom: "50px" }} />

              <Row gutter={[8, 8]}>
                {user.BankAnalysis &&
                  user.BankAnalysis.length > 0 &&
                  user.BankAnalysis.map((item, index) => (
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
                  <Form.Item label="Exporter" className="FormItem">
                    <Select
                      placeholder="Please select"
                      value={user.Exporter || []}
                      onChange={handleSelectChangeExporter}
                      autoComplete="off"
                      name="Exporter"
                    >
                      <Option value="Yes">Yes</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Exporter Turnover last Year"
                    className="FormItem"
                  >
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="ExportTurnoverLastYear"
                      value={user.ExportTurnoverLastYear || ""}
                      onChange={(e) =>
                        handleInputs("ExportTurnoverLastYear", e.target.value)
                      }
                      disabled={user?.Exporter === "No"}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="TDS Deduction" className="FormItem">
                    <Select
                      placeholder="Please select"
                      value={user.TDSDeduction || []}
                      onChange={handleSelectChangeTDSDeduction}
                      autoComplete="off"
                      name="TDSDeduction"
                    >
                      <Option value="Yes">Yes</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <hr style={{ marginBottom: "50px" }} />

              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item
                    label="Do you have any other source of Income?"
                    className="FormItem"
                  >
                    <Select
                      placeholder="Please select"
                      value={user.AnotherSourceOfIncome || []}
                      onChange={handleSelectChangeAnotherIncome} // No tab change here
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
                    label="Specify Other source of Income"
                    className="FormItem"
                  >
                    <Select
                      placeholder="Please select"
                      value={user.OtherSourceOfIncome || []}
                      onChange={handleSelectChangeOtherIncome} // No tab change here
                      autoComplete="off"
                      name="OtherSourceOfIncome"
                      disabled={user?.AnotherSourceOfIncome === "No"}
                    >
                      <Option value="Salary Income">Salary Income</Option>
                      <Option value="Professional Income">
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
            tab="Business Income Form 2"
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
                      value={user.LeadId || ""}
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
                      value={user.LeadDate || ""}
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
                      value={user.SourcingChanel || ""}
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
                      value={user.SourceName || ""}
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
                      placeholder="Please enter"
                      autoComplete="off"
                      name="LoanType"
                      value={user.LoanType || ""}
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
                      value={user.LoanAmount || ""}
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
                      value={user.LeadName || ""}
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
                      value={user.MobileNo1 || ""}
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
                      value={user.EmailId || ""}
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
                      value={user.DateOfBirth || ""}
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
                      value={user.Age || ""}
                      onChange={(e) => handleInputs("Age", e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Sex" className="FormItem">
                    <Select
                      placeholder="Please select"
                      value={user.Sex || ""}
                      name="Sex"
                      onChange={(value) => handleInputs("Sex", value)}
                    >
                      <Select.Option value="Male">Male</Select.Option>
                      <Select.Option value="Female">Female</Select.Option>
                      <Select.Option value="Other">Other</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Marital Status" className="FormItem">
                    <Select
                      placeholder="Please select"
                      value={user.MaritalStatus || ""}
                      name="MaritalStatus"
                      onChange={(value) => handleInputs("MaritalStatus", value)}
                    >
                      <Select.Option value="Married">Married</Select.Option>
                      <Select.Option value="Unmarried">Unmarried</Select.Option>
                      <Select.Option value="Other">Other</Select.Option>
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
                      value={user.ResidenceType || ""}
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
                      value={user.ResidenceCity || ""}
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
                      placeholder="Please enter"
                      autoComplete="off"
                      name="PermanentAddress"
                      value={user.PermanentAddress || ""}
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
                      value={user.PCity || ""}
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
                      value={user.PState || ""}
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
                      value={user.PPinCode || ""}
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
                      placeholder="Please enter"
                      autoComplete="off"
                      name="IncomeType"
                      value={user.IncomeType || ""}
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
                      placeholder="Please enter"
                      autoComplete="off"
                      name="OrganizationName"
                      value={user.OrganizationName || ""}
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
                      placeholder="Please enter"
                      autoComplete="off"
                      name="Designation"
                      value={user.Designation || ""}
                      onChange={(e) =>
                        handleInputs("Designation", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Office Type" className="FormItem">
                    <Input
                      placeholder="Please enter"
                      autoComplete="off"
                      name="OfficeType"
                      value={user.OfficeType || ""}
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
                      placeholder="Please enter"
                      autoComplete="off"
                      name="FormationType"
                      value={user.FormationType || ""}
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
                      value={user.IndustryType || ""}
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
                      value={user.MobileNo1 || ""}
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
                      value={user.CurrentExperience || ""}
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
                      value={user.ExperienceProof || ""}
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
                      value={user.Dated || ""}
                      onChange={(e) => handleInputs("Dated", e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="PFA Applicability" className="FormItem">
                    <Select
                      placeholder="Please select"
                      value={user.PFApplicability || []}
                      onChange={handleSelectChangePFApplicability}
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
                      placeholder="Please select"
                      value={user.Form26AS || []}
                      onChange={handleSelectChangeForm26AS}
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
                  {user.IncomeDetails.length > 0 ? (
                    user.IncomeDetails.map((detail, index) => (
                      <tr key={index}>
                        {[
                          "AssesmentYear",
                          "GrossIncome",
                          "NetIncome",
                          "OtherIncome",
                          "TotalIncome",
                          "PaymentMode",
                          "DateOfFilling",
                        ].map((field) => (
                          <td key={field}>
                            <Input
                              placeholder={`Enter ${field}`}
                              value={detail[field] || ""}
                              onChange={(e) =>
                                handleIncomeDetailsInputs(
                                  field,
                                  e.target.value,
                                  index
                                )
                              }
                            />
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      {[
                        "AssesmentYear",
                        "GrossIncome",
                        "NetIncome",
                        "OtherIncome",
                        "TotalIncome",
                        "PaymentMode",
                        "DateOfFilling",
                      ].map((field) => (
                        <td key={field}>
                          <Input
                            placeholder={`Enter ${field}`}
                            onChange={(e) =>
                              handleIncomeDetailsInputs(
                                field,
                                e.target.value,
                                0
                              )
                            }
                          />
                        </td>
                      ))}
                    </tr>
                  )}
                </tbody>
              </table>
              <Button onClick={addNewRow}>Add New Row</Button>

              <table style={{ marginTop: "35px" }}>
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
                  {Array.isArray(user.TurnOverDetails) &&
                  user.TurnOverDetails.length > 0 ? (
                    user.TurnOverDetails.map((detail, index) => (
                      <tr key={index}>
                        <td>
                          <Input
                            placeholder="TurnOver"
                            value={detail.TurnOver || ""}
                            onChange={(e) =>
                              handleTurnOverDetailsInput(
                                "TurnOver",
                                e.target.value,
                                index
                              )
                            }
                          />
                        </td>
                        <td>
                          <Input
                            placeholder="ITR"
                            value={detail.ITR || ""}
                            onChange={(e) =>
                              handleTurnOverDetailsInput(
                                "ITR",
                                e.target.value,
                                index
                              )
                            }
                          />
                        </td>
                        <td>
                          <Input
                            placeholder="GST"
                            value={detail.GST || ""}
                            onChange={(e) =>
                              handleTurnOverDetailsInput(
                                "GST",
                                e.target.value,
                                index
                              )
                            }
                          />
                        </td>
                        <td>
                          <Input
                            placeholder="Banking"
                            value={detail.Banking || ""}
                            onChange={(e) =>
                              handleTurnOverDetailsInput(
                                "Banking",
                                e.target.value,
                                index
                              )
                            }
                          />
                        </td>
                        <td>
                          <Input
                            placeholder="Export"
                            value={detail.Export || ""}
                            onChange={(e) =>
                              handleTurnOverDetailsInput(
                                "Export",
                                e.target.value,
                                index
                              )
                            }
                          />
                        </td>
                        <td>
                          <Input
                            placeholder="Other"
                            value={detail.Other || ""}
                            onChange={(e) =>
                              handleTurnOverDetailsInput(
                                "Other",
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
                      <td colSpan="6">No Data Available</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <Button onClick={addTurnOverRow}>Add New Row</Button>

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
                  {user.BankDetails.length > 0 ? (
                    user.BankDetails.map((detail, index) => (
                      <tr key={index}>
                        {["ABB", "DR1", "DR2", "DR3", "DR4", "DR5"].map(
                          (field) => (
                            <td key={field}>
                              <Input
                                placeholder={`Enter ${field}`}
                                value={detail[field] || ""}
                                onChange={(e) =>
                                  handleBankDetailsInputs(
                                    field,
                                    e.target.value,
                                    index
                                  )
                                }
                              />
                            </td>
                          )
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      {["ABB", "DR1", "DR2", "DR3", "DR4", "DR5"].map(
                        (field) => (
                          <td key={field}>
                            <Input
                              placeholder={`Enter ${field}`}
                              onChange={(e) =>
                                handleBankDetailsInputs(
                                  field,
                                  e.target.value,
                                  0
                                )
                              }
                            />
                          </td>
                        )
                      )}
                    </tr>
                  )}
                </tbody>
              </table>
              <Button onClick={addNewBankRow}>Add New Row</Button>

              <div className="dl-btn-sbmt">
                <button type="button" onClick={handleEdit}>
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

export default BusinessIncome;
