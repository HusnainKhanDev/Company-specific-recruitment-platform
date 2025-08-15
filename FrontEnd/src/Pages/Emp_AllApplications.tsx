import React from 'react'
import Emp_Applications from '../Components/Emp_Applications'
import Emp_NavBar from '../Components/Emp_NavBar'
import { Client } from '../main'
import { GetAllApplications } from '../GraphQL/Queries'

const Emp_AllApplications = () => {

  const cachedData = Client.readQuery({query: GetAllApplications})
  console.log("Emp_AllApplications ", cachedData?.GetApplications)
  return (
    <div>
        <div>
            <Emp_NavBar/>
        </div>


        <div>
          <Emp_Applications Applications={cachedData?.GetApplications} />
        </div>
    </div>
  )
}

export default Emp_AllApplications