import React, { useState, useRef } from "react";
import { Col, Row, Form, Input, Tabs, Select } from 'antd';
import { Navigate, useNavigate } from "react-router-dom";

const { TabPane } = Tabs;
const { Option } = Select;


const SalaryIncome = () => {
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
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Net Salary Per Month" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="What are the deductions from your salary?" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Is Form 16 Available?" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="If Yes, Do you have Form 16 for last 2 years?" className="FormItem">
                                        <Input placeholder="Please enter" />
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
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Date of Joining" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Your company is formed as?" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Your Company belongs from Industry?" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Previous Company Name" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Total Work Experience" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[8, 8]}>
                                <Col span={12}>
                                    <Form.Item label="Do you have another source of Income?" className="FormItem">
                                        <Input placeholder="Please enter" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Other sources of Income?" className="FormItem">
                                        <Input placeholder="Please enter" />
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
                                <Col span={12}>
                                    <Form.Item label="Designation" className="FormItem">
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
                                    <Form.Item label="PF Applicability" className="FormItem">
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
                                    <tr>
                                        <th>June</th>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>May</th>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>April</th>
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
                                        <th>Bank Name</th>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>Bank Name</th>
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

export default SalaryIncome