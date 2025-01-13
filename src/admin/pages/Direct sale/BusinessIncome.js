import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Form, Input, Tabs, Button, Select } from 'antd';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';

const { TabPane } = Tabs;

const BusinessIncome = () => {
    const [activeKey, setActiveKey] = useState("1");
    const tabsRef = useRef(null);
    const navigate = useNavigate();
    const { userId } = useParams();
    const { search } = useLocation();
    const { Option } = Select;
    const [user, setUser] = useState({
        IncomeDetails: [],
        TurnOverDetails: [],
        BankDetails: []
    });

    console.log('User IncomeDetails:', user.IncomeDetails);
    const parseIncomeDetails = (queryString) => {
        const query = new URLSearchParams(queryString);
        const details = [];
        let currentDetail = {};

        query.forEach((value, key) => {
            if (key.startsWith('AssesmentYear')) {
                if (Object.keys(currentDetail).length > 0) {
                    details.push(currentDetail);
                    currentDetail = {};
                }
                currentDetail['AssesmentYear'] = value;
            } else if (key.startsWith('GrossIncome')) {
                currentDetail['GrossIncome'] = value;
            } else if (key.startsWith('NetIncome')) {
                currentDetail['NetIncome'] = value;
            } else if (key.startsWith('OtherIncome')) {
                currentDetail['OtherIncome'] = value;
            } else if (key.startsWith('TotalIncome')) {
                currentDetail['TotalIncome'] = value;
            } else if (key.startsWith('PaymentMode')) {
                currentDetail['PaymentMode'] = value;
            } else if (key.startsWith('DateOfFilling')) {
                currentDetail['DateOfFilling'] = value;
            }
        });

        if (Object.keys(currentDetail).length > 0) {
            details.push(currentDetail);
        }

        return details;
    };

    const parseTurnOverDetails = (queryString) => {
        const query = new URLSearchParams(queryString);
        const details = [];
        let currentDetail = {};

        query.forEach((value, key) => {
            if (key.startsWith('TurnOver')) {
                if (Object.keys(currentDetail).length > 0) {
                    details.push(currentDetail);
                    currentDetail = {};
                }
                currentDetail['TurnOver'] = value;
            } else if (key.startsWith('ITR')) {
                currentDetail['ITR'] = value;
            } else if (key.startsWith('GST')) {
                currentDetail['GST'] = value;
            } else if (key.startsWith('Banking')) {
                currentDetail['Banking'] = value;
            } else if (key.startsWith('Export')) {
                currentDetail['Export'] = value;
            } else if (key.startsWith('Other')) {
                currentDetail['Other'] = value;
            }
        });

        if (Object.keys(currentDetail).length > 0) {
            details.push(currentDetail);
        }

        return details;
    };

    const parseBankDetails = (queryString) => {
        const query = new URLSearchParams(queryString);
        const details = [];
        let currentDetail = {};

        query.forEach((value, key) => {
            if (key.startsWith('ABB')) {
                if (Object.keys(currentDetail).length > 0) {
                    details.push(currentDetail);
                    currentDetail = {};
                }
                currentDetail['ABB'] = value;
            } else if (key.startsWith('DR1')) {
                currentDetail['DR1'] = value;
            } else if (key.startsWith('DR2')) {
                currentDetail['DR2'] = value;
            } else if (key.startsWith('DR3')) {
                currentDetail['DR3'] = value;
            } else if (key.startsWith('DR4')) {
                currentDetail['DR4'] = value;
            } else if (key.startsWith('DR5')) {
                currentDetail['DR5'] = value;
            }
        });

        if (Object.keys(currentDetail).length > 0) {
            details.push(currentDetail);
        }

        return details;
    };


    useEffect(() => {
        const query = new URLSearchParams(search);
        const userData = {};

        query.forEach((value, key) => {
            if (key === 'IncomeDetails') {
                userData[key] = parseIncomeDetails(decodeURIComponent(value));
            } else if (key === 'TurnOverDetails') {
                userData[key] = parseTurnOverDetails(decodeURIComponent(value));
            } else if (key === 'BankDetails') {
                userData[key] = parseBankDetails(decodeURIComponent(value));
            } else {
                userData[key] = value;
            }
        });

        setUser(userData);
    }, [search]);

    const handleInputs = (name, value, index = null, detailType = 'IncomeDetails') => {
        setUser(prevUser => {
            let newDetails = [...(prevUser[detailType] || [])];

            if (index !== null) {
                if (!newDetails[index]) {
                    newDetails[index] = {};  // Initialize if it doesn't exist
                }
                newDetails[index][name] = value;
            } else {
                return { ...prevUser, [name]: value };
            }

            return { ...prevUser, [detailType]: newDetails };
        });
    };

    const handleEdit = async () => {
        try {
            const payload = {
                _id: userId,
                Name: user.Name || '',
                MobileNo1: user.MobileNo1 || '',
                LoanType: user.LoanType || '',
                IncomeType: user.IncomeType || '',
                LoanAmount: user.LoanAmount || '',
                PropertyLocation: user.PropertyLocation || '',
                City: user.City || '',
                BusinessName: user.BusinessName || '',
                TypeOfBusiness: user.TypeOfBusiness || '',
                BusinessIndustry: user.BusinessIndustry || '',
                BusinessFormationType: user.BusinessFormationType || '',
                BusinessFormationDate: user.BusinessFormationDate || '',
                OfficeType: user.OfficeType || '',
                OfficeOwnership: user.OfficeOwnership || '',
                BusinessLocation: user.BusinessLocation || '',
                ITRStatus: user.ITRStatus || '',
                YearWiseITR: user.YearWiseITR || [],
                GstRegistration: user.GstRegistration || '',
                GstNumber: user.GstNumber || '',
                DateOfGstRegistration: user.DateOfGstRegistration || '',
                IndustryRegistration: user.IndustryRegistration || '',
                IndustryNumber: user.IndustryNumber || '',
                DateOfIndustryRegistration: user.DateOfIndustryRegistration || '',
                CurrentAccount: user.CurrentAccount || '',
                AccountNumber: user.AccountNumber || '',
                DateOfOpening: user.DateOfOpening || '',
                BankAnalysis: user.BankAnalysis || '',
                Exporter: user.Exporter || '',
                ExportTurnoverLastYear: user.ExportTurnoverLastYear || '',
                TDSDeduction: user.TDSDeduction || '',
                LeadId: user.LeadId || '',
                LeadDate: user.LeadDate || '',
                SourcingChanel: user.SourcingChanel || '',
                SourceName: user.SourceName || '',
                LeadName: user.LeadName || '',
                EmailId: user.EmailId || '',
                DateOfBirth: user.DateOfBirth || '',
                Age: user.Age || '',
                Sex: user.Sex || '',
                MaritalStatus: user.MaritalStatus || '',
                ResidenceType: user.ResidenceType || '',
                ResidenceCity: user.ResidenceCity || '',
                PermanentAddress: user.PermanentAddress || '',
                PCity: user.PCity || '',
                PPinCode: user.PPinCode || '',
                PState: user.PState || '',
                FormationType: user.FormationType || '',
                OrganizationName: user.OrganizationName || '',
                OfficeType: user.OfficeType || '',
                Designation: user.Designation || '',
                CurrentExperience: user.CurrentExperience || '',
                IndustryType: user.IndustryType || '',
                Dated: user.Dated || '',
                ExperienceProof: user.ExperienceProof || '',
                Form26AS: user.Form26AS || '',
                PFApplicability: user.PFApplicability || '',
                IncomeDetails: user.IncomeDetails || [],
                TurnOverDetails: user.TurnOverDetails || [],
                BankDetails: user.BankDetails || []
            };

            console.log('Payload:', payload);

            const response = await fetch(`http://77.37.45.224:8000/api/bussinessIncome/EditBusinessData`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("jwtoken")}`
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json(); // Parse response JSON
            if (response.ok) {
                toast.success("Business income updated successfully");
                setTimeout(() => navigate(`/admin/${userId}/directsales`), 1000);
            } else {
                toast.error("Unable to update business income");
                console.error("API Error:", result);
            }
        } catch (error) {
            toast.error("Unable to update business income");
            console.error("Error updating business income:", error);
        }
    };

    const addNewRow = () => {
        setUser(prevUser => ({
            ...prevUser,
            IncomeDetails: [...(prevUser.IncomeDetails || []), {}] // Add an empty object to the array
        }));
    };
    const addNewRowTurnOver = () => {
        setUser(prevUser => ({
            ...prevUser,
            TurnOverDetails: [...(prevUser.TurnOverDetails || []), {}] // Add an empty object to the array
        }));
    };
    const addNewRowBankDetails = () => {
        setUser(prevUser => ({
            ...prevUser,
            BankDetails: [...(prevUser.BankDetails || []), {}] // Add an empty object to the array
        }));
    };
    const handleNext = () => {
        const nextKey = activeKey === "1" ? "2" : "1";
        setActiveKey(nextKey);
        tabsRef.current?.scrollIntoView();
    };

    const handleSelectChange = (value) => {
        handleInputs('ITRStatus', value);
    };
    const handleSelectChangeGstRegi = (value) => {
        handleInputs('GstRegistration', value);
    };
    const handleSelectChangeIndustryRegi = (value) => {
        handleInputs('IndustryRegistration', value);
    };
    const handleSelectChangeCurrentAcc = (value) => {
        handleInputs('CurrentAccount', value);
    };
    const handleSelectChangeExporter = (value) => {
        handleInputs('Exporter', value);
    };
    const handleSelectChangeTDSDeduction = (value) => {
        handleInputs('TDSDeduction', value);
    };
    const handleSelectChangeForm26AS = (value) => {
        handleInputs('Form26AS', value);
    };
    const handleSelectChangePFApplicability = (value) => {
        handleInputs('PFApplicability', value);
    };


    return (
        <>
            <div className="directlead-header">
                <div className="dl-heading">
                    <h2>Income Type - Business Income</h2>
                </div>
            </div>
            <div className="breadcrumb">
                <a onClick={() => navigate(`/admin/${userId}/directsales`)}>Direct Sales</a> &gt; <span>Business Income</span>
            </div>
            <div className="dl-container">
                <Tabs  ref={tabsRef} activeKey={activeKey} onChange={setActiveKey}>
                    <TabPane style={{marginTop:'50px'}}   tab="Business Income Form 1" key="1">
                        <Form layout="vertical">
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Name of the Business" className="FormItem">
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            name="BusinessName"
                                            value={user.BusinessName || ''}
                                            onChange={(e) => handleInputs('BusinessName', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Type of Business" className="FormItem">
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            name="TypeOfBusiness"
                                            value={user.TypeOfBusiness || ''}
                                            onChange={(e) => handleInputs('TypeOfBusiness', e.target.value)}
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
                                            value={user.BusinessIndustry || ''}
                                            onChange={(e) => handleInputs('BusinessIndustry', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Business Formation Type" className="FormItem">
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            name="BusinessFormationType"
                                            value={user.BusinessFormationType || ''}
                                            onChange={(e) => handleInputs('BusinessFormationType', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Business Formation Date" className="FormItem">
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            type="Date"
                                            name="BusinessFormationDate"
                                            value={user.BusinessFormationDate || ''}
                                            onChange={(e) => handleInputs('BusinessFormationDate', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Office Type" className="FormItem">
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            name="OfficeType"
                                            value={user.OfficeType || ''}
                                            onChange={(e) => handleInputs('OfficeType', e.target.value)}
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
                                            value={user.OfficeOwnership || ''}
                                            onChange={(e) => handleInputs('OfficeOwnership', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Business Location" className="FormItem">
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            name="BusinessLocation"
                                            value={user.BusinessLocation || ''}
                                            onChange={(e) => handleInputs('BusinessLocation', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <hr style={{ marginBottom: '50px' }} />

                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="ITR Status" className="FormItem">
                                        <Select
                                            placeholder="Please select"
                                            value={user.ITRStatus || []}
                                            onChange={handleSelectChange}
                                            autoComplete="off"
                                            name="ITRStatus"
                                        >
                                            <Option value="Yes">Yes</Option>
                                            <Option value="No">No</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="AY Wise ( 2023-24) Filing Date  " className="FormItem">
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            type="Date"
                                            name="FillingDate"
                                            value={user.FillingDate || ''}
                                            onChange={(e) => handleInputs('FillingDate', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="AY Wise ( 2023-24) Profit" className="FormItem">
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            name="Profit"
                                            value={user.Profit || ''}
                                            onChange={(e) => handleInputs('Profit', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="AY Wise ( 2023-24) Turn Over" className="FormItem">
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            name="TurnOver"
                                            value={user.TurnOver || ''}
                                            onChange={(e) => handleInputs('TurnOver', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <hr style={{ marginBottom: '50px' }} />

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
                                            value={user.GstNumber || ''}
                                            onChange={(e) => handleInputs('GstNumber', e.target.value)}
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
                                            value={user.DateOfGstRegistration || ''}
                                            onChange={(e) => handleInputs('DateOfGstRegistration', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <hr style={{ marginBottom: '50px' }} />

                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Industry specific registration" className="FormItem">

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
                                    <Form.Item label="Industry specific registration number" className="FormItem">
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            name="IndustryNumber"
                                            value={user.IndustryNumber || ''}
                                            onChange={(e) => handleInputs('IndustryNumber', e.target.value)}
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
                                            value={user.DateOfIndustryRegistration || ''}
                                            onChange={(e) => handleInputs('DateOfIndustryRegistration', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <hr style={{ marginBottom: '50px' }} />

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
                                            value={user.AccountNumber || ''}
                                            onChange={(e) => handleInputs('AccountNumber', e.target.value)}
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
                                            value={user.DateOfOpening || ''}
                                            onChange={(e) => handleInputs('DateOfOpening', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <hr style={{ marginBottom: '50px' }} />

                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Bank Analysis" className="FormItem">
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            name="BankAnalysis"
                                            value={user.BankAnalysis || ''}
                                            onChange={(e) => handleInputs('BankAnalysis', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Bank Analysis" className="FormItem">
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            name="GrossSalaryPerMonth"
                                            value={user.GrossSalaryPerMonth || ''}
                                            onChange={(e) => handleInputs('GrossSalaryPerMonth', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Bank Analysis" className="FormItem">
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
                                    <Form.Item label="Bank Analysis" className="FormItem">
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            name="GrossSalaryPerMonth"
                                            value={user.GrossSalaryPerMonth || ''}
                                            onChange={(e) => handleInputs('GrossSalaryPerMonth', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <hr style={{ marginBottom: '50px' }} />

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
                                    <Form.Item label="Exporter Turnover last Year" className="FormItem">
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            name="ExportTurnoverLastYear"
                                            value={user.ExportTurnoverLastYear || ''}
                                            onChange={(e) => handleInputs('ExportTurnoverLastYear', e.target.value)}
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
                            <hr style={{ marginBottom: '50px' }} />

                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Do you have any other source of Income?" className="FormItem">
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
                                    <Form.Item label="Specify Other source of Income" className="FormItem">
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            name="GrossSalaryPerMonth"
                                            value={user.GrossSalaryPerMonth || ''}
                                            onChange={(e) => handleInputs('GrossSalaryPerMonth', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <div className="dl-btn">
                                <button type="button" onClick={handleNext}>Next</button>
                            </div>
                        </Form>
                    </TabPane>
                    <TabPane style={{marginTop:'50px'}}  tab="Business Income Form 2" key="2">
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
                                            type="Date"
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
                                            placeholder="Please enter"
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
                                            type="Date"
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
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            name="IncomeType"
                                            value={user.IncomeType || ''}
                                            onChange={(e) => handleInputs('IncomeType', e.target.value)}
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
                                            value={user.OrganizationName || ''}
                                            onChange={(e) => handleInputs('OrganizationName', e.target.value)}
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
                                            value={user.Designation || ''}
                                            onChange={(e) => handleInputs('Designation', e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Office Type" className="FormItem">
                                        <Input
                                            placeholder="Please enter"
                                            autoComplete="off"
                                            name="OfficeType"
                                            value={user.OfficeType || ''}
                                            onChange={(e) => handleInputs('OfficeType', e.target.value)}
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
                                            type="Date"
                                            name="Dated"
                                            value={user.Dated || ''}
                                            onChange={(e) => handleInputs('Dated', e.target.value)}
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
                            <hr style={{ marginBottom: '35px' }} />

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
                                    {Array.isArray(user.IncomeDetails) && user.IncomeDetails.length > 0 ? (
                                        user.IncomeDetails.map((detail, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <Input
                                                        placeholder="Enter Assessment Year"
                                                        value={detail.AssesmentYear || ''}
                                                        onChange={(e) => handleInputs('AssesmentYear', e.target.value, index)}
                                                    />
                                                </td>
                                                <td>
                                                    <Input
                                                        placeholder="Enter Gross Income"
                                                        value={detail.GrossIncome || ''}
                                                        onChange={(e) => handleInputs('GrossIncome', e.target.value, index)}
                                                    />
                                                </td>
                                                <td>
                                                    <Input
                                                        placeholder="Enter Net Income"
                                                        value={detail.NetIncome || ''}
                                                        onChange={(e) => handleInputs('NetIncome', e.target.value, index)}
                                                    />
                                                </td>
                                                <td>
                                                    <Input
                                                        placeholder="Enter Other Income"
                                                        value={detail.OtherIncome || ''}
                                                        onChange={(e) => handleInputs('OtherIncome', e.target.value, index)}
                                                    />
                                                </td>
                                                <td>
                                                    <Input
                                                        placeholder="Enter Total Income"
                                                        value={detail.TotalIncome || ''}
                                                        onChange={(e) => handleInputs('TotalIncome', e.target.value, index)}
                                                    />
                                                </td>
                                                <td>
                                                    <Input
                                                        placeholder="Enter Payment Mode"
                                                        value={detail.PaymentMode || ''}
                                                        onChange={(e) => handleInputs('PaymentMode', e.target.value, index)}
                                                    />
                                                </td>
                                                <td>
                                                    <Input
                                                        placeholder="Enter Date of Filing"
                                                        value={detail.DateOfFilling || ''}
                                                        onChange={(e) => handleInputs('DateOfFilling', e.target.value, index)}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        // Render empty inputs for entering new data if no income details are available
                                        <tr>
                                            <td>
                                                <Input
                                                    placeholder="Enter Assessment Year"
                                                    onChange={(e) => handleInputs('AssesmentYear', e.target.value, 0)}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    placeholder="Enter Gross Income"
                                                    onChange={(e) => handleInputs('GrossIncome', e.target.value, 0)}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    placeholder="Enter Net Income"
                                                    onChange={(e) => handleInputs('NetIncome', e.target.value, 0)}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    placeholder="Enter Other Income"
                                                    onChange={(e) => handleInputs('OtherIncome', e.target.value, 0)}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    placeholder="Enter Total Income"
                                                    onChange={(e) => handleInputs('TotalIncome', e.target.value, 0)}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    placeholder="Enter Payment Mode"
                                                    onChange={(e) => handleInputs('PaymentMode', e.target.value, 0)}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    placeholder="Enter Date of Filing"
                                                    onChange={(e) => handleInputs('DateOfFilling', e.target.value, 0)}
                                                />
                                            </td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>
                            <Button onClick={addNewRow}>Add New Row</Button>

                            <table style={{ marginTop: '35px' }}>
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
                                    {Array.isArray(user.TurnOverDetails) && user.TurnOverDetails.length > 0 ? (
                                        user.TurnOverDetails.map((detail, index) => (
                                            <tr key={index}>

                                                <td>
                                                    <Input
                                                        placeholder="TurnOver"
                                                        value={detail.TurnOver || ''}
                                                        onChange={(e) => handleInputs('TurnOver', e.target.value, index, 'TurnOverDetails')}
                                                    />
                                                </td>
                                                <td>
                                                    <Input
                                                        placeholder="ITR"
                                                        value={detail.ITR || ''}
                                                        onChange={(e) => handleInputs('ITR', e.target.value, index, 'TurnOverDetails')}
                                                    />
                                                </td>
                                                <td>
                                                    <Input
                                                        placeholder="GST"
                                                        value={detail.GST || ''}
                                                        onChange={(e) => handleInputs('GST', e.target.value, index, 'TurnOverDetails')}
                                                    />
                                                </td>
                                                <td>
                                                    <Input
                                                        placeholder="Banking"
                                                        value={detail.Banking || ''}
                                                        onChange={(e) => handleInputs('Banking', e.target.value, index, 'TurnOverDetails')}
                                                    />
                                                </td>
                                                <td>
                                                    <Input
                                                        placeholder="Export"
                                                        value={detail.Export || ''}
                                                        onChange={(e) => handleInputs('Export', e.target.value, index, 'TurnOverDetails')}
                                                    />
                                                </td>
                                                <td>
                                                    <Input
                                                        placeholder="Other"
                                                        value={detail.Other || ''}
                                                        onChange={(e) => handleInputs('Other', e.target.value, index, 'TurnOverDetails')}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td>
                                                <Input
                                                    placeholder="TurnOver"
                                                    onChange={(e) => handleInputs('TurnOver', e.target.value, 0, 'TurnOverDetails')}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    placeholder="ITR"
                                                    onChange={(e) => handleInputs('ITR', e.target.value, 0, 'TurnOverDetails')}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    placeholder="GST"
                                                    onChange={(e) => handleInputs('GST', e.target.value, 0, 'TurnOverDetails')}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    placeholder="Banking"
                                                    onChange={(e) => handleInputs('Banking', e.target.value, 0, 'TurnOverDetails')}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    placeholder="Export"
                                                    onChange={(e) => handleInputs('Export', e.target.value, 0, 'TurnOverDetails')}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    placeholder="Other"
                                                    onChange={(e) => handleInputs('Other', e.target.value, 0, 'TurnOverDetails')}
                                                />
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>


                            <Button onClick={addNewRowTurnOver}>Add New Row</Button>

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
                                    {Array.isArray(user.BankDetails) && user.BankDetails.length > 0 ? (
                                        user.BankDetails.map((detail, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <Input
                                                        placeholder="ABB"
                                                        value={detail.ABB || ''}
                                                        onChange={(e) => handleInputs('ABB', e.target.value, index, 'BankDetails')}
                                                    />
                                                </td>
                                                <td>
                                                    <Input
                                                        placeholder="DR-1"
                                                        value={detail.DR1 || ''}
                                                        onChange={(e) => handleInputs('DR1', e.target.value, index, 'BankDetails')}
                                                    />
                                                </td>
                                                <td>
                                                    <Input
                                                        placeholder="DR-2"
                                                        value={detail.DR2 || ''}
                                                        onChange={(e) => handleInputs('DR2', e.target.value, index, 'BankDetails')}
                                                    />
                                                </td>
                                                <td>
                                                    <Input
                                                        placeholder="DR-3"
                                                        value={detail.DR3 || ''}
                                                        onChange={(e) => handleInputs('DR3', e.target.value, index, 'BankDetails')}
                                                    />
                                                </td>
                                                <td>
                                                    <Input
                                                        placeholder="DR-4"
                                                        value={detail.DR4 || ''}
                                                        onChange={(e) => handleInputs('DR4', e.target.value, index, 'BankDetails')}
                                                    />
                                                </td>
                                                <td>
                                                    <Input
                                                        placeholder="DR-5"
                                                        value={detail.DR5 || ''}
                                                        onChange={(e) => handleInputs('DR5', e.target.value, index, 'BankDetails')}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td>
                                                <Input
                                                    placeholder="ABB"
                                                    onChange={(e) => handleInputs('ABB', e.target.value, 0, 'BankDetails')}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    placeholder="DR-1"
                                                    onChange={(e) => handleInputs('DR1', e.target.value, 0, 'BankDetails')}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    placeholder="DR-2"
                                                    onChange={(e) => handleInputs('DR2', e.target.value, 0, 'BankDetails')}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    placeholder="DR-3"
                                                    onChange={(e) => handleInputs('DR3', e.target.value, 0, 'BankDetails')}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    placeholder="DR-4"
                                                    onChange={(e) => handleInputs('DR4', e.target.value, 0, 'BankDetails')}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    placeholder="DR-5"
                                                    onChange={(e) => handleInputs('DR5', e.target.value, 0, 'BankDetails')}
                                                />
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <Button onClick={addNewRowBankDetails}>Add New Row</Button>
                            <div className="dl-btn-sbmt">
                                <button type="button" onClick={handleEdit}>Submit</button>
                            </div>
                        </Form>
                    </TabPane>
                </Tabs>
            </div>
        </>
    )
}

export default BusinessIncome
