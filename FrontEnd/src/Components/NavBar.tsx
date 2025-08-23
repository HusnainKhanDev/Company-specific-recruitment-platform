import axios from 'axios'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../Context/Usercontext'


const NavBar = ({Color}: any) => {

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
            <nav className="w-full flex justify-between items-center px-8 py-4">
                {/* Left side: Brand */}
                <h2 style={{ fontFamily: "Tangerine, cursive", }} className="text-3xl font-bold">CompanyLogo</h2>
                
                {/* Right side: Menu + Logout */}
                <div className="flex items-center space-x-6">
                    <ul className="flex space-x-6">
                        <Link to={'/'} className="hover:font-semibold cursor-pointer">Home</Link>
                        <Link to={'/all/job'} className="hover:font-semibold cursor-pointer">All Jobs</Link>
                        <Link to={'/user/appliations'} className="hover:font-semibold cursor-pointer">My Applications</Link>
                        <li className="hover:font-semibold cursor-pointer">About Us</li>
                    </ul>

                    {/* Logout button */}
                    <button
                    onClick={() => LogOutUser()} 
                    className={`border-2 border-${Color} py-1 px-2 rounded-lg`}>
                        { User?.fullname ? "LogOut" : "Login"}
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default NavBar
