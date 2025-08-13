import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <div>
            <nav className="w-full flex justify-between items-center px-8 py-4 ">
                <h2 className="text-xl font-bold">JobFinder</h2>
                <ul className="flex space-x-6 ">
                    <Link to={'/'} className="hover:font-semibold cursor-pointer">Home</Link>
                    <Link to={'/all/job'} className="hover:font-semibold cursor-pointer">All Jobs</Link>
                    <Link to={'/user/appliations'} className="hover:font-semibold cursor-pointer">My Applications</Link>
                    <li className="hover:font-semibold cursor-pointer">Contact</li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar