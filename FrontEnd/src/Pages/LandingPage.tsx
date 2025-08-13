import React, { useContext, useEffect, useState } from 'react'
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

  const [PassPannelData, setPassDataToPannel] = useState<Job | undefined>(undefined);
  const [JobData, setJobData] = useState([])
  
  useEffect(() => {
      setJobData(data?.GetAllJobs)
  }, [data])
  
  let recentJobs;
  if(JobData) {
  recentJobs = JobData.filter((job: Job) => {
      const jobDate = new Date(Number(job.createdAt));
      const past24H = new Date(Date.now() - 86400000); // 24 hours ago
      return jobDate.getTime() > past24H.getTime();
  });
}

  return (
    <div>

      <div className=''>
        <Banner/>
      </div>

        <div className='p-3'>
            <h3 className='p-2 text-lg text-gray-400 font-medium'> New Post With in 24H </h3>

            <Cards setPassDataToPannel={setPassDataToPannel} Jobs={JobData}/>
        </div>

        <div>
          <SidePannel PassPannelData={PassPannelData} />
        </div>

    </div>
  )
}

export default LandingPage
// className="fixed top-[8%] right-3 h-[88%] w-[28%] shadow-lg z-50 bg-white"