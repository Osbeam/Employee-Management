import React, { useState } from "react";
import { Radio } from "antd";
import { useNavigate, useParams } from "react-router-dom"; // To navigate after submitting the form
import "../Branch/Branch.css";

const AddBranch = () => {
  // Use a single state object for all form fields
  const [formData, setFormData] = useState({
    company: "",
    branchCity: "",
    branchLocation: "",
    status: 1, // Default status is Active
  });

  const navigate = useNavigate(); // To navigate back to the branch list page after success
 const { userId } = useParams(); 
  // Handle radio button change
  const onStatusChange = (e) => {
    setFormData({
      ...formData,
      status: e.target.value,
    });
  };

  // Handle input change for text inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Dynamically update the value for the specific field
    });
  };

  // Handle form submit (POST request)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the form data to the backend API
    try {
      const response = await fetch(
        "http://77.37.45.224:8000/api/branch/create", // POST API URL
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Company: formData.company,
            BranchLocation: formData.branchLocation,
            BranchCity: formData.branchCity,
            Status: formData.status === 1 ? "Active" : "Inactive", // Convert status to string
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Branch added successfully:", result);
        // Navigate to the branch list page or show success message
        alert("Branch added successfully!");
        navigate(`/admin/${userId}/branch`); // Navigate back to the branches list page
      } else {
        console.log("Error adding branch");
        alert("Failed to add branch.");
      }
    } catch (error) {
      console.log("Error in the POST request:", error);
      alert("An error occurred while adding the branch.");
    }
  };

  return (
    <>
      <div className="head-container">
        <h1>Add Branch</h1>
      </div>
      <div className="table-container-addbranch">
        <form className="branch-form" onSubmit={handleSubmit}>
          <div className="inner-container-branch">
            <div>
              <label>Company Name : </label>
              <select
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                required
              >
                <option value="">--- Select ---</option>
                <option value="Osbeam IT">Osbeam IT</option>
                <option value="Shawniks">Shawniks</option>
                <option value="Shaw Associates">Shaw Associates</option>
              </select>
            </div>
            <div>
              <label style={{ marginRight: "37px" }}>Branch City : </label>
              <input
                name="branchCity"
                placeholder="Enter branch city"
                value={formData.branchCity}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Branch Location : </label>
              <input
                name="branchLocation"
                placeholder="Enter branch location"
                value={formData.branchLocation}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="status-div-branch">
              <label style={{ marginRight: "92px" }}>Status : </label>
              <Radio.Group onChange={onStatusChange} value={formData.status}>
                <Radio value={1}>Active</Radio>
                <Radio value={2}>Inactive</Radio>
              </Radio.Group>
            </div>
            <div className="addbranchbtn">
              <button type="submit">Add Branch</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBranch;
