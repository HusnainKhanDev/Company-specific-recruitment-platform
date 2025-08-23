import React from 'react'
import { Link } from 'react-router-dom'

const Emp_NavBar = () => {
  return (
        <div>
            <nav className="w-full flex justify-between items-center px-8 py-4 bg-blue-300 border-b-2 border-black">
                <h2 className="text-xl font-bold">JobFinder</h2>
                <ul className="flex space-x-6 ">
                    <Link to={'/employeer/Dashboard'} className="hover:font-semibold cursor-pointer">Home</Link>
                    <Link to={'/create/job'} className="hover:font-semibold cursor-pointer">Create Jobs</Link>
                    <Link to={'/all/applications'} className="hover:font-semibold cursor-pointer">All Applications</Link>
                    <Link to={'/all/listed/jobs'} className="hover:font-semibold cursor-pointer">All Jobs</Link>
                    <li className="hover:font-semibold cursor-pointer">Contact</li>
                </ul>
            </nav>
        </div>
  )
}

export default Emp_NavBar