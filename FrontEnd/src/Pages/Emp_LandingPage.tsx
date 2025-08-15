import React from 'react'
import Emp_NavBar from '../Components/Emp_NavBar'
import Emp_Applications from '../Components/Emp_Applications'

const EmpLandingPage = () => {
  return (
    <div>
      <div>
        <Emp_NavBar/>
      </div>

      <div className=''>
          <Emp_Applications/>
      </div>
    </div>
    
  )
}

export default EmpLandingPage