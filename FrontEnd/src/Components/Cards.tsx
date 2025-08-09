import React from 'react'

const Cards = () => {
    return (
        <div>
            <div className="card w-[70%] border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-gradient-to-r from-purple-50 to-white">
                <div className="card-body ">

                    <h2 className="card-title text-2xl font-bold text-gray-800 -mb-3">
                        Backend Developer
                    </h2>

                    <div className="absolute top-8 left-[93%] flex flex-col items-center cursor-pointer text-white hover:text-black group">
                        <i className="ri-bookmark-line text-black text-lg transition-transform duration-300 group-hover:translate-y-1"></i>
                        <p className="text-xs transition-transform duration-300 -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                            Save Job
                        </p>
                    </div>


                    <div className='flex gap-5 items-baseline mt-3'>
                        <h3 className="text-md font-medium text-purple-700 bg-gray-200 px-3 py-1 rounded-full w-fit">
                            On-site
                        </h3>
                        <p className='text-lg font-normal'><i className="ri-user-6-line font-semibold"></i> 2</p>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-lg w-[70%]">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad officia facere at illo cupiditate eius.
                    </p>

                    {/* Salary */}
                    <h2 className="text-lg font-semibold text-green-600">
                        Salary: PKR 55k - 65k
                    </h2>

                    {/* Footer */}
                    <div className="card-actions justify-between items-center pt-4 border-t border-gray-300">

                        {/* Date */}
                        <span className="text-lg text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
                            15/8/2025
                        </span>

                        {/* Button */}
                        <button className="btn btn-primary rounded-full px-6 hover:text-white">
                            Apply Now
                        </button>
                    </div>

                </div>
            </div>



        </div>
    )
}

export default Cards