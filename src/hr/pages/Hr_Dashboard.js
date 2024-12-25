import React, { useState, useEffect } from 'react'
import './Hr_Dashboard.css'
import img from '../Images/emp.png'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

export default function Hr_Dashboard() {
  const data = [
    { name: "Rahul ", totalCalls: 120 },
    { name: "Rajesh ", totalCalls: 150 },
    { name: "Rohan ", totalCalls: 100 },
    { name: "Raj ", totalCalls: 130 },
    { name: "Ram ", totalCalls: 90 },

  ];
  return (
    <>
      <div>
        <div className='hr-dash-head-sec'>
          <h1>Hr Dashboard</h1>
        </div>
        <hr />
        <div className='Hr-dash-card-container'>
          <div className='Hr-dash-innerContainer' style={{ backgroundColor: '#33FFFF' }}>
            <div className='card-data'>
              <h3>Total Employee</h3>
              <p>150</p>
            </div>
            <div className='card-img'>
              <img src={img} />
            </div>
          </div>
          <div className='Hr-dash-innerContainer' style={{ backgroundColor: '#99FF99' }}>
            <div className='card-data'>
              <h3>Total Data</h3>
              <p>150</p>
            </div>
            <div className='card-img'>
              <img src={img} />
            </div>
          </div>
          <div className='Hr-dash-innerContainer' style={{ backgroundColor: '#CCFFFF' }}>
            <div className='card-data'>
              <h3>Total Leads</h3>
              <p>150</p>
            </div>
            <div className='card-img'>
              <img src={img} />
            </div>
          </div>
          <div className='Hr-dash-innerContainer' style={{ backgroundColor: '#FFCCFF' }}>
            <div className='card-data'>
              <h3>Total Follow</h3>
              <p>150</p>
            </div>
            <div className='card-img'>
              <img src={img} />
            </div>
          </div>
        </div>
        <div className='barchart-hr-dash-container'>
          <div className="barchart">
            <h3>Leaders Call Data</h3>
            <BarChart
              width={500} // Increased width for better spacing
              height={350}
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                label={{ value: "Leaders", position: "bottom" }}
                interval={0} // Ensures all labels are shown
                tick={data.length > 5 ? { angle: -45, textAnchor: "end" } : {}} // Conditional rotation
              />
              <YAxis label={{ value: "Total Calls", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Bar dataKey="totalCalls" fill="#8884d8" barSize={40} />
            </BarChart>
          </div>


          <div></div>
        </div>
      </div>
    </>
  )
}
