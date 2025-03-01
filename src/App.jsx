import React from 'react'
import { useState, useEffect } from 'react'
import Dashboard1 from './components/Dashboard1'
import Dashboard_temp from './components/Dashboard_temp'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Ten_days from './components/pages/Ten_days'
import Current from './components/Current'
import API from './components/API'



const App = () => {
  return (
    <>
      <Router>
        <Routes path="/">
          <Route path='ten_days' element={<Ten_days />} />
          <Route path="" element={<Dashboard1/>}/>
        </Routes>
      </Router>
      {/* <div>
        <Current />
      </div> */}
      {/* <div>
        <API />
      </div> */}
    </>  
  )
}

export default App