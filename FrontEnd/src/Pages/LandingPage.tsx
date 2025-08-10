import React, { useContext, useState } from 'react'
import { Banner } from "../Components/Banner"
import { useQuery } from '@apollo/client'
import { getUser } from '../GraphQL/Queries'
import { UserDataContext } from '../Context/Usercontext'
import Cards from '../Components/Cards'
import { GetJobs } from '../GraphQL/Queries'
import SidePannel from '../Components/SidePannel'
import { Job } from '../Components/Cards'



const LandingPage = () => {

  const { data, loading, error } = useQuery(GetJobs)
  const [PassData, setPassData] = useState<Job | undefined>(undefined);

  
  
  return (
    <div>

      <div className=''>
        <Banner/>
      </div>

        <div className='p-3'>
            <h3 className='p-2 text-lg text-gray-400 font-medium'> New Post With in 24H </h3>

            <Cards setPassData={setPassData}/>
        </div>

        <div>
          <SidePannel PassData={PassData} />
        </div>

    </div>
  )
}

export default LandingPage
// className="fixed top-[8%] right-3 h-[88%] w-[28%] shadow-lg z-50 bg-white"