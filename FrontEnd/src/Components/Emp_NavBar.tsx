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
                    let res = await axios.post("http://localhost:4000/logout", {}, { withCredentials: true })
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
            <nav className="w-full flex justify-between items-center px-8 py-4 bg-blue-300 border-b-2 border-black">
                <h2 style={{ fontFamily: "Tangerine, cursive", }} className="text-3xl font-extrabold">CompanyLogo</h2>
                <div className="flex items-center space-x-6" >
                    <ul className="flex space-x-6 ">
                        <Link to={'/employeer/Dashboard'} className="hover:font-semibold cursor-pointer"><i className="ri-home-2-line"></i> Home</Link>
                        <Link to={'/create/job'} className="hover:font-semibold cursor-pointer"><i className="ri-lightbulb-fill"></i> Create Jobs</Link>
                        <Link to={'/all/applications'} className="hover:font-semibold cursor-pointer"><i className="ri-article-line"></i> All Applications</Link>
                        <Link to={'/all/listed/jobs'} className="hover:font-semibold cursor-pointer"><i className="ri-briefcase-line"></i> All Jobs</Link>
                        <li className="hover:font-semibold cursor-pointer">Contact</li>
                    </ul>

                    <button
                        onClick={() => LogOutUser()} 
                        className={`border-2 border-black py-1 px-2 rounded-lg`}>
                        { User?.fullname ? "LogOut" : "Login"}
                    </button>
                </div>
            </nav>
        </div>
  )
}

export default Emp_NavBar