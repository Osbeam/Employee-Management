import React, { useEffect, useState } from "react";
import { json, useNavigate,useParams } from "react-router-dom"; // import useNavigate
import "../Branch/Branch.css";

const Branch = () => {
  const navigate = useNavigate(); // initialize the navigate function
  const [data, setData] = useState([]);
  const { userId } = useParams(); 

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(
                "http://77.37.45.224:8000/api/branch/getBranch"
              );
              const result = await response.json();
              setData(result.data);
        } catch (error) {
            console.log('Something went wrong', error)
        }
      
    };

    fetchData();
  }, []);
  


  const handleAddClick = () => {
    navigate(`/admin/${userId}/branch/addbranch/`);
 // navigate to AddBranch route when the button is clicked
  };

  const handleEditClick = (_id) => {
    navigate(`/admin/${userId}/branch/editbranch/${_id}`);
    // navigate to EditBranch route when the button is clicked
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`http://77.37.45.224:8000/api/branch/delete/${id}`,
        {
          method: 'DELETE'
        }
      )
      if(response.ok){
        setData((prevData )=> prevData.filter(item => item._id !== id))
        alert('Branch deleted successfully !')
      }else{
        alert ('Failed to delete the branch')
      }
    } catch (error) {
      alert("Error deleting branch");
    }
  };

  return (
    <>
      <div className="head-container">
        <h1>Branch</h1>
        <button onClick={handleAddClick}>Add</button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Company</th>
              <th>Branch location</th>
              <th>Branch City</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="table-container-body">
            {data.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <th>{item.Company || '-'}</th>
                <th>{item.BranchLocation || '-'}</th>
                <th>{item.BranchCity || '-'}</th>
                <th>{item.Status || '-'}</th>
                <th className="btnBranch">
                  <button onClick={()=>handleEditClick(item._id)}>Edit</button>
                  <button onClick={()=>handleDeleteClick(item._id)}>Delete</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Branch;
