


export interface Job {
    _id: string;
    title: string;
    closingDate: string;
    workSetup: string;
    salary: string;
    description: string;
    requirements: [string],
    jobType: string,
    createdBy: string;
    createdAt: string;
    countApplicants: Number;
}


const Cards = (prop: any) => {
    console.log("prop.Jobs ", prop.Jobs)
    if(!prop.Jobs) return <p className='text-xl font-medium'>No jobs found</p>

    if (prop.Jobs.length === 0) return <p className='text-xl font-medium'>No New Jobs are Avialable!</p>;

    return prop.Jobs.map((i: Job) => {
        const ProperDate = new Date(Number(i.createdAt));

        return (
            <div>


                <div className="card w-[70%] border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-gradient-to-r from-purple-50 to-white">
                    <div className="card-body ">

                        <h2 className="card-title text-2xl font-bold text-gray-800 -mb-3">
                            {i.title.toUpperCase()}
                        </h2>

                        <div className="absolute top-8 left-[93%] flex flex-col items-center cursor-pointer text-white hover:text-black group">
                            <i className="ri-bookmark-line text-black text-lg transition-transform duration-300 group-hover:translate-y-1"></i>
                            <p className="text-xs transition-transform duration-300 -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                                Save Job
                            </p>
                        </div>

                        <div className='flex gap-5 items-baseline mt-3'>
                            <h3 className="text-md font-medium text-purple-700 bg-gray-200 px-3 py-1 rounded-full w-fit">
                                {i.jobType}
                            </h3>
                            <p className='text-lg font-normal'><i className="ri-user-6-line font-semibold"></i> {String(i.countApplicants)}</p>
                        </div>

                        <p className="text-gray-600 text-lg w-[70%]">
                            {i.description}
                        </p>

                        <h2 className="text-lg font-semibold text-green-600">
                            Salary: {i.salary}
                        </h2>

                        <div className="card-actions justify-between items-center pt-4 border-t border-gray-300">
                            <span className="text-lg justify-between items-baseline text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
                                Post Date:
                                <span className='bg-blue-200 px-2 rounded-full ml-1'>{ProperDate.toLocaleDateString()}</span>
                            </span>
                            <label htmlFor="my-drawer-4"
                                onClick={() => prop.setPassDataToPannel(i)}
                                className="drawer-button btn btn-primary rounded-full px-6 hover:text-white">
                                Apply
                            </label>
                        </div>

                    </div>
                </div>



            </div>
        )
    })

}

export default Cards