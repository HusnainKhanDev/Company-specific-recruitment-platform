import React from 'react'

const Emp_Applications = (prop: any) => {
    return (
        <div className=''>
            {prop?.Applications?.map((app: any) => (
                <div key={app._id} className='mt-6 w-[50%] p-4'>
                    <div
                        tabIndex={0}
                        className='collapse collapse-arrow border-2 border-blue-400 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300'
                    >
                        <input type='checkbox' />

                        {/* Header */}
                        <div className='collapse-title space-y-1'>
                            <p className='text-lg font-semibold text-gray-800'>{app.fullname}</p>

                            <div className='flex gap-5 text-gray-600'>
                                <p className='flex items-center gap-1'>
                                    <i className='ri-mail-line text-blue-500'></i> {app.email}
                                </p>
                                <p className='flex items-center gap-1'>
                                    <i className='ri-phone-line text-green-500'></i> {app.phone}
                                </p>
                            </div>

                            <p className='text-gray-700'>
                                <span className='font-medium text-blue-600'>Applied For:</span> {app.jobId.title.toUpperCase()}
                            </p>

                            <hr />
                        </div>

                        {/* Body */}
                        <div className='collapse-content text-sm text-gray-700 space-y-2'>
                            {/* Resume */}
                            <p className='flex items-center'>
                                <span className='font-medium text-gray-800 flex items-center'>
                                    <i className='ri-article-line text-lg'></i> Resume:
                                </span>
                                <a
                                    href={`http://localhost:4000/uploads/${app.resume}`}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='ml-2 text-blue-500 underline hover:text-blue-700'
                                >
                                    {app.resume.split("_")[1]}
                                </a>
                            </p>

                            {/* LinkedIn */}
                            <p className='flex items-center'>
                                <span className='font-medium text-gray-800 flex items-center'>
                                    <i className='ri-linkedin-box-fill text-blue-600 text-lg'></i>
                                    LinkedIn:
                                </span>
                                <a
                                    href={app.linkedInProfile}
                                    target='_blank'
                                    className='ml-2 text-blue-500 underline hover:text-blue-700'
                                >
                                    View Profile
                                </a>
                            </p>

                            {/* Skills */}
                            <div className='flex gap-2'>
                                <p className='font-medium text-gray-800'>Skills:</p>
                                <p className='text-gray-600'>{app.skills?.join(', ')}</p>
                            </div>

                            {/* Description */}
                            <div>
                                <h1 className='font-semibold text-gray-900 mb-1'>Description:</h1>
                                <p className='text-gray-600 leading-relaxed'>{app.candidateDescription}</p>
                            </div>

                            {/* Last Job */}
                            <div className='space-y-1'>
                                <h1 className='font-semibold text-gray-900'>Last Job</h1>
                                <p className='text-gray-600'>{app.pastJob?.companyName}</p>
                                <p className='text-gray-600'>{app.pastJob?.position}</p>
                                <p className='text-gray-600'>{app.pastJob?.startDate ? new Date(app.pastJob.endDate).toLocaleDateString() : ""}</p>
                                <p className='text-gray-600'>{app.pastJob?.endDate ? new Date(app.pastJob.endDate).toLocaleDateString() : ""}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )

}

export default Emp_Applications