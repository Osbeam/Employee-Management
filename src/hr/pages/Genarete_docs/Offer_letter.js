import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import sa from '../../../admin/Images/Shaw-Associates logo.png'
import sns from '../../../admin/Images/ShawniksLogo.png'
import osbm from '../../../admin/Images/osbeamLogo.png'
import '../Hr_docs.css'


const Offer_letter = () => {
    const [users, setUsers] = useState([]);
    const [userDetails, setUserDetails] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [error, setError] = useState(null);

    // Fetch all users
    useEffect(() => {
        const fetchEmployeeNames = async () => {
            const authToken = localStorage.getItem('jwtoken');

            console.log('Auth token retrieved:', authToken); // Log the auth token for debugging

            try {
                console.log('Fetching employee names...'); // Log before making the fetch request
                const response = await fetch(`http://77.37.45.224:8000/api/user/getEmployeeNames`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                console.log('Response status:', response.status); // Log the response status
                const data = await response.json();
                console.log('Data fetched:', data); // Log the fetched data to see the full response

                if (data && data.success && Array.isArray(data.data)) {
                    setUsers(data.data); // Log the user data that is being set
                    console.log('Users data set:', data.data);
                } else {
                    console.error('Unexpected data format:', data); // Log in case the data format is not as expected
                }
            } catch (error) {
                console.error('Error fetching employee names:', error); // Log any errors
            }
        };
        fetchEmployeeNames();
    }, []);

    // Fetch selected user details when selectedUserId changes
    useEffect(() => {
        const authToken = localStorage.getItem('jwtoken');

        const fetchUserData = async () => {
            if (selectedUserId) {
                try {
                    console.log(`Fetching data for user ID: ${selectedUserId}`); // Debug log
                    const response = await fetch(`http://77.37.45.224:8000/api/user/getEmployeeNames`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${authToken}`,
                        },
                    });

                    if (!response.ok) {
                        console.error(`Error: ${response.status} - ${response.statusText}`);
                        setError('Failed to fetch user details');
                        return;
                    }

                    const result = await response.json();

                    // Debug log to check result format
                    console.log('Fetched user details:', result);

                    // Find the employee matching the selected user ID
                    if (result.success && result.data && Array.isArray(result.data)) {
                        const selectedUser = result.data.find(user => user._id === selectedUserId);
                        if (selectedUser) {
                            setUserDetails(selectedUser);
                            console.log('Selected user data:', selectedUser); // Debug log for selected user data
                        } else {
                            setError('Selected user not found in the employee list');
                        }
                    } else {
                        setError('No employees found');
                    }
                } catch (error) {
                    console.error('Error fetching user details:', error);
                    setError('Error fetching user details');
                }
            } else {
                setUserDetails(null); // Reset userDetails when no user is selected
            }
        };

        fetchUserData();
    }, [selectedUserId]);


    // Function to generate and download the PDF
    const generatePDF = () => {
        if (!userDetails) {
            console.error('No user details available to generate PDF');
            return;
        }

        const doc = new jsPDF();
        const pageWidth = 190; // The width of the content area (modify if necessary)
        const pageHeight = doc.internal.pageSize.height;
        let currentY = 10; // Start from the top of the page
        const lineHeight = 8; // Set line height for better readability

        const content = (text, fontSize = 12, isBold = false, isItalic = false, textAlign = 'left') => {
            doc.setFontSize(fontSize);
            doc.setFont('helvetica', isBold ? 'bold' : 'normal');
            if (isItalic) {
                doc.setFont('times', 'italic');
            }
            const lines = doc.splitTextToSize(text, 190); // Split text into lines based on the width
            for (const line of lines) {
                if (currentY + lineHeight > pageHeight - 10) { // Check if there's enough space on the current page
                    doc.addPage(); // Add a new page
                    currentY = 10; // Reset Y position to the top of the new page
                }
                doc.text(line, 15, currentY, { align: textAlign });
                currentY += lineHeight; // Move down for the next line
            }
        };

        // Function to add the company address at the bottom of every page
        const addFooter = () => {
            const companyAddress = "Office no. 4A, 4th Floor, The Avenue, Above Maharashtra Electronics, Pune Solapur Road, Pune-28";
            const footerY = pageHeight - 20; // Position for the address
            doc.setLineWidth(0.5);
            doc.line(15, footerY - 5, 195, footerY - 5); // Horizontal line
            doc.setFontSize(10);
            const addressLines = doc.splitTextToSize(companyAddress, 180);
            let addressCurrentY = footerY;
            for (const line of addressLines) {
                doc.text(line, 15, addressCurrentY);
                addressCurrentY += lineHeight; // Move down for the next line
            }

            // Pagination
            const pageCount = doc.getNumberOfPages();
            doc.text(`Page ${pageCount}`, 180, pageHeight - 10); // Add page number
        };

        const addHeader = () => {
            let logoImage;
            if (userDetails.CompanyName === 'Osbeam IT Pvt Ltd') {
                logoImage = osbm;
            } else if (userDetails.CompanyName === 'ShawNiks Solutions Pvt Ltd') {
                logoImage = sns;
            } else if (userDetails.CompanyName === 'Shaw Associates') {
                logoImage = sa;
            } else {
                logoImage = null;
            }
        
            if (logoImage) {
                const logoWidth = 30;
                const logoHeight = 20;
                doc.addImage(logoImage, 'PNG', 15, currentY, logoWidth, logoHeight);
                currentY += logoHeight + 15;
            } else {
                console.warn('No logo found for the company:', userDetails.CompanyName);
            }
        
            // Get current date
            const currentDate = new Date().toLocaleDateString(); // Format: MM/DD/YYYY
        
            // Add the current date in the top-right corner
            doc.setFontSize(10);
            doc.text(currentDate, pageWidth - 15, 15); // Adjust x position for right alignment, y position for top of the page
        };
        addHeader()        

        // Set the font size for the appointment letter
        doc.setFontSize(16); // Set font size to 16 for the title
        doc.setFont('helvetica', 'bold');
        const title = 'Appointment Letter'; // Title text
        const titleWidth = doc.getTextWidth(title); // Get the width of the title

        // Calculate the X position for center alignment
        const x = (pageWidth - titleWidth) / 2 + 35; // Adding 15 for the left margin

        // Add the title to the document at the calculated position
        doc.text(title, x, currentY, { align: 'center' });
        currentY += lineHeight; // Move down for the next line

        const topMargin = 20
        currentY += lineHeight * 2; // Extra space after title
        content(`Dear Mr./Ms. ${userDetails.FirstName} ${userDetails.MiddleName || ''} ${userDetails.LastName}`);
        content(`We are pleased to offer you the position of ${userDetails.Designation.name} in ${userDetails.Department.name} with`);
        content(`${userDetails.CompanyName} on the following terms and conditions:`);
        content('1. Commencement of employment', 12, true, false);
        content(`Your employment will be effective, as of ${userDetails.JoiningDate}.`);
        content('2. Job Title', 12, true, false);
        content(`Your job title will be ${userDetails.Designation.name}, and you will report to ${userDetails.ManagedBy || 'N/A'}.`);
        content('3. Salary', 12, true, false);
        content(`Your salary and other benefits will be Rs.${userDetails.CTC || 'N/A'} (${userDetails.CtcInWord || 'N/A'})/- per annum, as`);
        content('set out in Schedule I, hereto.');
        content('4. Place of posting', 12, true, false);
        content('You will be posted at Pune, Maharashtra. You may however be required to work at any place of');
        content('business which the Company has, or may later acquire.');
        content('5. Hours of Work', 12, true, false);
        content('The normal working days are Monday to Friday. You will be required to work for such hours as');
        content('necessary for the proper discharge of your duties to the Company. The normal working hours are');
        content('from 9:00 AM to 7:00 PM and you are expected to work not less than 48 hours each week, and if');
        content('necessary for additional hours depending on your responsibilities.');

        addFooter();

        // Add new page for remaining content
        doc.addPage();
        currentY = topMargin;// Reset Y position for new page

        content('6. Leave/Holidays', 12, true, false);
        content('You are entitled to the following leaves as under:');

        const leaveDetails = [
            ['Earned Leave', '12', '1 Day per Month '],
            ['Casual Leave', '8', '2 Days per Quarter  '],
            ['Sick Leave ', '12', '1 Day per Month '],
            ['National Holiday', '4', 'Republic Day, Maharashtra Day, Independence Day & Gandhi Jayanti '],
            ['Festive Holiday ', '4', 'Any 4 Days out of 19 Festivals']
        ];

        const leftMarginLeave = 20;
        // Add salary details as a table
        doc.autoTable({
            head: [['Leave Type ', 'No. of Leave ', 'Eligibility ']],
            body: leaveDetails,
            startY: currentY + 10, // Start position for the table
            theme: 'grid', // Adds a border around the table
            styles: {
                fontSize: 10,
                cellPadding: 3,
            },
            headStyles: {
                fillColor: [41, 128, 185], // Custom header color (blue)
                textColor: [255, 255, 255], // White text
            },
            alternateRowStyles: {
                fillColor: [240, 240, 240], // Light gray for alternate rows
            },
            margin: { left: leftMarginLeave, top: 4, bottom: 10 }, // Set left margin to align with text
        });

        // Update the current Y position to be after the table
        currentY = doc.autoTable.previous.finalY + 20; // Add some space after the table

        content('7. Nature of duties', 12, true, false);
        content('You will perform to the best of your ability all the duties as are inherent in your post and such');
        content('additional duties as the company may call upon you to perform, from time to time.');
        content('8. Company property', 12, true, false);
        content('You will always maintain in good condition Company property, which may be entrusted to you for');
        content('official use during the course of your employment and shall return all such property to the');
        content('Company prior to relinquishment of your charge, failing which the cost of the same will be');
        content('recovered from you by the Company.');

        content('9. Borrowing/accepting gifts', 12, true, false);
        content('You will not borrow or accept any money, gift, reward or compensation for your personal gains');
        content('from or otherwise place yourself under pecuniary obligation to any person/client with whom you');
        content('may be having official dealings.');

        content('10. Termination', 12, true, false);
        content('10.1 Your appointment can be terminated by the Company, without any reason, by giving you not');
        content('less than 1 month prior notice in writing or salary in lieu thereof. For the purpose of this clause,');
        content('10.2 You may terminate your employment with the Company, without any cause, by giving no less');
        content('than 2 months’ prior notice or salary for unsaved period, left after adjustment of pending leaves,');
        content('as on date.');

        addFooter();

        // Add another new page for the next sections
        doc.addPage();
        currentY = topMargin;
        // Reset Y position for new page
        content('10.3 The Company reserves the right to terminate your employment summarily without any');
        content('notice period or termination payment, if it has reasonable ground to believe you are guilty of');
        content('misconduct or negligence, or have committed any fundamental breach of contract or caused any');
        content('loss to the Company.');
        content('10.4 The Company reserves the right to terminate your employment summarily without any');
        content('notice period or termination payment, if it has reasonable ground to believe you are guilty of');
        content('misconduct or negligence, or have committed any fundamental breach of contract or caused any');
        content('loss to the Company Employment or to clients’ business affairs.');
        content('11. Probation Period', 12, true, false);
        content('It is understood and agreed that the first 3 Months of employment shall constitute a probationary');
        content('period (“Probationary Period”) during which period the Employer may, in its absolute discretion,');
        content('terminate the Employee\'s employment, without assigning any reasons and without notice or cause.');

        content('12. Confidential Information', 12, true, false);
        content('12.1 During your employment with the Company you will devote your whole time, attention');
        content('and skill to the best of your ability for its business. You shall not, directly or indirectly, engage or');
        content('associate yourself with, be connected with, concerned, employed or engaged in any other business');
        content('or activities or any other post or work part time or pursue any course of study whatsoever, without');
        content('the prior permission of the Company.', 12, true, false);
        content('12.2 You must always maintain the highest degree of confidentiality and keep as confidential');
        content('any and all information of the Company, its clients, customers and business contacts including but');
        content('not limited to client lists, business strategies, financial information, market research, etc., during');
        content('the term of this employment and after termination.');

        content('13. Alteration of Terms', 12, true, false);
        content('The Company reserves the right to change the terms and conditions of your appointment, as may');
        content('be required from time to time, provided you are given due notice of the change.');

        content('14. Acceptance', 12, true, false);
        content('If the above terms and conditions are acceptable to you, please sign below and return one copy to');
        content('the Company. The other copy should be retained by you for your record.');

        addFooter();
        // Schedule content
        doc.addPage();
        currentY = topMargin;
        // Reset Y position for new page

        content('Schedule I: Salary and Benefits', 14, true, false);

        const salaryDetails = [
            ['Basic Salary', `Rs. ${userDetails.BasicSalary || 'N/A'}`],
            ['House Rent Allowance (HRA)', `Rs. ${userDetails.HRA || 'N/A'}`],
            ['Provident Fund (PF)', `Rs. ${userDetails.PF || 'N/A'}`],
            ['Medical Insurance', `Rs. ${userDetails.MedicalInsurance || 'N/A'}`],
            ['Bonus', `Rs. ${userDetails.Bonus || 'N/A'}`],
            ['Other Benefits', `Rs. ${userDetails.OtherBenefits || 'N/A'}`],
        ];

        // Set a uniform margin for the content and table
        const leftMargin = 20; // Adjust this value according to your preference

        // Add salary details as a table
        doc.autoTable({
            head: [['Description', 'Amount']],
            body: salaryDetails,
            startY: currentY + 10, // Start position for the table
            theme: 'grid', // Adds a border around the table
            styles: {
                fontSize: 10,
                cellPadding: 3,
            },
            headStyles: {
                fillColor: [41, 128, 185], // Custom header color (blue)
                textColor: [255, 255, 255], // White text
            },
            alternateRowStyles: {
                fillColor: [240, 240, 240], // Light gray for alternate rows
            },
            margin: { left: leftMargin, top: 10, bottom: 10 }, // Set left margin to align with text
        });

        // Update the current Y position to be after the table
        currentY = doc.autoTable.previous.finalY + 20;
        // Add the rest of the content before the signature
        content('Note:', 12, true, false);
        content('1. Ex-Gratia Payment will be part of Salary after 3 months from the date of Joining.');
        content('2. You will receive salary, and all other benefits forming part of your remuneration package');
        content('subject to, and after, deduction of PF, PT & TDS in accordance with applicable law.');
        content('We welcome you, and look forward to receiving your acceptance and to working with you.');


        // Move signature section to the bottom of the page
        const bottomMargin = 60; // Distance from the bottom of the page
        const signatureStartY = pageHeight - bottomMargin; // Calculate the starting Y position for the signature

        // Add the signature section at the bottom of the page
        doc.setFontSize(12);
        doc.text('Yours Sincerely,', 20, signatureStartY);
        doc.text('Ms. Shraddha Bhore', 20, signatureStartY + 8); // Add 8 to move the next line down
        doc.text('HR Manager', 20, signatureStartY + 16); // Add another 8 for the next line

        addFooter();

        // Save the PDF
        doc.save(`${userDetails.FirstName}_${userDetails.LastName}_appointment_letter.pdf`);
    };

    return (
        <div className='offerContainer'>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Dropdown to select a user */}
            <label className='user-select-label'>Select Employee:</label>
            <select
                id="user-select"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
            >
                <option value="">-- Select an employee --</option>
                {users.map(user => (
                    <option key={user._id} value={user._id}>
                        {`${user.FirstName} ${user.MiddleName || ''} ${user.LastName}`}
                    </option>
                ))}
            </select>

            {userDetails && (
                <div className='OfferLetterDownloadBtn'>
                    <button onClick={generatePDF}>Download Offer Letter</button>
                </div>
            )}
        </div>
    );
};

export default Offer_letter;
