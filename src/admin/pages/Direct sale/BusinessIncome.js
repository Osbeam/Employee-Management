import React, { useState, useRef } from "react";
import { Col, Row, Form, Input, Tabs, Select } from 'antd';
import { useNavigate } from "react-router-dom";

const { TabPane } = Tabs;
const { Option } = Select;

const BusinessIncome = () => {
    const [activeKey, setActiveKey] = useState("1");
    const tabsRef = useRef(null);
    const navigate = useNavigate();

    const handleNext = () => {
        const nextKey = activeKey === "1" ? "2" : "1";
        setActiveKey(nextKey);
        tabsRef.current?.scrollIntoView();
    };

    const handleSubmit = () => {

    }
    return (
        <>
            <div className="directlead-header">
                <div className="dl-heading">
                    <h2>Income Type - Business Income</h2>
                </div>
            </div>
            <div className="breadcrumb">
                <a onClick={() => navigate('/admin/directsales')}>Direct Sales</a> &gt; <span>Business Income</span>
            </div>
            <div className="dl-container">
                <Tabs ref={tabsRef} activeKey={activeKey} onChange={setActiveKey}>
                    <TabPane tab="Business Income Form 1" key="1">
                        <Form layout="vertical">
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Name of the Business" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Type of Business" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Business Industry" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Business Formation Type" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Business Formation Date" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Office Type" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Office Ownership" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Business Location" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <hr style={{ marginBottom: '50px' }} />

                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="ITR Status" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="AY Wise ( 2023-24) Filing Date  " className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="AY Wise ( 2023-24) Profit" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="AY Wise ( 2023-24) Profit" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <hr style={{ marginBottom: '50px' }} />

                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="GST Registration" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="GST Number" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Date of Registration" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <hr style={{ marginBottom: '50px' }} />

                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Industry specific registration number" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Industry specific registration" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Date of Registration" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <hr style={{ marginBottom: '50px' }} />

                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Current Account" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Account Number" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Date of Opening" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <hr style={{ marginBottom: '50px' }} />

                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Bank Analysis" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Bank Analysis" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Bank Analysis" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Bank Analysis" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <hr style={{ marginBottom: '50px' }} />

                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Exporter" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Exporter Turnover last Year" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="TDS Deduction" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <hr style={{ marginBottom: '50px' }} />

                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Do you have any other source of Income?" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Specify Other source of Income" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <div className="dl-btn">
                                <button type="button" onClick={handleNext}>Next</button>
                            </div>
                        </Form>
                    </TabPane>
                    <TabPane tab="Business Income Form 2" key="2">
                        <Form layout="vertical">
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Lead Id" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Lead Date" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Sourcing Channel" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Source Name" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Loan Type" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Loan Amount" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Lead Name" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Mobile Number" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Email Id" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Date of Birth" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Age" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Sex" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Marital Status" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Residence Type" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Residence City" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[8, 8]}>
                                <Col span={24}>
                                    <Form.Item label="Permanent Address" className="FormItemAdd" >
                                        <Input placeholder="Please enter" style={{ marginBottom: '15px' }} />
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[8, 8]}>
                                <Col span={8}>
                                    <Form.Item label="City " className="FormItem">
                                        <Select placeholder="Please select">
                                            <Option value="apartment">Apartment</Option>
                                            <Option value="house">House</Option>
                                            <Option value="villa">Villa</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="State" className="FormItem">
                                        <Select placeholder="Please select">
                                            <Option value="new-york">New York</Option>
                                            <Option value="los-angeles">Los Angeles</Option>
                                            <Option value="chicago">Chicago</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Pincode" className="FormItem">
                                        <Select placeholder="Please select">
                                            <Option value="option1">Option 1</Option>
                                            <Option value="option2">Option 2</Option>
                                            <Option value="option3">Option 3</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <hr style={{ marginBottom: '35px' }} />

                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Income Type" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>

                            </Row>
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Organization Name" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Designation" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Office Type" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>

                            </Row>
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Formation Type" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Industry Type" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Mobile Number" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Current Experience" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Experience Proof" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Dated" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="GST Applicability" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Form 16/ 26AS" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <hr style={{ marginBottom: '35px' }} />


                            <table>
                                <thead>
                                    <tr>
                                        <th>Assessment Year</th>
                                        <th>Gross Salary</th>
                                        <th>Net Salary</th>
                                        <th>Other Income</th>
                                        <th>Total Income</th>
                                        <th>Payment Mode</th>
                                        <th>Date of Filing</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>AY 2023-24</th>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>AY 2022-23</th>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>AY 2021-22</th>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>

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
                                    <tr>
                                        <th>6 Months</th>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>12 Months</th>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
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
                                    <tr>
                                        <th>Bank Name</th>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>Loan Eligibilty</th>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="dl-btn-sbmt">
                                <button type="button" onClick={handleSubmit}>Submit</button>
                            </div>
                        </Form>
                    </TabPane>
                </Tabs>
            </div>
        </>
    )
}

export default BusinessIncome