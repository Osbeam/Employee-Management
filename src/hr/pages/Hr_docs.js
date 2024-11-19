import React from 'react'
import Offer_letter from './Genarete_docs/Offer_letter'
import SalarySlip from './Genarete_docs/SalarySlip'
import '../pages/Hr_docs.css'

export default function Hr_docs() {
  return (
    <>
      <div className='Hrdoc-container'>
        <div className='HrHeading-container'>
          <h1>Hr Documents</h1>
        </div>
        <Offer_letter/>
        <SalarySlip/>
        </div>
    </>
  )
}
