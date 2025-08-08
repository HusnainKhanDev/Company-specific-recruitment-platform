import React, { useContext } from 'react'
import { Banner } from "../Components/Banner"
import { useQuery } from '@apollo/client'
import { getUser } from '../GraphQL/Queries'
import { UserDataContext } from '../Context/Usercontext'

const LandingPage = () => {

  const {User, setUser} = useContext(UserDataContext)

  const { data, loading, error } = useQuery(getUser)
  if(data){
    localStorage.setItem("User", JSON.stringify(data.GetUser))
    setUser(data.GetUser)
  }

  return (
    <div>
        <Banner/>
    </div>
  )
}

export default LandingPage