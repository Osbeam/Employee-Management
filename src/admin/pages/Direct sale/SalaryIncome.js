import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Form, Input, Tabs, Select } from 'antd';
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const { TabPane } = Tabs;
const { Option } = Select;

const SalaryIncome = () => {
    const [activeKey, setActiveKey] = useState("1");
    const tabsRef = useRef(null);
    const { userId } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({});
    const [salaryDetails, setSalaryDetails] = useState([]);
    const [bankDetails, setBankDetails] = useState([]);

    const handleInputs = (name, value) => {
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleNext = () => {
        const nextKey = activeKey === "1" ? "2" : "1";
        setActiveKey(nextKey);
        tabsRef.current?.scrollIntoView();
    };

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await fetch(`http://77.37.45.224:8000/api/bussinessIncome/getAllBusinessIncome`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("jwtoken")}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("API response:", data);

                    const employeeData = data.data || [];
                    const employee = employeeData.find(emp => emp.userId === userId);

                    if (employee && employee.salaryIncome) {
                        setUser(employee.salaryIncome);
                        setSalaryDetails(employee.salaryIncome.SalaryDetails || []);
                        setBankDetails(employee.salaryIncome.BankDetails || []);
                    } else {
                        toast.error("Employee not found or salary income data missing");
                    }
                } else {
                    toast.error("Error fetching employee data");
                }
            } catch (error) {
                toast.error("Error fetching employee data");
                console.error("Error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEmployeeData();
    }, [userId]);

    const handleEdit = async () => {
        try {
            setIsLoading(true);

            // Ensure Form16 is handled correctly based on its type
            const formattedForm16 = Array.isArray(user.Form16)
                ? user.Form16.join(', ')
                : user.Form16;

            const response = await fetch(`http://77.37.45.224:8000/api/salaryIncome/EditSalaryData`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("jwtoken")}`,
                },
                body: JSON.stringify({
                    _id: userId,
                    Name: user.Name,
                    MobileNo1: user.MobileNo1,
                    LoanType: user.LoanType,
                    LoanAmount: user.LoanAmount,
                    PropertyLocation: user.PropertyLocation,
                    City: user.City,
                    IncomeType: user.IncomeType,
                    GrossSalaryPerMonth: user.GrossSalaryPerMonth,
                    NetSalaryPerMonth: user.NetSalaryPerMonth,
                    DeductionFromSalary: user.DeductionFromSalary,
                    Form16: formattedForm16,  // Handle Form16 correctly
                    LastTwoYearsForm16: user.LastTwoYearsForm16,
                    CompanyName: user.CompanyName,
                    DateOfJoining: user.DateOfJoining,
                    CompanyFormedAs: user.CompanyFormedAs,
                    BelongFromIndustry: user.BelongFromIndustry,
                    PreviousCompanyName: user.PreviousCompanyName,
                    TotalWorkExperience: user.TotalWorkExperience,
                    AnotherSourceOfIncome: user.AnotherSourceOfIncome,
                    OtherSourceOfIncome: user.OtherSourceOfIncome,
                    LeadId: user.LeadId,
                    LeadDate: user.LeadDate,
                    SourcingChanel: user.SourcingChanel,
                    SourceName: user.SourceName,
                    LeadName: user.LeadName,
                    EmailId: user.EmailId,
                    DateOfBirth: user.DateOfBirth,
                    Age: user.Age,
                    Sex: user.Sex,
                    MaritalStatus: user.MaritalStatus,
                    ResidenceType: user.ResidenceType,
                    ResidenceCity: user.ResidenceCity,
                    PermanentAddress: user.PermanentAddress,
                    PCity: user.PCity,
                    PPinCode: user.PPinCode,
                    PState: user.PState,
                    FormationType: user.FormationType,
                    OrganizationName: user.OrganizationName,
                    OfficeType: user.OfficeType,
                    Designation: user.Designation,
                    CurrentExperience: user.CurrentExperience,
                    IndustryType: user.IndustryType,
                    Dated: user.Dated,
                    ExperienceProof: user.ExperienceProof,
                    Form26AS: user.Form26AS,
                    PFApplicability: user.PFApplicability,
                    SalaryDetails: salaryDetails,
                    BankDetails: bankDetails,
                }),
            });

            if (response.ok) {
                toast.success("Employee updated successfully");
                setTimeout(() => navigate('/admin/directsales'), 1000);
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

    const handleBankDetailChange = (index, field, value) => {
        const updatedBankDetails = [...bankDetails];

        if (updatedBankDetails[index]) {
            updatedBankDetails[index][field] = value;
        } else {
            const newBankDetail = { ABB: '', DR1: '', DR2: '', DR3: '', DR4: '', DR5: '' };
            newBankDetail[field] = value;
            updatedBankDetails.push(newBankDetail);
        }

        setBankDetails(updatedBankDetails);
    };

    const handleSelectChange = (value) => {
        handleInputs('DeductionFromSalary', value);
    };
    const handleSelectChangeForm16 = (value) => {
        handleInputs('Form16', value);
    };
    const handleSelectChangeForm16Last2Year = (value) => {
        handleInputs('LastTwoYearsForm16', value);
    };
    const handleSelectChangeOtherIncomeSource = (value) => {
        handleInputs('AnotherSourceOfIncome', value);
    };
    const handleSelectChangeOtherSourceIncome = (value) => {
        handleInputs('OtherSourceOfIncome', value);
    };
    const handleSelectChangeIncomType = (value) => {
        handleInputs('IncomeType', value);
    };
    const handleSelectChangePFAapplicability = (value) => {
        handleInputs('PFApplicability', value);
    };
    const handleSelectChangeForm26AS = (value) => {
        handleInputs('Form26AS', value);
    };

    return (
        <>
            <div className="directlead-header">
                <div className="dl-heading">
                    <h2>Income Type - Salary Income</h2>
                </div>
            </div>
            <div className="breadcrumb">
                <a href="#" onClick={() => navigate('/admin/directsales')}>Direct Sales</a> &gt; <span>Salary Income</span>
            </div>
            <div className="dl-container">
                <Tabs ref={tabsRef} activeKey={activeKey} onChange={setActiveKey}>
                    <TabPane tab="Salary Income Form 1" key="1">
                        <Form layout="vertical">
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Gross Salary Per Month" className="FormItem">
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            name="GrossSalaryPerMonth"
                                            value={user.GrossSalaryPerMonth || ''}
                                            onChange={(e) => handleInputs('GrossSalaryPerMonth', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Net Salary Per Month" className="FormItem">
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            name="NetSalaryPerMonth"
                                            value={user.NetSalaryPerMonth || ''}
                                            onChange={(e) => handleInputs('NetSalaryPerMonth', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="What are the deductions from your salary?" className="FormItem">
                                        <Select
                                            mode="multiple"
                                            placeholder="Please select"
                                            value={user.DeductionFromSalary || []}
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
                                            value={user.Form16 || ''}
                                            onChange={(value) => handleSelectChangeForm16(value, 'Form16')}
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
                                    <Form.Item label="If Yes, Do you have Form 16 for last 2 years?" className="FormItem">
                                        <Select
                                            placeholder="Please select"
                                            value={user.LastTwoYearsForm16 || []}
                                            onChange={handleSelectChangeForm16Last2Year}
                                            autoComplete="off"
                                            name="LastTwoYearsForm16"
                                        >
                                            <Option value="Yes">Yes</Option>
                                            <Option value="No">No</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    {/* Empty column for alignment */}
                                </Col>
                            </Row>

                            <hr style={{ marginBottom: '50px' }} />

                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Name of the company?" className="FormItem">
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            name="CompanyName"
                                            value={user.CompanyName || ''}
                                            onChange={(e) => handleInputs('CompanyName', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Date of Joining" className="FormItem">
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            name="DateOfJoining"
                                            value={user.DateOfJoining || ''}
                                            onChange={(e) => handleInputs('DateOfJoining', e.target.value)}
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
                                            value={user.CompanyFormedAs || ''}
                                            onChange={(e) => handleInputs('CompanyFormedAs', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Your Company belongs from Industry?" className="FormItem">
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            name="BelongFromIndustry"
                                            value={user.BelongFromIndustry || ''}
                                            onChange={(e) => handleInputs('BelongFromIndustry', e.target.value)}
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
                                            value={user.PreviousCompanyName || ''}
                                            onChange={(e) => handleInputs('PreviousCompanyName', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Total Work Experience" className="FormItem">
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            name="TotalWorkExperience"
                                            value={user.TotalWorkExperience || ''}
                                            onChange={(e) => handleInputs('TotalWorkExperience', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Do you have another source of Income?" className="FormItem">
                                        <Select
                                            placeholder="Please select"
                                            value={user.AnotherSourceOfIncome || []}
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
                                    <Form.Item label="Other sources of Income?" className="FormItem">
                                        <Select
                                            placeholder="Please select"
                                            value={user.OtherSourceOfIncome || []}
                                            onChange={handleSelectChangeOtherSourceIncome}
                                            autoComplete="off"
                                            name="OtherSourceOfIncome"
                                        >
                                            <Option value="">Select</Option>
                                            <Option value="BusinessIncome">Business Income</Option>
                                            <Option value="ProfessionalIncome">Professional Income</Option>
                                            <Option value="Other">Other</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <div className="dl-btn">
                                <button type="button" onClick={handleNext}>Next</button>
                            </div>
                        </Form>
                    </TabPane>
                    <TabPane tab="Salary Income Form 2" key="2">
                        <Form layout="vertical">
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Lead Id" className="FormItem">
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            name="LeadId"
                                            value={user.LeadId || ''}
                                            onChange={(e) => handleInputs('LeadId', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Lead Date" className="FormItem">
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            name="LeadDate"
                                            value={user.LeadDate || ''}
                                            onChange={(e) => handleInputs('LeadDate', e.target.value)}
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
                                            value={user.SourcingChanel || ''}
                                            onChange={(e) => handleInputs('SourcingChanel', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Source Name" className="FormItem">
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            name="SourceName"
                                            value={user.SourceName || ''}
                                            onChange={(e) => handleInputs('SourceName', e.target.value)}
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
                                            value={user.LoanType || ''}
                                            onChange={(e) => handleInputs('LoanType', e.target.value)}
                                        />
                                    </Form.Item>

                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Loan Amount" className="FormItem">
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            name="LoanAmount"
                                            value={user.LoanAmount || ''}
                                            onChange={(e) => handleInputs('LoanAmount', e.target.value)}
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
                                            value={user.LeadName || ''}
                                            onChange={(e) => handleInputs('LeadName', e.target.value)}
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
                                            value={user.MobileNo1 || ''}
                                            onChange={(e) => handleInputs('MobileNo1', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Email Id" className="FormItem">
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            name="EmailId"
                                            value={user.EmailId || ''}
                                            onChange={(e) => handleInputs('EmailId', e.target.value)}
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
                                            name="DateOfBirth"
                                            value={user.DateOfBirth || ''}
                                            onChange={(e) => handleInputs('DateOfBirth', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Age" className="FormItem">
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            name="Age"
                                            value={user.Age || ''}
                                            onChange={(e) => handleInputs('Age', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Sex" className="FormItem">
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            name="Sex"
                                            value={user.Sex || ''}
                                            onChange={(e) => handleInputs('Sex', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Marital Status" className="FormItem">
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            name="MaritalStatus"
                                            value={user.MaritalStatus || ''}
                                            onChange={(e) => handleInputs('MaritalStatus', e.target.value)}
                                        />
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
                                            value={user.ResidenceType || ''}
                                            onChange={(e) => handleInputs('ResidenceType', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Residence City" className="FormItem">
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            name="ResidenceCity"
                                            value={user.ResidenceCity || ''}
                                            onChange={(e) => handleInputs('ResidenceCity', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[8, 8]}>
                                <Col span={24}>
                                    <Form.Item label="Permanent Address" className="FormItemAdd" >
                                        {/* <Input placeholder="Please enter" style={{ marginBottom: '15px' }} /> */}
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            name="PermanentAddress"
                                            value={user.PermanentAddress || ''}
                                            onChange={(e) => handleInputs('PermanentAddress', e.target.value)}
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
                                            value={user.PCity || ''}
                                            onChange={(e) => handleInputs('PCity', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="State" className="FormItem">
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            name="PState"
                                            value={user.PState || ''}
                                            onChange={(e) => handleInputs('PState', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Pincode" className="FormItem">
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            name="PPinCode"
                                            value={user.PPinCode || ''}
                                            onChange={(e) => handleInputs('PPinCode', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <hr style={{ marginBottom: '35px' }} />

                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Income Type" className="FormItem">
                                        <Select
                                            placeholder="Select"
                                            value={user.IncomeType || ''}
                                            onChange={(value) => handleSelectChangeIncomType(value, 'IncomeType')}
                                            autoComplete="off"
                                            name="IncomeType"
                                        >
                                            <Option value="BusinessIncome">Business Income</Option>
                                            <Option value="ProfessionalIncome">Professional Income</Option>
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
                                            value={user.OrganizationName || ''}
                                            onChange={(e) => handleInputs('OrganizationName', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Designation" className="FormItem">
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            name="Designation"
                                            value={user.Designation || ''}
                                            onChange={(e) => handleInputs('Designation', e.target.value)}
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
                                            value={user.FormationType || ''}
                                            onChange={(e) => handleInputs('FormationType', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Industry Type" className="FormItem">
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            name="IndustryType"
                                            value={user.IndustryType || ''}
                                            onChange={(e) => handleInputs('IndustryType', e.target.value)}
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
                                            value={user.MobileNo1 || ''}
                                            onChange={(e) => handleInputs('MobileNo1', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Current Experience" className="FormItem">
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            name="CurrentExperience"
                                            value={user.CurrentExperience || ''}
                                            onChange={(e) => handleInputs('CurrentExperience', e.target.value)}
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
                                            value={user.ExperienceProof || ''}
                                            onChange={(e) => handleInputs('ExperienceProof', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Dated" className="FormItem">
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            name="Dated"
                                            value={user.Dated || ''}
                                            onChange={(e) => handleInputs('Dated', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="PF Applicability" className="FormItem">
                                        <Select
                                            placeholder="Select"
                                            value={user.PFApplicability || ''}
                                            onChange={(value) => handleSelectChangePFAapplicability(value, 'PFApplicability')}
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
                                            value={user.Form26AS || ''}
                                            onChange={(value) => handleSelectChangeForm26AS(value, 'Form26AS')}
                                            autoComplete="off"
                                            name="Form26AS"
                                        >
                                            <Option value="Yes">Yes</Option>
                                            <Option value="No">No</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <hr style={{ marginBottom: '35px' }} />

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
                                    {salaryDetails.length > 0 ? (
                                        salaryDetails.map((detail, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <Input
                                                        placeholder="Enter Month"
                                                        autoComplete="off"
                                                        name={`Month_${index}`}
                                                        value={detail.Month || ''}
                                                        onChange={(e) => {
                                                            const updatedSalaryDetails = [...salaryDetails];
                                                            updatedSalaryDetails[index].Month = e.target.value;
                                                            setSalaryDetails(updatedSalaryDetails);
                                                        }}
                                                    />
                                                </td>
                                                <td>
                                                    <Input
                                                        placeholder="Enter Gross Salary"
                                                        autoComplete="off"
                                                        name={`GrossSalary_${index}`}
                                                        value={detail.GrossSalary || ''}
                                                        onChange={(e) => {
                                                            const updatedSalaryDetails = [...salaryDetails];
                                                            updatedSalaryDetails[index].GrossSalary = e.target.value;
                                                            setSalaryDetails(updatedSalaryDetails);
                                                        }}
                                                    />
                                                </td>
                                                <td>
                                                    <Input
                                                        placeholder="Enter Net Salary"
                                                        autoComplete="off"
                                                        name={`NetSalary_${index}`}
                                                        value={detail.NetSalary || ''}
                                                        onChange={(e) => {
                                                            const updatedSalaryDetails = [...salaryDetails];
                                                            updatedSalaryDetails[index].NetSalary = e.target.value;
                                                            setSalaryDetails(updatedSalaryDetails);
                                                        }}
                                                    />
                                                </td>
                                                <td>
                                                    <Input
                                                        placeholder="Enter Other Income"
                                                        autoComplete="off"
                                                        name={`OtherIncome_${index}`}
                                                        value={detail.OtherIncome || ''}
                                                        onChange={(e) => {
                                                            const updatedSalaryDetails = [...salaryDetails];
                                                            updatedSalaryDetails[index].OtherIncome = e.target.value;
                                                            setSalaryDetails(updatedSalaryDetails);
                                                        }}
                                                    />
                                                </td>
                                                <td>
                                                    <Input
                                                        placeholder="Enter Total Income"
                                                        autoComplete="off"
                                                        name={`TotalIncome_${index}`}
                                                        value={detail.TotalIncome || ''}
                                                        onChange={(e) => {
                                                            const updatedSalaryDetails = [...salaryDetails];
                                                            updatedSalaryDetails[index].TotalIncome = e.target.value;
                                                            setSalaryDetails(updatedSalaryDetails);
                                                        }}
                                                    />
                                                </td>
                                                <td>
                                                    <Input
                                                        placeholder="Enter Payment Mode"
                                                        autoComplete="off"
                                                        name={`PaymentMode_${index}`}
                                                        value={detail.PaymentMode || ''}
                                                        onChange={(e) => {
                                                            const updatedSalaryDetails = [...salaryDetails];
                                                            updatedSalaryDetails[index].PaymentMode = e.target.value;
                                                            setSalaryDetails(updatedSalaryDetails);
                                                        }}
                                                    />
                                                </td>
                                                <td>
                                                    <Input
                                                        placeholder="Enter Date of Payment"
                                                        autoComplete="off"
                                                        name={`DateOfPayment_${index}`}
                                                        value={detail.DateOfPayment || ''}
                                                        onChange={(e) => {
                                                            const updatedSalaryDetails = [...salaryDetails];
                                                            updatedSalaryDetails[index].DateOfPayment = e.target.value;
                                                            setSalaryDetails(updatedSalaryDetails);
                                                        }}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td>
                                                <Input
                                                    placeholder="Enter Month"
                                                    autoComplete="off"
                                                    name="Month"
                                                    value={user.Month || ''}
                                                    onChange={(e) => handleInputs('Month', e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    placeholder="Enter Gross Salary"
                                                    autoComplete="off"
                                                    name="GrossSalary"
                                                    value={user.GrossSalary || ''}
                                                    onChange={(e) => handleInputs('GrossSalary', e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    placeholder="Enter Net Salary"
                                                    autoComplete="off"
                                                    name="NetSalary"
                                                    value={user.NetSalary || ''}
                                                    onChange={(e) => handleInputs('NetSalary', e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    placeholder="Enter Other Income"
                                                    autoComplete="off"
                                                    name="OtherIncome"
                                                    value={user.OtherIncome || ''}
                                                    onChange={(e) => handleInputs('OtherIncome', e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    placeholder="Enter Total Income"
                                                    autoComplete="off"
                                                    name="TotalIncome"
                                                    value={user.TotalIncome || ''}
                                                    onChange={(e) => handleInputs('TotalIncome', e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    placeholder="Enter Payment Mode"
                                                    autoComplete="off"
                                                    name="PaymentMode"
                                                    value={user.PaymentMode || ''}
                                                    onChange={(e) => handleInputs('PaymentMode', e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    placeholder="Enter Date of Payment"
                                                    autoComplete="off"
                                                    name="DateOfPayment"
                                                    value={user.DateOfPayment || ''}
                                                    onChange={(e) => handleInputs('DateOfPayment', e.target.value)}
                                                />
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            <table style={{ marginTop: '35px' }}>
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
                                    {bankDetails.length > 0 ? (
                                        bankDetails.map((detail, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <Input
                                                        placeholder="Enter ABB"
                                                        autoComplete="off"
                                                        name={`ABB_${index}`}
                                                        value={detail.ABB || ''}
                                                        onChange={(e) => handleBankDetailChange(index, 'ABB', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <Input
                                                        placeholder="Enter DR-1"
                                                        autoComplete="off"
                                                        name={`DR1_${index}`}
                                                        value={detail.DR1 || ''}
                                                        onChange={(e) => handleBankDetailChange(index, 'DR1', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <Input
                                                        placeholder="Enter DR-2"
                                                        autoComplete="off"
                                                        name={`DR2_${index}`}
                                                        value={detail.DR2 || ''}
                                                        onChange={(e) => handleBankDetailChange(index, 'DR2', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <Input
                                                        placeholder="Enter DR-3"
                                                        autoComplete="off"
                                                        name={`DR3_${index}`}
                                                        value={detail.DR3 || ''}
                                                        onChange={(e) => handleBankDetailChange(index, 'DR3', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <Input
                                                        placeholder="Enter DR-4"
                                                        autoComplete="off"
                                                        name={`DR4_${index}`}
                                                        value={detail.DR4 || ''}
                                                        onChange={(e) => handleBankDetailChange(index, 'DR4', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <Input
                                                        placeholder="Enter DR-5"
                                                        autoComplete="off"
                                                        name={`DR5_${index}`}
                                                        value={detail.DR5 || ''}
                                                        onChange={(e) => handleBankDetailChange(index, 'DR5', e.target.value)}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td>
                                                <Input
                                                    placeholder="Enter ABB"
                                                    autoComplete="off"
                                                    name="ABB"
                                                    value={user.ABB || ''}
                                                    onChange={(e) => handleBankDetailChange(0, 'ABB', e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    placeholder="Enter DR-1"
                                                    autoComplete="off"
                                                    name="DR1"
                                                    value={user.DR1 || ''}
                                                    onChange={(e) => handleBankDetailChange(0, 'DR1', e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    placeholder="Enter DR-2"
                                                    autoComplete="off"
                                                    name="DR2"
                                                    value={user.DR2 || ''}
                                                    onChange={(e) => handleBankDetailChange(0, 'DR2', e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    placeholder="Enter DR-3"
                                                    autoComplete="off"
                                                    name="DR3"
                                                    value={user.DR3 || ''}
                                                    onChange={(e) => handleBankDetailChange(0, 'DR3', e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    placeholder="Enter DR-4"
                                                    autoComplete="off"
                                                    name="DR4"
                                                    value={user.DR4 || ''}
                                                    onChange={(e) => handleBankDetailChange(0, 'DR4', e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    placeholder="Enter DR-5"
                                                    autoComplete="off"
                                                    name="DR5"
                                                    value={user.DR5 || ''}
                                                    onChange={(e) => handleBankDetailChange(0, 'DR5', e.target.value)}
                                                />
                                            </td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>

                            <table style={{ marginTop: '35px' }}>
                                <thead>
                                    <tr>
                                        <th>CIBIL ANALYSIS</th>
                                        <th>3 Months</th>
                                        <th>6 Months</th>
                                        <th>12 Months</th>
                                        <th>CIBIL SCORE</th>
                                        <th>Payment Mode</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>Bounces</th>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>Enquiry</th>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>Recent Funding</th>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>Loan Eligibility</th>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="dl-btn">
                                <button type="button" onClick={handleEdit}>Save</button>
                            </div>
                        </Form>
                    </TabPane>
                </Tabs>
            </div>
        </>


    )
}

export default SalaryIncome