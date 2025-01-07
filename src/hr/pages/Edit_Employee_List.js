import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Breadcrumb, Typography, Row, Col } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

// const { TextArea } = Input;
const { Title } = Typography;

export default function Edit_Employee_List() {
  const { id } = useParams();
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(`http://77.37.45.224.:8000/api/user/getAllEmployee`, {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwtoken")}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          // Inspect data structure
          console.log("API response:", data);

          // Assuming data.data is an object with a nested array
          const employeeData = data.data.employees || []; // Adjust this based on actual response
          const employee = employeeData.find(emp => emp._id === id);

          if (employee) {
            setUser(employee);
          } else {
            toast.error("Employee not found");
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
  }, [id]);

  const handleInputs = (name, value) => {
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleEdit = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://77.37.45.224:8000/api/user/updateEmployeeData`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("jwtoken")}`,
        },
        body: JSON.stringify({
          _id: id,
          FirstName: user.FirstName,
          MiddleName: user.MiddleName,
          LastName: user.LastName,
          MobileNumber: user.MobileNumber,
          Password: user.Password,
          EmailId: user.EmailId,
          EmployeeID: user.EmployeeID,
          BloodGroup: user.BloodGroup,
          HighestQualification: user.HighestQualification,
          Year: user.Year,
          TotalExperience: user.TotalExperience,
          LastCompanyName: user.LastCompanyName,
          JoiningDate: user.JoiningDate,
          Reference1: user.Reference1,
          Relation1: user.Relation1,
          Address1: user.Address1,
          ReferenceName2: user.ReferenceName2,
          Relation2: user.Relation2,
          Address2: user.Address2,
          DateOfJoining: user.DateOfJoining,
          CompanyName: user.CompanyName,
          BasicSalary: user.BasicSalary,
          FixedAllowance: user.FixedAllowance,
          SpecialAllowance: user.SpecialAllowance,
          VeriableAllowance: user.VeriableAllowance,
          HRA: user.HRA,
          OfficialMobileNumber: user.OfficialMobileNumber,
          MobileIMEINumber: user.MobileIMEINumber,
          BankName: user.BankName,
          AccountHolderName: user.AccountHolderName,
          AccountNumber: user.AccountNumber,
          IFSCCode: user.IFSCCode,
          Role: user.Role,
          PanCard: user.PanCard,
          PanNumber: user.PanNumber,
          AadharCard: user.AadharCard,
          AadharNumber: user.AadharNumber,
          Photo: user.Photo,
          AddressProof: user.AddressProof,
          HighestQuaCertificate: user.HighestQuaCertificate,
          LastComRellievingLetter: user.LastComRellievingLetter,
          BankDetails: user.BankDetails,
        }),
      });

      if (response.ok) {
        toast.success("Employee updated successfully");
        setTimeout(() => navigate(`/hrpanel/${userId}/employee-list`), 1000);
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


  if (isLoading && !user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer />
      <div className="breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item>
          <Link to={`/hrpanel/${userId}/employee-list`}>Employee List</Link>

          </Breadcrumb.Item>
          <Breadcrumb.Item>Edit Employee</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div style={{ maxWidth: '100%', margin: "auto" }}>
        <Title level={2}>Edit Employee</Title>
        <Form
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          layout="horizontal"
          size="large"
        >
          <Form.Item label={<span style={{ marginRight: '65px' }}>Employee Id</span>}>
            <Input
              disabled
              value={user.EmployeeID || ''}
            />
          </Form.Item>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label={<span style={{ marginRight: '74px' }}>First Name</span>}
              >
                <Input
                  placeholder="Enter first name"
                  autoComplete="off"
                  name="FirstName"
                  value={user.FirstName || ''}
                  onChange={(e) => handleInputs('FirstName', e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '50px' }}>Middle Name</span>}>
                <Input
                  placeholder="Enter middle name"
                  autoComplete="off"
                  name="MiddleName"
                  value={user.MiddleName || ''}
                  onChange={(e) => handleInputs('MiddleName', e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '50px' }}>Last Name</span>}>
                <Input
                  placeholder="Enter last name"
                  autoComplete="off"
                  name="LastName"
                  value={user.LastName || ''}
                  onChange={(e) => handleInputs('LastName', e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '79px' }}>Mobile No</span>}>
                <Input
                  placeholder="Enter mobile number"
                  autoComplete="off"
                  name="MobileNumber"
                  value={user.MobileNumber || ''}
                  onChange={(e) => handleInputs('MobileNumber', e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '70px' }}>Password</span>}>
                <Input
                  placeholder="Enter password"
                  autoComplete="off"
                  name="Password"
                  value={user.Password || ''}
                  onChange={(e) => handleInputs('Password', e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '67px' }}>Email Id</span>}>
                <Input
                  placeholder="Enter email id"
                  autoComplete="off"
                  name="EmailId"
                  value={user.EmailId || ''}
                  onChange={(e) => handleInputs('EmailId', e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '65px' }}>Blood Group</span>}>
                <Input
                  placeholder="Enter blood group"
                  autoComplete="off"
                  name="BloodGroup"
                  value={user.BloodGroup || ''}
                  onChange={(e) => handleInputs('BloodGroup', e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '55px' }}>Qualification</span>}>
                <Input
                  placeholder="Enter highest qualification"
                  autoComplete="off"
                  name="HighestQualification"
                  value={user.HighestQualification || ''}
                  onChange={(e) => handleInputs('HighestQualification', e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '90px' }}>Year</span>}>
                <Input
                  placeholder="Enter year"
                  autoComplete="off"
                  name="Year"
                  value={user.Year || ''}
                  onChange={(e) => handleInputs('Year', e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '40px' }}>Total Experience</span>}>
                <Input
                  placeholder="Enter total experience"
                  autoComplete="off"
                  name="TotalExperience"
                  value={user.TotalExperience || ''}
                  onChange={(e) => handleInputs('TotalExperience', e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '42px' }}>Last Company</span>}>
                <Input
                  placeholder="Enter last company name"
                  autoComplete="off"
                  name="LastCompanyName"
                  value={user.LastCompanyName || ''}
                  onChange={(e) => handleInputs('LastCompanyName', e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '42px' }}>Joining Date</span>}>
                <Input
                  placeholder="Enter joining date"
                  autoComplete="off"
                  name="JoiningDate"
                  value={user.JoiningDate || ''}
                  onChange={(e) => handleInputs('JoiningDate', e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '66px' }}>Reference 1</span>}>
                <Input
                  placeholder="Enter reference 1"
                  autoComplete="off"
                  name="Reference1"
                  value={user.Reference1 || ''}
                  onChange={(e) => handleInputs('Reference1', e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '69px' }}>Relation 1</span>}>
                <Input
                  placeholder="Enter relation 1"
                  autoComplete="off"
                  name="Relation1"
                  value={user.Relation1 || ''}
                  onChange={(e) => handleInputs('Relation1', e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '57px' }}>Address 1</span>}>
                <Input
                  placeholder="Enter address 1"
                  autoComplete="off"
                  name="Address1"
                  value={user.Address1 || ''}
                  onChange={(e) => handleInputs('Address1', e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '23px' }}>Reference Name 2</span>}>
                <Input
                  placeholder="Enter reference name 2"
                  autoComplete="off"
                  name="ReferenceName2"
                  value={user.ReferenceName2 || ''}
                  onChange={(e) => handleInputs('ReferenceName2', e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '69px' }}>Relation 2</span>}>
                <Input
                  placeholder="Enter relation 2"
                  autoComplete="off"
                  name="Relation2"
                  value={user.Relation2 || ''}
                  onChange={(e) => handleInputs('Relation2', e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '57px' }}>Address 2</span>}>
                <Input
                  placeholder="Enter address 2"
                  autoComplete="off"
                  name="Address2"
                  value={user.Address2 || ''}
                  onChange={(e) => handleInputs('Address2', e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '50px' }}>Date of Joining</span>}>
                <Input
                  placeholder="Enter date of joining"
                  autoComplete="off"
                  name="DateOfJoining"
                  value={user.DateOfJoining || ''}
                  onChange={(e) => handleInputs('DateOfJoining', e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '31px' }}>Company Name</span>}>
                <Input
                  placeholder="Enter company name"
                  autoComplete="off"
                  name="CompanyName"
                  value={user.CompanyName || ''}
                  onChange={(e) => handleInputs('CompanyName', e.target.value)}
                />
              </Form.Item>
            </Col>
          
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '33px' }}>Official Mobile No.</span>}>
                <Input
                  placeholder="Enter official mobile number"
                  autoComplete="off"
                  name="OfficialMobileNumber"
                  value={user.OfficialMobileNumber || ''}
                  onChange={(e) => handleInputs('OfficialMobileNumber', e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '35px' }}>Mobile IMEI No.</span>}>
                <Input
                  placeholder="Enter mobile IMEI number"
                  autoComplete="off"
                  name="MobileIMEINumber"
                  value={user.MobileIMEINumber || ''}
                  onChange={(e) => handleInputs('MobileIMEINumber', e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '51px' }}>Bank Name</span>}>
                <Input
                  placeholder="Enter bank name"
                  autoComplete="off"
                  name="BankName"
                  value={user.BankName || ''}
                  onChange={(e) => handleInputs('BankName', e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '50px' }}>Account Holder</span>}>
                <Input
                  placeholder="Enter account holder name"
                  autoComplete="off"
                  name="AccountHolderName"
                  value={user.AccountHolderName || ''}
                  onChange={(e) => handleInputs('AccountHolderName', e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '30px' }}>Account Number</span>}>
                <Input
                  placeholder="Enter account number"
                  autoComplete="off"
                  name="AccountNumber"
                  value={user.AccountNumber || ''}
                  onChange={(e) => handleInputs('AccountNumber', e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '54px' }}>IFSC Code</span>}>
                <Input
                  placeholder="Enter IFSC code"
                  autoComplete="off"
                  name="IFSCCode"
                  value={user.IFSCCode || ''}
                  onChange={(e) => handleInputs('IFSCCode', e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '116px' }}>Role</span>}>
                <Input
                  placeholder="Enter role"
                  autoComplete="off"
                  name="Role"
                  value={user.Role || ''}
                  onChange={(e) => handleInputs('Role', e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '54px' }}>Pan Number</span>}>
                <Input
                  placeholder="Enter PanNumber"
                  autoComplete="off"
                  name="PanNumber"
                  value={user.PanNumber || ''}
                  onChange={(e) => handleInputs('PanNumber', e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '25px' }}>Aadhar Number</span>}>
                <Input
                  placeholder="Enter AadharNumber"
                  autoComplete="off"
                  name="AadharNumber"
                  value={user.AadharNumber || ''}
                  onChange={(e) => handleInputs('AadharNumber', e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
          <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '67px' }}>Basic Salary</span>}>
                <Input
                  placeholder="Enter basic salary"
                  autoComplete="off"
                  name="BasicSalary"
                  value={user.BasicSalary || ''}
                  onChange={(e) => handleInputs('BasicSalary', e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '32px' }}>Fixed Allowance</span>}>
                <Input
                  placeholder="Enter fixed allowance"
                  autoComplete="off"
                  name="FixedAllowance"
                  value={user.FixedAllowance || ''}
                  onChange={(e) => handleInputs('FixedAllowance', e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '10px' }}>Special Allowance</span>}>
                <Input
                  placeholder="Enter special allowance"
                  autoComplete="off"
                  name="SpecialAllowance"
                  value={user.SpecialAllowance || ''}
                  onChange={(e) => handleInputs('SpecialAllowance', e.target.value)}
                />
              </Form.Item>
            </Col>

          </Row>
          <Row gutter={16}>
          <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '28px' }}>Variable Allowance</span>}>
                <Input
                  placeholder="Enter variable allowance"
                  autoComplete="off"
                  name="VeriableAllowance"
                  value={user.VeriableAllowance || ''}
                  onChange={(e) => handleInputs('VeriableAllowance', e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '103px' }}>HRA</span>}>
                <Input
                  placeholder="Enter HRA"
                  autoComplete="off"
                  name="HRA"
                  value={user.HRA || ''}
                  onChange={(e) => handleInputs('HRA', e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '87px' }}>Pan Card</span>}>
                {/* File input */}
                <Input
                  type="file"
                  name="PanCard"
                  onChange={(e) => handleInputs('PanCard', e.target.value)} // Store the selected file
                />
                {/* Display existing file name */}
                {user.PanCard && typeof user.PanCard === 'string' && (
                  <div style={{ width: '260px', color: '#555' }}>
                    {user.PanCard.split('\\').pop()}
                  </div>
                )}
              </Form.Item>

            </Col>
            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '54px' }}>Aadhar Card</span>}>
                {/* File input */}
                <Input
                  type="file"
                  name="AadharCard"
                  onChange={(e) => handleInputs('AadharCard', e.target.value)} // Store the selected file
                />
                {/* Display existing file name */}
                {user.AadharCard && typeof user.AadharCard === 'string' && (
                  <div style={{ width: '260px', color: '#555' }}>
                    {user.AadharCard.split('\\').pop()}
                  </div>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '88px' }}>Photo</span>}>
                {/* File input */}
                <Input
                  type="file"
                  name="Photo"
                  onChange={(e) => handleInputs('Photo', e.target.value)} // Store the selected file
                />
                {/* Display existing file name */}
                {user.Photo && typeof user.Photo === 'string' && (
                  <div style={{ width: '260px', color: '#555' }}>
                    {user.Photo.split('\\').pop()}
                  </div>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>

            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '57px' }}>Address Proof</span>}>
                {/* File input */}
                <Input
                  type="file"
                  name="AddressProof"
                  onChange={(e) => handleInputs('AddressProof', e.target.value)} // Store the selected file
                />
                {/* Display existing file name */}
                {user.AddressProof && typeof user.AddressProof === 'string' && (
                  <div style={{ width: '260px', color: '#555' }}>
                    {user.AddressProof.split('\\').pop()}
                  </div>
                )}
              </Form.Item>

            </Col>
            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '35px' }}>Higher edu certi</span>}>
                {/* File input */}
                <Input
                  type="file"
                  name="HighestQuaCertificate"
                  onChange={(e) => handleInputs('HighestQuaCertificate', e.target.value)} // Store the selected file
                />
                {/* Display existing file name */}
                {user.HighestQuaCertificate && typeof user.HighestQuaCertificate === 'string' && (
                  <div style={{ width: '260px', color: '#555' }}>
                    {user.HighestQuaCertificate.split('\\').pop()}
                  </div>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '39px' }}>Relieve Letter</span>}>
                {/* File input */}
                <Input
                  type="file"
                  name="LastComRellievingLetter"
                  onChange={(e) => handleInputs('LastComRellievingLetter', e.target.value)} // Store the selected file
                />
                {/* Display existing file name */}
                {user.LastComRellievingLetter && typeof user.LastComRellievingLetter === 'string' && (
                  <div style={{ width: '260px', color: '#555' }}>
                    {user.LastComRellievingLetter.split('\\').pop()}
                  </div>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>

            <Col span={8}>
              <Form.Item label={<span style={{ marginRight: '69px' }}>Bank Details</span>}>
                {/* File input */}
                <Input
                  type="file"
                  name="BankDetails"
                  onChange={(e) => handleInputs('BankDetails', e.target.value)} // Store the selected file
                />
                {/* Display existing file name */}
                {user.BankDetails && typeof user.BankDetails === 'string' && (
                  <div style={{ width: '260px', color: '#555' }}>
                    {user.BankDetails.split('\\').pop()}
                  </div>
                )}
              </Form.Item>

            </Col>
          </Row>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" onClick={handleEdit} loading={isLoading}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
































// Existing Code Old one till 20/12/2024


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Form, Input, Button, Breadcrumb, Typography, Row, Col } from 'antd';
// import { ToastContainer, toast } from 'react-toastify';
// import { Link } from 'react-router-dom';

// // const { TextArea } = Input;
// const { Title } = Typography;

// export default function Edit_Employee_List() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [user, setUser] = useState({});
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const fetchEmployeeData = async () => {
//       try {
//         const response = await fetch(`http://77.37.45.224.:8000/api/user/getAllEmployee`, {
//           method: 'GET',
//           headers: {
//             "Authorization": `Bearer ${localStorage.getItem("jwtoken")}`
//           }
//         });
    
//         if (response.ok) {
//           const data = await response.json();
//           // Inspect data structure
//           console.log("API response:", data);
    
//           // Assuming data.data is an object with a nested array
//           const employeeData = data.data.employees || []; // Adjust this based on actual response
//           const employee = employeeData.find(emp => emp._id === id);
          
//           if (employee) {
//             setUser(employee);
//           } else {
//             toast.error("Employee not found");
//           }
//         } else {
//           toast.error("Error fetching employee data");
//         }
//       } catch (error) {
//         toast.error("Error fetching employee data");
//         console.error("Error:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
    

//     fetchEmployeeData();
//   }, [id]);

//   const handleInputs = (name, value) => {
//     setUser(prevUser => ({
//       ...prevUser,
//       [name]: value
//     }));
//   };

//   const handleEdit = async () => {
//     try {
//       setIsLoading(true);
//       const response = await fetch(`http://77.37.45.224:8000/api/user/updateEmployeeData`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${localStorage.getItem("jwtoken")}`,
//         },
//         body: JSON.stringify({
//           _id: id,
//           FirstName: user.FirstName,
//           MiddleName: user.MiddleName,
//           LastName: user.LastName,
//           MobileNumber: user.MobileNumber,
//           Password: user.Password,
//           EmailId: user.EmailId,
//           EmployeeID: user.EmployeeID,
//           BloodGroup: user.BloodGroup,
//           HighestQualification: user.HighestQualification,
//           Year: user.Year,
//           TotalExperience: user.TotalExperience,
//           LastCompanyName: user.LastCompanyName,
//           JoiningDate: user.JoiningDate,
//           Reference1: user.Reference1,
//           Relation1: user.Relation1,
//           Address1: user.Address1,
//           ReferenceName2: user.ReferenceName2,
//           Relation2: user.Relation2,
//           Address2: user.Address2,
//           DateOfJoining: user.DateOfJoining,
//           CompanyName: user.CompanyName,
//           BasicSalary: user.BasicSalary,
//           FixedAllowance: user.FixedAllowance,
//           SpecialAllowance: user.SpecialAllowance,
//           VeriableAllowance: user.VeriableAllowance,
//           OfficialMobileNumber: user.OfficialMobileNumber,
//           MobileIMEINumber: user.MobileIMEINumber,
//           BankName: user.BankName,
//           AccountHolderName: user.AccountHolderName,
//           AccountNumber: user.AccountNumber,
//           IFSCCode: user.IFSCCode,
//           Role: user.Role,
//           // PanCard: user.PanCard,
//           // AadharCard: user.AadharCard,
//           // Photo: user.Photo,
//           // AddressProof: user.AddressProof,
//           // HighestQuaCertificate: user.HighestQuaCertificate,
//           // LastComRellievingLetter: user.LastComRellievingLetter,
//           // BankDetails: user.BankDetails,
//         }),
//       });

//       if (response.ok) {
//         toast.success("Employee updated successfully");
//         setTimeout(() => navigate('/hrpanel/employee-list'), 1000);
//       } else {
//         toast.error("Unable to update employee");
//       }
//     } catch (error) {
//       toast.error("Unable to update employee");
//       console.error("Error updating employee:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
  

//   if (isLoading && !user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <ToastContainer />
//       <div className="breadcrumb">
//         <Breadcrumb>
//           <Breadcrumb.Item>
//             <Link to="/hrpanel/employee-list">Employee List</Link>
//           </Breadcrumb.Item>
//           <Breadcrumb.Item>Edit Employee</Breadcrumb.Item>
//         </Breadcrumb>
//       </div>
//       <div style={{ maxWidth: '100%', margin: "auto" }}>
//         <Title level={2}>Edit Employee</Title>
//         <Form
//           // labelCol={{ span: 8 }}
//           // wrapperCol={{ span: 16 }}
//           layout="horizontal"
//           size="large"
//         >
//           <Form.Item label={<span style={{ marginRight: '65px' }}>Employee Id</span>}>
//             <Input
//               disabled
//               value={user.EmployeeID || ''}
//             />
//           </Form.Item>
//           <Row gutter={16}>
//             <Col span={8}>
//               <Form.Item
//                 label={<span style={{ marginRight: '74px' }}>First Name</span>}
//               >
//                 <Input
//                   placeholder="Enter first name"
//                   autoComplete="off"
//                   name="FirstName"
//                   value={user.FirstName || ''}
//                   onChange={(e) => handleInputs('FirstName', e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item label={<span style={{ marginRight: '50px' }}>Middle Name</span>}>
//                 <Input
//                   placeholder="Enter middle name"
//                   autoComplete="off"
//                   name="MiddleName"
//                   value={user.MiddleName || ''}
//                   onChange={(e) => handleInputs('MiddleName', e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item label={<span style={{ marginRight: '50px' }}>Last Name</span>}>
//                 <Input
//                   placeholder="Enter last name"
//                   autoComplete="off"
//                   name="LastName"
//                   value={user.LastName || ''}
//                   onChange={(e) => handleInputs('LastName', e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row gutter={16}>
//             <Col span={8}>
//               <Form.Item label={<span style={{ marginRight: '79px' }}>Mobile No</span>}>
//                 <Input
//                   placeholder="Enter mobile number"
//                   autoComplete="off"
//                   name="MobileNumber"
//                   value={user.MobileNumber || ''}
//                   onChange={(e) => handleInputs('MobileNumber', e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item label={<span style={{ marginRight: '70px' }}>Password</span>}>
//                 <Input
//                   placeholder="Enter password"
//                   autoComplete="off"
//                   name="Password"
//                   value={user.Password || ''}
//                   onChange={(e) => handleInputs('Password', e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item label={<span style={{ marginRight: '67px' }}>Email Id</span>}>
//                 <Input
//                   placeholder="Enter email id"
//                   autoComplete="off"
//                   name="EmailId"
//                   value={user.EmailId || ''}
//                   onChange={(e) => handleInputs('EmailId', e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row gutter={16}>
//             <Col span={8}>
//               <Form.Item label={<span style={{ marginRight: '65px' }}>Blood Group</span>}>
//                 <Input
//                   placeholder="Enter blood group"
//                   autoComplete="off"
//                   name="BloodGroup"
//                   value={user.BloodGroup || ''}
//                   onChange={(e) => handleInputs('BloodGroup', e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item label={<span style={{ marginRight: '55px' }}>Qualification</span>}>
//                 <Input
//                   placeholder="Enter highest qualification"
//                   autoComplete="off"
//                   name="HighestQualification"
//                   value={user.HighestQualification || ''}
//                   onChange={(e) => handleInputs('HighestQualification', e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item label={<span style={{ marginRight: '90px' }}>Year</span>}>
//                 <Input
//                   placeholder="Enter year"
//                   autoComplete="off"
//                   name="Year"
//                   value={user.Year || ''}
//                   onChange={(e) => handleInputs('Year', e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row gutter={16}>
//             <Col span={8}>
//               <Form.Item label={<span style={{ marginRight: '40px' }}>Total Experience</span>}>
//                 <Input
//                   placeholder="Enter total experience"
//                   autoComplete="off"
//                   name="TotalExperience"
//                   value={user.TotalExperience || ''}
//                   onChange={(e) => handleInputs('TotalExperience', e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item label={<span style={{ marginRight: '42px' }}>Last Company</span>}>
//                 <Input
//                   placeholder="Enter last company name"
//                   autoComplete="off"
//                   name="LastCompanyName"
//                   value={user.LastCompanyName || ''}
//                   onChange={(e) => handleInputs('LastCompanyName', e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item label={<span style={{ marginRight: '42px' }}>Joining Date</span>}>
//                 <Input
//                   placeholder="Enter joining date"
//                   autoComplete="off"
//                   name="JoiningDate"
//                   value={user.JoiningDate || ''}
//                   onChange={(e) => handleInputs('JoiningDate', e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row gutter={16}>
//             <Col span={8}>
//               <Form.Item label={<span style={{ marginRight: '66px' }}>Reference 1</span>}>
//                 <Input
//                   placeholder="Enter reference 1"
//                   autoComplete="off"
//                   name="Reference1"
//                   value={user.Reference1 || ''}
//                   onChange={(e) => handleInputs('Reference1', e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item label={<span style={{ marginRight: '69px' }}>Relation 1</span>}>
//                 <Input
//                   placeholder="Enter relation 1"
//                   autoComplete="off"
//                   name="Relation1"
//                   value={user.Relation1 || ''}
//                   onChange={(e) => handleInputs('Relation1', e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item label={<span style={{ marginRight: '57px' }}>Address 1</span>}>
//                 <Input
//                   placeholder="Enter address 1"
//                   autoComplete="off"
//                   name="Address1"
//                   value={user.Address1 || ''}
//                   onChange={(e) => handleInputs('Address1', e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row gutter={16}>
//             <Col span={8}>
//               <Form.Item label={<span style={{ marginRight: '23px' }}>Reference Name 2</span>}>
//                 <Input
//                   placeholder="Enter reference name 2"
//                   autoComplete="off"
//                   name="ReferenceName2"
//                   value={user.ReferenceName2 || ''}
//                   onChange={(e) => handleInputs('ReferenceName2', e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item label={<span style={{ marginRight: '69px' }}>Relation 2</span>}>
//                 <Input
//                   placeholder="Enter relation 2"
//                   autoComplete="off"
//                   name="Relation2"
//                   value={user.Relation2 || ''}
//                   onChange={(e) => handleInputs('Relation2', e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item label={<span style={{ marginRight: '57px' }}>Address 2</span>}>
//                 <Input
//                   placeholder="Enter address 2"
//                   autoComplete="off"
//                   name="Address2"
//                   value={user.Address2 || ''}
//                   onChange={(e) => handleInputs('Address2', e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row gutter={16}>
//             <Col span={8}>
//               <Form.Item label={<span style={{ marginRight: '50px' }}>Date of Joining</span>}>
//                 <Input
//                   placeholder="Enter date of joining"
//                   autoComplete="off"
//                   name="DateOfJoining"
//                   value={user.DateOfJoining || ''}
//                   onChange={(e) => handleInputs('DateOfJoining', e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item label={<span style={{ marginRight: '31px' }}>Company Name</span>}>
//                 <Input
//                   placeholder="Enter company name"
//                   autoComplete="off"
//                   name="CompanyName"
//                   value={user.CompanyName || ''}
//                   onChange={(e) => handleInputs('CompanyName', e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item label={<span style={{ marginRight: '42px' }}>Basic Salary</span>}>
//                 <Input
//                   placeholder="Enter basic salary"
//                   autoComplete="off"
//                   name="BasicSalary"
//                   value={user.BasicSalary || ''}
//                   onChange={(e) => handleInputs('BasicSalary', e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row gutter={16}>
//             <Col span={8}>
//               <Form.Item label={<span style={{ marginRight: '43px' }}>Fixed Allowance</span>}>
//                 <Input
//                   placeholder="Enter fixed allowance"
//                   autoComplete="off"
//                   name="FixedAllowance"
//                   value={user.FixedAllowance || ''}
//                   onChange={(e) => handleInputs('FixedAllowance', e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item label={<span style={{ marginRight: '21px' }}>Special Allowance</span>}>
//                 <Input
//                   placeholder="Enter special allowance"
//                   autoComplete="off"
//                   name="SpecialAllowance"
//                   value={user.SpecialAllowance || ''}
//                   onChange={(e) => handleInputs('SpecialAllowance', e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item label={<span style={{ marginRight: '4px' }}>Variable Allowance</span>}>
//                 <Input
//                   placeholder="Enter variable allowance"
//                   autoComplete="off"
//                   name="VeriableAllowance"
//                   value={user.VeriableAllowance || ''}
//                   onChange={(e) => handleInputs('VeriableAllowance', e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row gutter={16}>
//             <Col span={8}>
//               <Form.Item label={<span style={{ marginRight: '33px' }}>Official Mobile No.</span>}>
//                 <Input
//                   placeholder="Enter official mobile number"
//                   autoComplete="off"
//                   name="OfficialMobileNumber"
//                   value={user.OfficialMobileNumber || ''}
//                   onChange={(e) => handleInputs('OfficialMobileNumber', e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item label={<span style={{ marginRight: '35px' }}>Mobile IMEI No.</span>}>
//                 <Input
//                   placeholder="Enter mobile IMEI number"
//                   autoComplete="off"
//                   name="MobileIMEINumber"
//                   value={user.MobileIMEINumber || ''}
//                   onChange={(e) => handleInputs('MobileIMEINumber', e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item label={<span style={{ marginRight: '51px' }}>Bank Name</span>}>
//                 <Input
//                   placeholder="Enter bank name"
//                   autoComplete="off"
//                   name="BankName"
//                   value={user.BankName || ''}
//                   onChange={(e) => handleInputs('BankName', e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row gutter={16}>
//             <Col span={8}>
//               <Form.Item label={<span style={{ marginRight: '50px' }}>Account Holder</span>}>
//                 <Input
//                   placeholder="Enter account holder name"
//                   autoComplete="off"
//                   name="AccountHolderName"
//                   value={user.AccountHolderName || ''}
//                   onChange={(e) => handleInputs('AccountHolderName', e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item label={<span style={{ marginRight: '30px' }}>Account Number</span>}>
//                 <Input
//                   placeholder="Enter account number"
//                   autoComplete="off"
//                   name="AccountNumber"
//                   value={user.AccountNumber || ''}
//                   onChange={(e) => handleInputs('AccountNumber', e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item label={<span style={{ marginRight: '54px' }}>IFSC Code</span>}>
//                 <Input
//                   placeholder="Enter IFSC code"
//                   autoComplete="off"
//                   name="IFSCCode"
//                   value={user.IFSCCode || ''}
//                   onChange={(e) => handleInputs('IFSCCode', e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row gutter={16}>
//             <Col span={8}>
//               <Form.Item label={<span style={{ marginRight: '116px' }}>Role</span>}>
//                 <Input
//                   placeholder="Enter role"
//                   autoComplete="off"
//                   name="Role"
//                   value={user.Role || ''}
//                   onChange={(e) => handleInputs('Role', e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//             {/* <Col span={8}>
//               <Form.Item label={<span style={{ marginRight: '74px' }}>Pan Card</span>}>
//                 <Input
//                   placeholder="Enter Pan Card no"
//                   autoComplete="off"
//                   name="PanCard"
//                   value={user.PanCard || ''}
//                   onChange={(e) => handleInputs('PanCard', e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item label={<span style={{ marginRight: '42px' }}>Aadhar Card</span>}>
//                 <Input
//                   placeholder="Enter Aadhar Card no"
//                   autoComplete="off"
//                   name="AadharCard"
//                   value={user.AadharCard || ''}
//                   onChange={(e) => handleInputs('AadharCard', e.target.value)}
//                 />
//               </Form.Item>
//             </Col> */}
//           </Row>
//           <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//             <Button type="primary" onClick={handleEdit} loading={isLoading}>
//               Save
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </>
//   );
// }
