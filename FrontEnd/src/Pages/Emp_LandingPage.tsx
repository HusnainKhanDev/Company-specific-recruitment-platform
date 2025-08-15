import React, { useEffect, useState } from 'react'
import Emp_NavBar from '../Components/Emp_NavBar'
import Emp_Applications from '../Components/Emp_Applications'
import { useQuery } from '@apollo/client'
import { GetAllApplications } from '../GraphQL/Queries'

const EmpLandingPage = () => {

  const {data, loading, error} = useQuery(GetAllApplications)
  const [Applications, setApplications] = useState([])
  
  useEffect(() => {
    setApplications(data?.GetApplications)
  }, [data])


  return (
    <div>
      <div>
        <Emp_NavBar/>
      </div>


      <div>
        {/* Analytics goes here */}
      </div>
      
      <div className=''>
          <Emp_Applications Applications={Applications} />
      </div>
    </div>
    
  )
}

export default EmpLandingPage