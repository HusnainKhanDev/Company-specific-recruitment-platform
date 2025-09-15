import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../Context/Usercontext'
import axios from 'axios'

const Emp_NavBar = () => {
    const navigate = useNavigate()
    const { User } = useContext(UserDataContext)
    

    async function LogOutUser(){
            try{
                if(!sessionStorage.getItem("User")) {
                    navigate("/Auth")
                    return
                }
                else{
                    sessionStorage.removeItem("User")
                    sessionStorage.removeItem("AppsData")
                    let res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/logout`, {}, { withCredentials: true })
                    if(res){
                        navigate("/Auth")
                    }
                }
            }
            catch(err){
                console.log(err)
            }
        }

  return (
  <div>
    <nav className="w-full flex justify-between items-center px-8 py-4 
                    bg-gradient-to-r from-blue-200 via-blue-500 to-blue-800
                    border-b-2 border-black shadow-md sticky top-0 z-50">
      
      {/* Logo */}
      <h2 
        style={{ fontFamily: "Tangerine, cursive", fontWeight: "800" }}
        className="text-4xl text-black drop-shadow-md cursor-pointer">
        CompanyLogo
      </h2>

      {/* Menu Items */}
      <div className="flex items-center space-x-8">
        <ul className="flex space-x-8 text-white font-medium">
          <Link 
            to={'/employeer/Dashboard'} 
            className="relative hover:font-semibold cursor-pointer after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-white after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300">
            <i className="ri-home-2-line"></i> Home
          </Link>
          <Link to={'/create/job'} className="relative hover:font-semibold cursor-pointer after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-white after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300">
            <i className="ri-lightbulb-fill"></i> Create Jobs
          </Link>
          <Link to={'/all/applications'} className="relative hover:font-semibold cursor-pointer after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-white after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300">
            <i className="ri-article-line"></i> All Applications
          </Link>
          <Link to={'/all/listed/jobs'} className="relative hover:font-semibold cursor-pointer after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-white after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300">
            <i className="ri-briefcase-line"></i> All Jobs
          </Link>
          <li className="relative hover:font-semibold cursor-pointer after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-white after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300">Contact</li>
        </ul>

        {/* Auth Button */}
        <button
          onClick={() => LogOutUser()} 
          className="border-2 border-white py-1 px-4 rounded-lg text-white 
                     hover:bg-white hover:text-blue-600 transition duration-300 font-semibold shadow-sm">
          { User?.fullname ? "LogOut" : "Login"}
        </button>
      </div>
    </nav>
  </div>
);

}

export default Emp_NavBar