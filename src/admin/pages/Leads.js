import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button, Form, Input, Row, Col } from 'antd';


export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null); 
  const [formData, setFormData] = useState({
    DatabaseName: '',
    DatabaseOwner: '',
    DatabaseType: '',
    MobileNo1: '',
    MobileNo2: '',
    EmailId: '',
    Address: '',
    PinCode: '',
    Qualification: '',
    Gender: '',
    DateOfBirth: '',
    Age: '',
    IncomeType: '',
    Income: '',
    Industry: '',
    CibilScore: '',
    ExistingLoanAmt: '',
    ExistingROI: '',
    ExistingEMI: '',
    LeadFrom: ''
  });
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://77.37.45.224:8000/api/admin/manualDataUpload', formData);
      console.log('Data added successfully:', response.data);
      toast.success('Data added successfully!');
      setIsModalOpen(false);
      setFormData({
        DatabaseName: '',
        DatabaseOwner: '',
        DatabaseType: '',
        MobileNo1: '',
        MobileNo2: '',
        EmailId: '',
        Address: '',
        PinCode: '',
        Qualification: '',
        Gender: '',
        DateOfBirth: '',
        Age: '',
        IncomeType: '',
        Income: '',
        Industry: '',
        CibilScore: '',
        ExistingLoanAmt: '',
        ExistingROI: '',
        ExistingEMI: '',
        LeadForm:''
      });
      // Fetch the updated data after successful addition
      fetchLeads(); 
    } catch (error) {
      console.error('Error adding data:', error);
      toast.error('Error adding data!');
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchLeads = async () => {
    try {
      const response = await axios.get('http://77.37.45.224:8000/api/admin/LeadFromData');
      setLeads(response.data.data.LeadFromData); // Access the nested LeadFromData array
    } catch (error) {
      console.error('Error fetching leads data:', error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const distributeData = async () => {
    try {
      const response = await axios.get('http://77.37.45.224:8000/api/admin/leadDistributeToEmployees');
      if (response.status === 200) {
        if (response.data.success && response.data.message === "No data to distribute.") {
          toast.info('No data to distribute.');
        } else {
          toast.success('Data distributed successfully!');
        }
        fetchLeads(); // Refetch the leads data to refresh the table
      } else {
        toast.error('Failed to distribute data. Status code: ' + response.status);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error('Error distributing data: 404 Not Found');
      } else {
        toast.error('Error distributing data: ' + error.message);
      }
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://77.37.45.224:8000/api/admin/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        toast.success('File uploaded successfully!');
          // Clear the input field using the ref
          fileInputRef.current.value = '';

          // Clear the selected file state
          setSelectedFile(null);
  
     
        fetchLeads(); // Refetch the leads data to refresh the table if necessary
      } else {
        toast.error('Failed to upload file.');
      }
    } catch (error) {
      toast.error('Error uploading file: ' + error.message);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="lead-main-container">
        <div className="lead-head-section">
          <a className="lead-down-temp" href="https://docs.google.com/spreadsheets/d/1l0l9i1JvzRWSIUK4gE7uLE7pDxz7JygU/export?format=xlsx" download>
            Download Template
          </a>
          <div className="inner-head-section">
            <div>
              <label>Upload :</label>
              <input
                ref={fileInputRef} 
                className="lead-upload-input"
                type="file"
                name="file"
                placeholder="browse"
                onChange={handleFileChange}
              />
            </div>
            <Button className="lead-add-btn" onClick={handleFileUpload}>Upload File</Button>
            <Button className="lead-add-btn" onClick={openModal}>Add Data</Button>

            <Button className="lead-add-btn" onClick={distributeData}>
              Distribute Data
            </Button>
          </div>
          <div className="lead-table-section">
            <table className="lead-table">
              <thead>
                <tr>
                  <th className="lead-th">Sr. No.</th>
                  <th className="lead-th">Database Name</th>
                  <th className="lead-th">Database Owner</th>
                  <th className="lead-th">Database Type</th>
                  <th className="lead-th">Mobile No. 1</th>
                  <th className="lead-th">Mobile No. 2</th>
                  <th className="lead-th">Email Id</th>
                  <th className="lead-th">Address</th>
                  <th className="lead-th">Pin Code</th>
                  <th className="lead-th">Qualification</th>
                  <th className="lead-th">Gender</th>
                  <th className="lead-th">Date of Birth</th>
                  <th className="lead-th">Age</th>
                  <th className="lead-th">Income Type</th>
                  <th className="lead-th">Income</th>
                  <th className="lead-th">Industry</th>
                  <th className="lead-th">Cibil Score</th>
                  <th className="lead-th">Existing Loan Amt</th>
                  <th className="lead-th">Existing ROI</th>
                  <th className="lead-th">Existing EMI</th>
                  <th className="lead-th">Is Called</th>
                  <th className="lead-th">Lead From</th>
                  {/* <th className="lead-th">Assigned To</th> */}
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, index) => (
                  <tr key={lead._id}>
                    <td>{index + 1}</td>
                    <td>{lead.DatabaseName}</td>
                    <td>{lead.DatabaseOwner}</td>
                    <td>{lead.DatabaseType}</td>
                    <td>91{lead.MobileNo1.substring(2).replace(/./g, '*')}</td>
                    <td>91{lead.MobileNo2.substring(2).replace(/./g, '*')}</td>
                    <td>{lead.EmailId}</td>
                    <td>{lead.Address}</td>
                    <td>{lead.PinCode}</td>
                    <td>{lead.Qualification}</td>
                    <td>{lead.Gender}</td>
                    <td>{lead.DateOfBirth}</td>
                    <td>{lead.Age}</td>
                    <td>{lead.IncomeType}</td>
                    <td>{lead.Income}</td>
                    <td>{lead.Industry}</td>
                    <td>{lead.CibilScore}</td>
                    <td>{lead.ExistingLoanAmt}</td>
                    <td>{lead.ExistingROI}</td>
                    <td>{lead.ExistingEMI}</td>
                    <td>{lead.IsCalled ? 'Yes' : 'No'}</td>
                    <td>{lead.LeadFrom}</td>
                    {/* <td>{lead.AssignedTo}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Modal title="Add Data" visible={isModalOpen} onOk={handleSubmit} onCancel={handleCancel} className="custom-modal">
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item label="Database Name">
              <Input name="DatabaseName" value={formData.DatabaseName} onChange={handleInputChange} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Database Owner">
              <Input name="DatabaseOwner" value={formData.DatabaseOwner} onChange={handleInputChange} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Database Type">
              <Input name="DatabaseType" value={formData.DatabaseType} onChange={handleInputChange} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Name">
              <Input name="Name" value={formData.Name} onChange={handleInputChange} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item label="Mobile Number 1">
              <Input name="MobileNo1" value={formData.MobileNo1} onChange={handleInputChange} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Mobile Number 2">
              <Input name="MobileNo2" value={formData.MobileNo2} onChange={handleInputChange} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Email">
              <Input name="EmailId" value={formData.EmailId} onChange={handleInputChange} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Address">
              <Input name="Address" value={formData.Address} onChange={handleInputChange} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item label="Pin Code">
              <Input name="PinCode" value={formData.PinCode} onChange={handleInputChange} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Qualification">
              <Input name="Qualification" value={formData.Qualification} onChange={handleInputChange} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Gender">
              <Input name="Gender" value={formData.Gender} onChange={handleInputChange} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Date of Birth">
              <Input type='Date' name="DateOfBirth" value={formData.DateOfBirth} onChange={handleInputChange} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item label="Age">
              <Input name="Age" value={formData.Age} onChange={handleInputChange} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Income Type">
              <Input name="IncomeType" value={formData.IncomeType} onChange={handleInputChange} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Income">
              <Input name="Income" value={formData.Income} onChange={handleInputChange} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Industry">
              <Input name="Industry" value={formData.Industry} onChange={handleInputChange} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item label="Cibil Score">
              <Input name="CibilScore" value={formData.CibilScore} onChange={handleInputChange} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Existing Loan Amount">
              <Input name="ExistingLoanAmt" value={formData.ExistingLoanAmt} onChange={handleInputChange} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Existing ROI">
              <Input name="ExistingROI" value={formData.ExistingROI} onChange={handleInputChange} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Existing EMI">
              <Input name="ExistingEMI" value={formData.ExistingEMI} onChange={handleInputChange} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Lead Form">
              <Input name="LeadFrom" value={formData.LeadFrom} onChange={handleInputChange} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
    </>
  );
}
