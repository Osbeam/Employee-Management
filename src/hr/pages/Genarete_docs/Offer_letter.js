import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Offer_letter = ({ employee }) => {
    const { name, position, startDate, salary } = employee;

    const generatePDF = () => {
        const input = document.getElementById('offer-letter');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 0, 0);
                pdf.save("offer_letter.pdf");
            });
    };

    return (
        <div>
            <div id="offer-letter" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
                <h1 style={{ textAlign: 'center' }}>Appointment Letter</h1>
                <p>February 1, 2024</p>
                <p>Dear Mr. {name},</p>
                <p>We are pleased to offer you the position of {position} in IT Department with Osbeam IT Private Limited on the following terms and conditions:</p>
                
                <h2>1. Commencement of employment</h2>
                <p>Your employment will be effective as of {startDate}.</p>
                
                <h2>2. Job Title</h2>
                <p>Your job title will be {position}, and you will report to Sumeet Shaw, CEO.</p>
                
                <h2>3. Salary</h2>
                <p>Your salary and other benefits will be Rs. {salary} (Rupees Three Lakhs Only)/- per annum, as set out in Schedule I, hereto.</p>
                
                <h2>4. Place of posting</h2>
                <p>You will be posted at Pune, Maharashtra. You may however be required to work at any place of business which the Company has, or may later acquire.</p>
                
                <h2>5. Hours of Work</h2>
                <p>The normal working days are Monday to Friday. You will be required to work for such hours as necessary for the proper discharge of your duties to the Company. The normal working hours are from 9:00 AM to 7:00 PM and you are expected to work not less than 48 hours each week, and if necessary for additional hours depending on your responsibilities.</p>
                
                <h2>6. Leave/Holidays</h2>
                <p>You are entitled to the following Leaves:</p>
                <ul>
                    <li>Earned Leave</li>
                    <li>Casual Leave</li>
                    <li>Sick Leave</li>
                    <li>National Holiday</li>
                    <li>Festive Holiday</li>
                </ul>
                
                <h2>7. Nature of duties</h2>
                <p>You will perform to the best of your ability all the duties as are inherent in your post and such additional duties as the company may call upon you to perform, from time to time.</p>
                
                <h2>8. Company property</h2>
                <p>You will always maintain in good condition Company property, which may be entrusted to you for official use during the course of your employment and shall return all such property to the Company prior to relinquishment of your charge, failing which the cost of the same will be recovered from you by the Company.</p>
                
                <h2>9. Borrowing/accepting gifts</h2>
                <p>You will not borrow or accept any money, gift, reward or compensation for your personal gains from or otherwise place yourself under pecuniary obligation to any person/client with whom you may be having official dealings.</p>
                
                <h2>10. Termination</h2>
                <p>Your appointment can be terminated by the Company, without any reason, by giving you not less than 1 month prior notice in writing or salary in lieu thereof. For the purpose of this clause, salary shall mean basic salary.</p>
                <p>You may terminate your employment with the Company, without any cause, by giving no less than 2 months’ prior notice or salary for the unserved period, left after adjustment of pending leaves, as on date.</p>
                <p>The Company reserves the right to terminate your employment summarily without any notice period or termination payment, if it has reasonable ground to believe you are guilty of misconduct or negligence, or have committed any fundamental breach of contract or caused any loss to the Company or to clients’ business affairs.</p>
                
                <h2>11. Probation Period</h2>
                <p>It is understood and agreed that the first 3 Months of employment shall constitute a probationary period (“Probationary Period”) during which period the Employer may, in its absolute discretion, terminate the Employee’s employment, without assigning any reasons and without notice or cause.</p>
                
                <h2>12. Confidential Information</h2>
                <p>During your employment with the Company, you will devote your whole time, attention and skill to the best of your ability for its business. You shall not, directly or indirectly, engage or associate yourself with, be connected with, concerned, employed or engaged in any other business or activities or any other post or work part-time or pursue any course of study whatsoever, without the prior permission of the Company.</p>
                <p>You must always maintain the highest degree of confidentiality and keep as confidential the records, documents and other Confidential Information relating to the business of the Company which may be known to you or confided in you by any means and you will use such records, documents and information only in a duly authorized manner in the interest of the Company. For the purposes of this clause, ‘Confidential Information’ means information about the Company’s business and that of its customers which is not available to the general public and which may be learnt by you in the course of your employment. This includes, but is not limited to, information relating to the organization, its customer lists, employment policies, personnel, and information about the Company’s products, processes including ideas, concepts, projections, technology, manuals, drawing, designs, specifications, and all papers, resumes, records and other documents containing such Confidential Information.</p>
                <p>At no time, will you remove any Confidential Information from the office without permission.</p>
                <p>Your duty to safeguard and not disclose Confidential Information will survive the expiration or termination of this Agreement and/or your employment with the Company.</p>
                <p>Breach of the conditions of this clause will render you liable to summary dismissal under the clause above in addition to any other remedy the Company may have against you in law.</p>
                
                <h2>13. Notices</h2>
                <p>Notices may be given by you to the Company at its registered office address. Notices may be given by the Company to you at the address intimated by you in the official records.</p>
                
                <h2>14. Applicability of Company Policy</h2>
                <p>The Company shall be entitled to make policy declarations from time to time pertaining to matters like leave entitlement, maternity leave, employees’ benefits, working hours, transfer policies, etc., and may alter the same from time to time at its sole discretion. All such policy decisions of the Company shall be binding on you and shall override this Agreement to that extent.</p>
                
                <h2>15. Governing Law/Jurisdiction</h2>
                <p>Your employment with the Company is subject to Indian laws. All disputes shall be subject to the jurisdiction of Gwalior, Madhya Pradesh only.</p>
                
                <h2>16. Acceptance of our offer</h2>
                <p>Please confirm your acceptance of this Contract of Employment by signing and returning the duplicate copy.</p>

                <h2>Cost to Company</h2>
                <h3>Schedule I - Compensation Details</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Particulars</th>
                            <th>Monthly</th>
                            <th>Yearly</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Basic Salary</td>
                            <td>8000/-</td>
                            <td>96000/-</td>
                        </tr>
                        <tr>
                            <td>House rent allowance</td>
                            <td>2000/-</td>
                            <td>24000/-</td>
                        </tr>
                        <tr>
                            <td>Medical allowance</td>
                            <td>1000/-</td>
                            <td>12000/-</td>
                        </tr>
                        <tr>
                            <td>Fixed Allowance</td>
                            <td>13760/-</td>
                            <td>165120/-</td>
                        </tr>
                        <tr>
                            <td>Employer PF Contribution</td>
                            <td>240/-</td>
                            <td>2880/-</td>
                        </tr>
                        <tr>
                            <td><strong>TOTAL CTC</strong></td>
                            <td><strong>25,000/-</strong></td>
                            <td><strong>3,00,000/-</strong></td>
                        </tr>
                    </tbody>
                </table>
                
                <p>Note:</p>
                <ol>
                    <li>Ex-Gratia Payment will be part of Salary after 3 months from the date of Joining.</li>
                    <li>You will receive salary, and all other benefits forming part of your remuneration package subject to, and after, deduction of PF, PT & TDS in accordance with applicable law.</li>
                </ol>

                <p>We welcome you and look forward to receiving your acceptance and to working with you.</p>

                <p>Yours Sincerely,</p>
                <p>For OSBEAM IT PVT. LTD.</p>
                <p>Ms. Shraddh</p>
                <p>Manager HR</p>

                <address>
                    Office no. 4A, 4<sup>th</sup> Floor, The Avenue, Above Maharashtra Electronics, Pune Solapur Road, Pune-28
                </address>
            </div>
            <button onClick={generatePDF}>Generate PDF</button>
        </div>
    );
};

export default Offer_letter;
