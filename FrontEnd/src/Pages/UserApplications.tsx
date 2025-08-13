import React from 'react'
import NavBar from '../Components/NavBar'

const UserApplications = () => {
    return (
        <div>
            {/* Navbar */}
            <div className='text-black bg-blue-300 shadow-md fixed top-0 left-0 w-full z-50'>
                <NavBar />
            </div>

            {/* Main Content */}
            <div className='mt-24 w-[50%] p-4 '>

                <div tabIndex={0} className="collapse collapse-arrow border-2 border-blue-400 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300">
                    <input type="checkbox" />

                    {/* Header */}
                    <div className="collapse-title space-y-1">
                        <p className="text-lg font-semibold text-gray-800">Muhammad Husnain Khan</p>

                        <div className='flex gap-5 text-gray-600'>

                            <p className='flex items-center gap-1'><i className="ri-mail-line text-blue-500"></i> husnain@gmail.com</p>

                            <p className='flex items-center gap-1'> <i className="ri-phone-line text-green-500"></i> 03498395714</p>
                        </div>

                        <p className=" text-gray-700"><span className="font-medium text-blue-600">Applied For:</span> Frontend Developer</p>

                        <hr />
                    </div>



                    {/* Body */}
                    <div className="collapse-content text-sm text-gray-700 space-y-2">

                        {/* Resume */}
                        <p className='flex items-center'>
                            <span className="font-medium text-gray-800 flex items-center">
                                <i className="ri-article-line text-lg"></i> Resume:</span>
                            <a
                                href="http://localhost:4000/uploads/1754940785419.docx"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 text-blue-500 underline hover:text-blue-700"
                            > View Resume
                            </a>
                        </p>

                        {/* LinkedIn */}
                        <p className='flex items-center'>
                            <span className="font-medium text-gray-800 flex items-center">
                                <i className="ri-linkedin-box-fill text-blue-600 text-lg"></i>
                                LinkedIn:</span>
                            <a
                                href="#"
                                target="_blank"
                                className="ml-2 text-blue-500 underline hover:text-blue-700"
                            >
                                Profile Link
                            </a>
                        </p>

                        {/* Skills */}
                        <div className='flex gap-2 '>
                            <p className="font-medium text-gray-800">Your Skills:</p>
                            <p className="text-gray-600">React, Node.js, Express</p>
                        </div>

                        {/* Description */}
                        <div>
                            <h1 className="font-semibold text-gray-900 mb-1">Description:</h1>
                            <p className="text-gray-600 leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis eaque tenetur eos enim recusandae, sapiente adipisci voluptas sed quae sit quos laudantium iure quasi sequi placeat tempore molestias quo? Possimus voluptates nemo neque odio voluptatum soluta, est rem, commodi placeat ducimus nisi labore cum dignissimos. Illum totam iusto tenetur quae.
                            </p>
                        </div>

                        {/* Last Job */}
                        <div className="space-y-1">
                            <h1 className="font-semibold text-gray-900">Last Job</h1>
                            <p className="text-gray-600">Company Name</p>
                            <p className="text-gray-600">Position</p>
                            <p className="text-gray-600">Start Date</p>
                            <p className="text-gray-600">End Date</p>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default UserApplications
