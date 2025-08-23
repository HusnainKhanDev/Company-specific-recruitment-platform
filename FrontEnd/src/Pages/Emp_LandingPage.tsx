import React, { useEffect, useState } from 'react'
import Emp_NavBar from '../Components/Emp_NavBar'
import Emp_Applications from '../Components/Emp_Applications'
import { useQuery } from '@apollo/client'
import { GetAllApplications } from '../GraphQL/Queries'
import ShowCharts from '../Components/ShowCharts'

const EmpLandingPage = () => {

  const {data, loading, error} = useQuery(GetAllApplications)
  const [Applications, setApplications] = useState([])
  
  useEffect(() => {
    setApplications(data?.GetApplications)
  }, [data])

    let Apps;
      if (Applications) {
        //Just Resent apps with in 24H
        Apps = Applications.filter((app: any) => {
          const AppDate = new Date(Number(app.createdAt));
          const past24H = new Date(Date.now() - 86400000); // 24 hours ago 24 * 60 * 60 * 1000
          return AppDate.getTime() > past24H.getTime(); //new date is grater than old date means appdate should greater than one day old date 
        });
      }

  return (
    <div>
      <div>
        <Emp_NavBar/>
      </div>


      <div className=''>
        <ShowCharts/>
      </div>
      
      <div className=''>
          <h3 className='px-4 mt-3 text-lg text-gray-400 font-medium'> New Post With in 24H </h3>
          <Emp_Applications Applications={Apps} />
      </div>
    </div>
    
  )
}

export default EmpLandingPage