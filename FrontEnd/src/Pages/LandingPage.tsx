import React, { useContext, useEffect, useState } from 'react'
import { Banner } from "../Components/Banner"
import { useQuery } from '@apollo/client'
import Cards from '../Components/Cards'
import { GetJobs } from '../GraphQL/Queries'
import SidePannel from '../Components/SidePannel'
import { Job } from '../Components/Cards'
import { Bounce, ToastContainer, toast } from 'react-toastify'



const LandingPage = () => {

  const { data, loading, error } = useQuery(GetJobs)
  
  const [JobData, setJobData] = useState([])
  const [isSearch, setisSearch] = useState(false)
  const [SearchData, setSearchData] = useState([])
  const [PassPannelData, setPassDataToPannel] = useState<Job | undefined>(undefined);


  useEffect(() => {
    setJobData(data?.GetAllJobs)
  }, [data])


  let Jobs;
  if (!isSearch) {
    if (JobData) {
      //Just Resent Jobs with in 24H
      Jobs = JobData.filter((job: Job) => {
        const jobDate = new Date(Number(job.createdAt));
        const past24H = new Date(Date.now() - 86400000); // 24 hours ago
        return jobDate.getTime() > past24H.getTime();
      });
    }
  }
  else {
    Jobs = SearchData
  }

  return (
    <div>

      <div className=''>
        <Banner setisSearch={setisSearch} isSearch={isSearch} setSearchData={setSearchData} toast={toast} />
      </div>

      <div className='p-3'>
        { !isSearch ? <h3 className='p-2 text-lg text-gray-400 font-medium'> New Post With in 24H </h3> : ""}
        <Cards setPassDataToPannel={setPassDataToPannel} Jobs={Jobs} />
      </div>

      <div>
        <SidePannel PassPannelData={PassPannelData} />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />

    </div>
  )
}

export default LandingPage