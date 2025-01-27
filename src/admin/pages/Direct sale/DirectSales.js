import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "antd";
import { jsPDF } from "jspdf";

const DirectSales = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userCount, setUserCount] = useState(0);
  const [pageSize] = useState(10);
  const navigate = useNavigate();

  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async (page) => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://77.37.45.224:8000/api/bussinessIncome/getAllBusinessIncome?currentPage=${page}&limit=${pageSize}`
        );
        if (response.data.success) {
          setEmployees(response.data.data);
          setCurrentPage(response.data.pagination.currentPage);
          setUserCount(response.data.pagination.totalCount);
          setTotalPages(response.data.pagination.totalPages);
        } else {
          console.error("Failed to fetch data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(currentPage);
  }, [currentPage, pageSize]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleEdit = (employee, currentPage) => {
    const { salaryIncome, businessIncome, professionalIncome } = employee;

    // Serialize the salaryIncome, businessIncome, or professionalIncome data into query parameters
    const serializeIncome = (income, type) => {
      const serializeArray = (arr) =>
        Array.isArray(arr) ? arr.join(", ") : arr || "";
      const serializeIncomeDetails = (details) => {
        return details
          .map(
            (detail) =>
              `AssesmentYear=${encodeURIComponent(
                detail.AssesmentYear || ""
              )}&` +
              `GrossIncome=${encodeURIComponent(detail.GrossIncome || "")}&` +
              `NetIncome=${encodeURIComponent(detail.NetIncome || "")}&` +
              `OtherIncome=${encodeURIComponent(detail.OtherIncome || "")}&` +
              `TotalIncome=${encodeURIComponent(detail.TotalIncome || "")}&` +
              `PaymentMode=${encodeURIComponent(detail.PaymentMode || "")}&` +
              `DateOfFilling=${encodeURIComponent(detail.DateOfFilling || "")}`
          )
          .join("&");
      };
      const serializeTurnOverDetails = (details) => {
        return details
          .map(
            (detail) =>
              `TurnOver=${encodeURIComponent(detail.TurnOver || "")}&` +
              `ITR=${encodeURIComponent(detail.ITR || "")}&` +
              `GST=${encodeURIComponent(detail.GST || "")}&` +
              `Banking=${encodeURIComponent(detail.Banking || "")}&` +
              `Export=${encodeURIComponent(detail.Export || "")}&` +
              `Other=${encodeURIComponent(detail.Other || "")}`
          )
          .join("&");
      };
      const serializeBankDetails = (details) => {
        return details
          .map(
            (detail) =>
              `ABB=${encodeURIComponent(detail.ABB || "")}&` +
              `DR1=${encodeURIComponent(detail.DR1 || "")}&` +
              `DR2=${encodeURIComponent(detail.DR2 || "")}&` +
              `DR3=${encodeURIComponent(detail.DR3 || "")}&` +
              `DR4=${encodeURIComponent(detail.DR4 || "")}&` +
              `DR5=${encodeURIComponent(detail.DR5 || "")}`
          )
          .join("&");
      };

      if (type === "salary") {
      } else if (type === "business") {
        return (
          `Name=${encodeURIComponent(income.Name || "")}&` +
          `LoanType=${encodeURIComponent(income.LoanType || "")}&` +
          `LeadId=${encodeURIComponent(income.LeadId || "")}&` +
          `LoanAmount=${encodeURIComponent(income.LoanAmount || "")}&` +
          `PropertyLocation=${encodeURIComponent(
            income.PropertyLocation || ""
          )}&` +
          `City=${encodeURIComponent(serializeArray(income.City))}&` +
          `IncomeType=${encodeURIComponent(
            serializeArray(income.IncomeType)
          )}&` +
          `BusinessName=${encodeURIComponent(income.BusinessName || "")}&` +
          `TypeOfBusiness=${encodeURIComponent(income.TypeOfBusiness || "")}&` +
          `BusinessIndustry=${encodeURIComponent(
            income.BusinessIndustry || ""
          )}&` +
          `BusinessFormationType=${encodeURIComponent(
            income.BusinessFormationType || ""
          )}&` +
          `BusinessFormationDate=${encodeURIComponent(
            income.BusinessFormationDate || ""
          )}&` +
          `OfficeType=${encodeURIComponent(income.OfficeType || "")}&` +
          `OfficeOwnership=${encodeURIComponent(
            income.OfficeOwnership || ""
          )}&` +
          `BusinessLocation=${encodeURIComponent(
            income.BusinessLocation || ""
          )}&` +
          `ITRStatus=${encodeURIComponent(serializeArray(income.ITRStatus))}&` +
          `FillingDate=${encodeURIComponent(income.FillingDate || "")}&` +
          `Profit=${encodeURIComponent(income.Profit || "")}&` +
          `TurnOver=${encodeURIComponent(income.TurnOver || "")}&` +
          `GstRegistration=${encodeURIComponent(
            serializeArray(income.GstRegistration)
          )}&` +
          `GstNumber=${encodeURIComponent(income.GstNumber || "")}&` +
          `DateOfGstRegistration=${encodeURIComponent(
            income.DateOfGstRegistration || ""
          )}&` +
          `IndustryRegistration=${encodeURIComponent(
            serializeArray(income.IndustryRegistration)
          )}&` +
          `IndustryNumber=${encodeURIComponent(income.IndustryNumber || "")}&` +
          `DateOfIndustryRegistration=${encodeURIComponent(
            income.DateOfIndustryRegistration || ""
          )}&` +
          `CurrentAccount=${encodeURIComponent(
            serializeArray(income.CurrentAccount)
          )}&` +
          `AccountNumber=${encodeURIComponent(income.AccountNumber || "")}&` +
          `DateOfOpening=${encodeURIComponent(income.DateOfOpening || "")}&` +
          `BankAnalysis=${encodeURIComponent(income.BankAnalysis || "")}&` +
          `Exporter=${encodeURIComponent(serializeArray(income.Exporter))}&` +
          `ExportTurnoverLastYear=${encodeURIComponent(
            income.ExportTurnoverLastYear || ""
          )}&` +
          `LeadDate=${encodeURIComponent(income.LeadDate || "")}&` +
          `SourcingChanel=${encodeURIComponent(income.SourcingChanel || "")}&` +
          `SourceName=${encodeURIComponent(income.SourceName || "")}&` +
          `LeadName=${encodeURIComponent(income.LeadName || "")}&` +
          `EmailId=${encodeURIComponent(income.EmailId || "")}&` +
          `MobileNo1=${encodeURIComponent(income.MobileNo1 || "")}&` +
          `DateOfBirth=${encodeURIComponent(income.DateOfBirth || "")}&` +
          `Age=${encodeURIComponent(income.Age || "")}&` +
          `Sex=${encodeURIComponent(income.Sex || "")}&` +
          `MaritalStatus=${encodeURIComponent(income.MaritalStatus || "")}&` +
          `ResidenceType=${encodeURIComponent(income.ResidenceType || "")}&` +
          `ResidenceCity=${encodeURIComponent(income.ResidenceCity || "")}&` +
          `PermanentAddress=${encodeURIComponent(
            income.PermanentAddress || ""
          )}&` +
          `PCity=${encodeURIComponent(income.PCity || "")}&` +
          `PPinCode=${encodeURIComponent(income.PPinCode || "")}&` +
          `PState=${encodeURIComponent(income.PState || "")}&` +
          `FormationType=${encodeURIComponent(income.FormationType || "")}&` +
          `OrganizationName=${encodeURIComponent(
            income.OrganizationName || ""
          )}&` +
          `OfficeType=${encodeURIComponent(income.OfficeType || "")}&` +
          `Designation=${encodeURIComponent(income.Designation || "")}&` +
          `CurrentExperience=${encodeURIComponent(
            income.CurrentExperience || ""
          )}&` +
          `IndustryType=${encodeURIComponent(income.IndustryType || "")}&` +
          `Dated=${encodeURIComponent(income.Dated || "")}&` +
          `ExperienceProof=${encodeURIComponent(
            income.ExperienceProof || ""
          )}&` +
          `Form26AS=${encodeURIComponent(income.Form26AS || "")}&` +
          `PFApplicability=${encodeURIComponent(
            income.PFApplicability || ""
          )}&` +
          `TDSDeduction=${encodeURIComponent(
            serializeArray(income.TDSDeduction)
          )}&` +
          `IncomeDetails=${encodeURIComponent(
            serializeIncomeDetails(income.IncomeDetails)
          )}&` +
          `TurnOverDetails=${encodeURIComponent(
            serializeTurnOverDetails(income.TurnOverDetails)
          )}&` +
          `BankDetails=${encodeURIComponent(
            serializeBankDetails(income.BankDetails)
          )}`
        );
      } else if (type === "professional") {
        // Add serialization logic for professional income if needed
      }
    };

    let path = "";
    let queryParams = "";

    if (salaryIncome) {
      path = "salaryincome";
      queryParams = serializeIncome(salaryIncome, "salary");
    } else if (businessIncome) {
      path = "businessincome";
      queryParams = serializeIncome(businessIncome, "business");
    } else if (professionalIncome) {
      path = "professionalincome";
      queryParams = serializeIncome(professionalIncome, "professional");
    }
    if (path && currentPage !== undefined) {
      const fullUrl = `/admin/${userId}/directsales/${path}/${employee.userId}/${currentPage}`;
      navigate(fullUrl);
    }

  };
  const getIncomeType = (salaryIncome, businessIncome, professionalIncome) => {
    const incomeTypes = [];
    if (salaryIncome) incomeTypes.push("Salary");
    if (businessIncome) incomeTypes.push("Business");
    if (professionalIncome) incomeTypes.push("Professional");
    return incomeTypes.length > 0 ? incomeTypes.join(", ") : "None";
  };

  return (
    <>
      <div>
        <h2 style={{ marginBottom: "25px", fontSize: "25px" }}>
          Direct Sale Data
        </h2>
      </div>
      <div className="table-container">
        <table className="el-table">
          <thead>
            <tr className="el-table-tr">
              <th style={{ minWidth: "75px" }}>Sr. No.</th>
              <th>Name</th>
              <th>Mobile No.</th>
              <th>Loan Amount</th>
              <th>Loan Type</th>
              <th>Property Location</th>
              <th>City</th>
              <th>Income Type</th>
              {/* <th>View Docs</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9">Loading...</td>
              </tr>
            ) : employees.length > 0 ? (
              employees.map((user, index) => {
                const { salaryIncome, businessIncome, professionalIncome } =
                  user;
                const loanType =
                  salaryIncome?.LoanType || businessIncome?.LoanType || "-";

                return (
                  <tr key={user.userId}>
                    <td>{index + 1 + (currentPage - 1) * pageSize}</td>
                    <td>
                      {salaryIncome?.Name ||
                        businessIncome?.Name ||
                        professionalIncome?.Name ||
                        "-"}
                    </td>
                    <td>
                      {salaryIncome?.MobileNo1 ||
                        businessIncome?.MobileNo1 ||
                        professionalIncome?.MobileNo1 ||
                        "-"}
                    </td>
                    <td>
                      {salaryIncome?.LoanAmount ||
                        businessIncome?.LoanAmount ||
                        professionalIncome?.LoanAmount ||
                        "-"}
                    </td>
                    <td>
                      {(Array.isArray(loanType)
                        ? loanType.join(", ")
                        : loanType) || "-"}
                    </td>
                    <td>
                      {salaryIncome?.PropertyLocation ||
                        businessIncome?.PropertyLocation ||
                        "-"}
                    </td>
                    <td>
                      {(salaryIncome?.City && Array.isArray(salaryIncome.City)
                        ? salaryIncome.City.join(", ")
                        : salaryIncome?.City) ||
                        (businessIncome?.City &&
                          Array.isArray(businessIncome.City)
                          ? businessIncome.City.join(", ")
                          : businessIncome?.City) ||
                        (professionalIncome?.City &&
                          Array.isArray(professionalIncome.City)
                          ? professionalIncome.City.join(", ")
                          : professionalIncome?.City) ||
                        "-"}
                    </td>
                    <td>
                      {getIncomeType(
                        salaryIncome,
                        businessIncome,
                        professionalIncome
                      ) || "-"}
                    </td>
                    <td>
                      {/* {salaryIncome && businessIncome && professionalIncome
                        ? professionalIncome.Name
                        : "-"} */}
                      {salaryIncome?.OtherSourceOfIncome ||
                        businessIncome?.OtherSourceOfIncome ||
                        professionalIncome?.OtherSourceOfIncome ||
                        "-"}
                    </td>
                    {/* <td>
                      {salaryIncome?.UploadPhoto?.length > 0 ||
                      salaryIncome?.UploadAadhar?.length > 0 ? (
                        <select
                          style={{ padding: "5px", borderRadius: "4px" }}
                          onChange={(e) => {
                            const selectedUrl = e.target.value;
                            if (selectedUrl) {
                              window.open(selectedUrl, "_blank");
                            }
                          }}
                        >
                          <option value="">Select Document</option>
                          {salaryIncome?.UploadPhoto?.map((file, index) => (
                            <option
                              key={`photo-${index}`}
                              value={`http://77.37.45.224:8000/${file.replace(
                                "\\",
                                "/"
                              )}`}
                            >
                              Upload Photo {index + 1}
                            </option>
                          ))}
                          {salaryIncome?.UploadAadhar?.map((file, index) => (
                            <option
                              key={`aadhar-${index}`}
                              value={`http://77.37.45.224:8000/${file.replace(
                                "\\",
                                "/"
                              )}`}
                            >
                              Upload Aadhar {index + 1}
                            </option>
                          ))}
                        </select>
                      ) : (
                        "-"
                      )}
                    </td> */}

                    <td className="statusbtn">
                      <button
                        className="DS-editbtn"
                        onClick={() => handleEdit(user, currentPage)}
                      >
                        <span>
                          <p>View Details</p>
                        </span>
                      </button>

                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="9">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="DS-pagination">
        <button
          className="Emp-list-pagination-btn"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <div>User Count: {userCount}</div>
        <button
          className="Emp-list-pagination-btn"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default DirectSales;
