import React, { useContext } from 'react'
import { Banner } from "../Components/Banner"
import { useQuery } from '@apollo/client'
import { getUser } from '../GraphQL/Queries'
import { UserDataContext } from '../Context/Usercontext'
import Cards from '../Components/Cards'

const LandingPage = () => {



  return (
    <div>
        <Banner/>
        <div className='p-3'>
            <Cards/>
        </div>
    </div>
  )
}

export default LandingPage