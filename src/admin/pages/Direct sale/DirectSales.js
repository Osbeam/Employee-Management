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
      {/* Heading */}
      <div style={{ marginBottom: "15px", textAlign: "left" }}>
        <h2 style={{ fontSize: "26px", fontWeight: "600", color: "#2c3e50" }}>
          Direct Sale Data
        </h2>
      </div>

      {/* Scrollable Table Container */}
      <div
        style={{
          maxHeight: "400px", // limit height for vertical scrolling
          overflowY: "auto",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "Arial, sans-serif",
          }}
        >
          {/* Table Head */}
          <thead style={{ position: "sticky", top: 0, backgroundColor: "#34495e", color: "#fff", zIndex: 2 }}>
            <tr>
              {[
                "Sr. No.",
                "Name",
                "Mobile No.",
                "Loan Amount",
                "Loan Type",
                "Property Location",
                "City",
                "Income Type",
                "Other Income",
                "View Docs",
                "Action",
              ].map((header) => (
                <th
                  key={header}
                  style={{
                    padding: "10px",
                    minWidth: "90px",
                    textAlign: "left",
                    borderBottom: "2px solid #2c3e50",
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="11" style={{ textAlign: "center", padding: "15px" }}>
                  Loading...
                </td>
              </tr>
            ) : employees.length > 0 ? (
              employees.map((user, index) => {
                const { salaryIncome, businessIncome, professionalIncome } = user;
                const loanType =
                  salaryIncome?.LoanType || businessIncome?.LoanType || "-";

                return (
                  <tr
                    key={user.userId}
                    style={{
                      borderBottom: "1px solid #ddd",
                      transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#ecf0f1")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    <td style={{ padding: "8px" }}>
                      {index + 1 + (currentPage - 1) * pageSize}
                    </td>
                    <td style={{ padding: "8px" }}>
                      {salaryIncome?.Name ||
                        businessIncome?.Name ||
                        professionalIncome?.Name ||
                        "-"}
                    </td>
                    <td style={{ padding: "8px" }}>
                      {salaryIncome?.MobileNo1 ||
                        businessIncome?.MobileNo1 ||
                        professionalIncome?.MobileNo1 ||
                        "-"}
                    </td>
                    <td style={{ padding: "8px" }}>
                      {salaryIncome?.LoanAmount ||
                        businessIncome?.LoanAmount ||
                        professionalIncome?.LoanAmount ||
                        "-"}
                    </td>
                    <td style={{ padding: "8px" }}>
                      {(Array.isArray(loanType) ? loanType.join(", ") : loanType) || "-"}
                    </td>
                    <td style={{ padding: "8px" }}>
                      {salaryIncome?.PropertyLocation ||
                        businessIncome?.PropertyLocation ||
                        "-"}
                    </td>
                    <td style={{ padding: "8px" }}>
                      {(salaryIncome?.City && Array.isArray(salaryIncome.City)
                        ? salaryIncome.City.join(", ")
                        : salaryIncome?.City) ||
                        (businessIncome?.City && Array.isArray(businessIncome.City)
                          ? businessIncome.City.join(", ")
                          : businessIncome?.City) ||
                        (professionalIncome?.City &&
                          Array.isArray(professionalIncome.City)
                          ? professionalIncome.City.join(", ")
                          : professionalIncome?.City) ||
                        "-"}
                    </td>
                    <td style={{ padding: "8px" }}>
                      {getIncomeType(
                        salaryIncome,
                        businessIncome,
                        professionalIncome
                      ) || "-"}
                    </td>
                    <td style={{ padding: "8px" }}>
                      {salaryIncome?.OtherSourceOfIncome ||
                        businessIncome?.OtherSourceOfIncome ||
                        professionalIncome?.OtherSourceOfIncome ||
                        "-"}
                    </td>
                    <td style={{ padding: "8px" }}>
                      {salaryIncome?.UploadPhoto?.length > 0 ||
                        salaryIncome?.UploadAadhar?.length > 0 ? (
                        <select
                          style={{
                            padding: "6px 10px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                            cursor: "pointer",
                          }}
                          onChange={(e) => {
                            const selectedUrl = e.target.value;
                            if (selectedUrl) window.open(selectedUrl, "_blank");
                          }}
                        >
                          <option value="">Select Document</option>
                          {salaryIncome?.UploadPhoto?.map((file, i) => (
                            <option
                              key={`photo-${i}`}
                              value={`http://77.37.45.224:8000/${file.replace("\\", "/")}`}
                            >
                              Upload Photo {i + 1}
                            </option>
                          ))}
                          {salaryIncome?.UploadAadhar?.map((file, i) => (
                            <option
                              key={`aadhar-${i}`}
                              value={`http://77.37.45.224:8000/${file.replace("\\", "/")}`}
                            >
                              Upload Aadhar {i + 1}
                            </option>
                          ))}
                        </select>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td style={{ padding: "8px" }}>
                      <button
                        style={{
                          backgroundColor: "#3498db",
                          color: "#fff",
                          padding: "6px 12px",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          fontWeight: "500",
                        }}
                        onClick={() => handleEdit(user, currentPage)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="11"
                  style={{ textAlign: "center", padding: "15px", color: "#888" }}
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination and User Count */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "15px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <button
          style={{
            padding: "6px 12px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            cursor: "pointer",
            backgroundColor: currentPage === 1 ? "#ccc" : "#3498db",
            color: "#fff",
          }}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span style={{ fontWeight: "500" }}>
          Page {currentPage} of {totalPages} | User Count: {userCount}
        </span>

        <button
          style={{
            padding: "6px 12px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            cursor: "pointer",
            backgroundColor: currentPage === totalPages ? "#ccc" : "#3498db",
            color: "#fff",
          }}
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
