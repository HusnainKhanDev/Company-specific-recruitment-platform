import React, { useContext } from 'react'
import { Banner } from "../Components/Banner"
import { useQuery } from '@apollo/client'
import { getUser } from '../GraphQL/Queries'
import { UserDataContext } from '../Context/Usercontext'
import Cards from '../Components/Cards'
import { GetJobs } from '../GraphQL/Queries'
import SidePannel from '../Components/SidePannel'

const LandingPage = () => {

  const { data, loading, error } = useQuery(GetJobs)
  
  
  return (
    <div>
        <Banner/>
        {/* <div className='p-3'>
            <h3
            className='p-2 text-lg text-gray-400 font-medium'
            >
              New Post With in 24H
            </h3>
            <Cards/>
        </div> */}
        <div>
            <SidePannel/>
        </div>
    </div>
  )
}

export default LandingPage