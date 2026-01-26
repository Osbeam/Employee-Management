import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Assuming you are using this for toasts
import { Button, Input, Radio, Select } from "antd";
import "../Branch/Branch.css";

const { Option } = Select;

const EditBranch = () => {
  const { id } = useParams(); // Get the branch ID from the URL
  const { userId } = useParams();
  const navigate = useNavigate();

  const [branch, setBranch] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(1); // Default status as Active

  useEffect(() => {
    const fetchBranchData = async () => {
      try {
        const response = await fetch(`http://77.37.45.224:8000/api/branch/getBranch`, {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwtoken")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const branchData = data.data.find((branch) => branch._id === id);

          if (branchData) {
            setBranch(branchData);
            setStatus(branchData.Status === "Active" ? 1 : 2);
          } else {
            toast.error("Branch not found");
          }
        } else {
          toast.error("Error fetching branch data");
        }
      } catch (error) {
        toast.error("Error fetching branch data");
        console.error("Error:", error);
      }
    };

    fetchBranchData();
  }, [id]);

  const handleInputs = (name, value) => {
    setBranch((prevBranch) => ({
      ...prevBranch,
      [name]: value,
    }));
  };

  const handleEdit = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://77.37.45.224:8000/api/branch/updateBranch`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("jwtoken")}`,
        },
        body: JSON.stringify({
          _id: id, 
          Company: branch.Company,
          BranchLocation: branch.BranchLocation,
          BranchCity: branch.BranchCity,
          Status: status === 1 ? "Active" : "Inactive",
        }),
      });

      if (response.ok) {
        toast.success("Branch updated successfully");
        setTimeout(() => navigate(`/admin/${userId}/branch`), 1000); 
      } else {
        toast.error("Unable to update branch");
      }
    } catch (error) {
      toast.error("Unable to update branch");
      console.error("Error updating branch:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="head-container">
        <h1>Edit Branch</h1>
      </div>
      <div className="table-container-addbranch">
        <form className="branch-form">
          <div className="inner-container-branch">
            <div>
              <label style={{marginRight:'8px'}}>Company Name:</label>
              <Select
              style={{marginBottom:'12px', width:'210px'}}
                value={branch.Company || ""}
                onChange={(value) => handleInputs("Company", value)}
                placeholder="Select Company"
              >
                <Option value="Osbeam IT">Osbeam IT</Option>
                <Option value="Shawniks">Shawniks</Option>
                <Option value="Shaw Associates">Shaw Associates</Option>
              </Select>
            </div>

            <div>
              <label style={{ marginRight: "37px" }}>Branch City:</label>
              <Input
                value={branch.BranchCity || ""}
                onChange={(e) => handleInputs("BranchCity", e.target.value)}
                placeholder="Enter branch city"
              />
            </div>

            <div>
              <label>Branch Location:</label>
              <Input
                value={branch.BranchLocation || ""}
                onChange={(e) => handleInputs("BranchLocation", e.target.value)}
                placeholder="Enter branch location"
              />
            </div>

            <div className="status-div-branch">
              <label style={{ marginRight: "92px" }}>Status:</label>
              <Radio.Group
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <Radio value={1}>Active</Radio>
                <Radio value={2}>Inactive</Radio>
              </Radio.Group>
            </div>

            <div>
              <Button
                type="primary"
                onClick={handleEdit}
                loading={isLoading}
                disabled={isLoading}
              >
                Update Branch
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditBranch;
