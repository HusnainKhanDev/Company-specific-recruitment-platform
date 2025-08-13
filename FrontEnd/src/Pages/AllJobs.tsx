import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cards, { Job } from '../Components/Cards'
import { Client } from '../main'
import { GetJobs } from '../GraphQL/Queries'
import NavBar from '../Components/NavBar'
import SidePannel from '../Components/SidePannel'

const AllJobs = () => {
    const navigate = useNavigate()
    const data = Client.readQuery({ query: GetJobs })
    const [PassPannelData, setPassDataToPannel] = useState<Job | undefined>(undefined);

    console.log("Data from Jobs", data)
    function handleButton(){
        navigate("/")
    }

    let JobData = data?.GetAllJobs || []

  return (
    <div className=''>
       <div className='text-black  absolute top-5 left-52 w-[70%] border border-black rounded-full shadow-black  shadow-[inset_0_2px_6px_rgba(0,0,0,0.6)]  '>
    <NavBar/>
</div>

        <div className='p-3 mt-24'>
            <Cards Jobs={JobData} setPassDataToPannel={setPassDataToPannel}/>
        </div>
        <div>
            <SidePannel PassPannelData={PassPannelData} />
        </div>
    </div>
  )
}

export default AllJobs