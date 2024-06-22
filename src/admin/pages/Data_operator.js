import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button, Form, Input, Row, Col } from 'antd';

export default function Data_operator() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [filteredData, setFilteredData] = useState([]);
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
    ExistingEMI: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userCount, setUserCount] = useState(0);
  const fileInputRef = useRef(null); // Ref for file input element

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
        ExistingEMI: ''
      });
      // Fetch the updated data after successful addition
      fetchData(currentPage); 
    } catch (error) {
      console.error('Error adding data:', error);
      toast.error('Error adding data!');
    }
  };

  const fetchData = async (page) => {
    try {
      const response = await axios.get(`http://77.37.45.224:8000/api/admin/getexcelfiles?currentPage=${page}&limit=10`);
      setData(response.data.data);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPage);
      setUserCount(response.data.userCount);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    // Filter data based on selected data owner
    if (selectedOption) {
      const filtered = data.filter(item => item.DatabaseOwner === selectedOption);
      setFilteredData(filtered);
    } else {
      setFilteredData(data); // If no owner is selected, show all data
    }
  }, [selectedOption, data]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://77.37.45.224:8000/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('File uploaded successfully:', data);
        toast.success('File uploaded successfully!');

        // Clear the input field using the ref
        fileInputRef.current.value = '';

        // Clear the selected file state
        setSelectedFile(null);

        // Fetch the data again after successful upload
        fetchData(currentPage);
      } else {
        const errorData = await response.text();
        console.error('File upload failed:', errorData);
        toast.error(`File upload failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error during file upload:', error);
      toast.error('Error during file upload!');
    }
  };

  const handleDistributeData = async () => {
    try {
      const response = await axios.get('http://77.37.45.224:8000/api/admin/distributeDataToEmployees');
      console.log('Data distributed successfully:', response.data);
      toast.success('Data distributed successfully!');
    } catch (error) {
      console.error('Error distributing data:', error);
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        toast.error(`Error distributing data: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        // Request was made but no response was received
        console.error('Request data:', error.request);
        toast.error('Error distributing data: No response received from server');
      } else {
        // Something else happened while setting up the request
        console.error('Error message:', error.message);
        toast.error(`Error distributing data: ${error.message}`);
      }
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className='dop_container'>
        <a className='downloadtemplete' href="https://docs.google.com/spreadsheets/d/1zUUTTEbqAXAgsBmkBQSMRnWinDoSEfP6/export?format=xlsx" download>
          Download Template
        </a>
        <div>
          <label className='dopuploadlabel'>Upload :</label>
          <input
            ref={fileInputRef} 
            className='dopupload'
            type='file'
            name='file'
            placeholder='browse'
            onChange={handleFileChange}
          />
          <button className='fileuploadbtn' onClick={handleFileUpload}>Upload</button>
          <Button className='add-btn' onClick={openModal}>Add Data</Button>
          <Button className='add-btn' onClick={handleDistributeData}>Distribute Data</Button>

        </div>

      </div>
      <div className='table-dop-container'>
        <div>
          <select className='dop-dropdown' onChange={handleSelectChange} value={selectedOption}>
            <option className='drop-option' value=''>Select</option>
            {Array.from(new Set(data.map(item => item.DatabaseOwner))).map(owner => (
              <option key={owner} value={owner}>{owner}</option>
            ))}
          </select>
        </div>
        <table className='dop-table'>
          <thead>
            <tr>
              <th>Sr.No.</th>
              <th>Owner</th>
              <th>Data Name</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {(selectedOption === '' ? data : filteredData).map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1 + (currentPage - 1) * 10}</td>
                <td>{item.DatabaseOwner}</td>
                <td>{item.DatabaseName}</td>
                <td>{item.Name}</td>
                <td>{item.MobileNo1.substring(0, 2)}{item.MobileNo1.substring(2, item.MobileNo1.length - 2).replace(/./g, '*')}{item.MobileNo1.substring(item.MobileNo1.length - 2)}</td>
                <td>{item.Address}</td>
                <td>{item.Gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
        </Row>
      </Form>
    </Modal>
      <div className="pagination">
        <button  className='Data-op-pagination-btn' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <div>User Count: {userCount}</div>
        <button className='Data-op-pagination-btn' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
}
