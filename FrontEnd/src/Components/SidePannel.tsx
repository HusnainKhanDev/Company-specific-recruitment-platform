import React from 'react';
import { Job } from './Cards';
import { useNavigate } from 'react-router-dom';

interface PassPannelDataIF {
  PassPannelData?: Job;
}

const SidePannel = ({ PassPannelData }: PassPannelDataIF) => {
  const navigate = useNavigate()
  
  function HandleApply(id: string){
      navigate("/apply/job/form", {state: {ID: id}})
  }

  if (!PassPannelData) return null; 
  const createdate = new Date(Number(PassPannelData?.createdAt))
  const lastdate = new Date(Number(PassPannelData?.closingDate))

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content"></div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>

        <ul className="menu bg-white min-h-full w-[30%] p-3 space-y-4">
          {/* Job Title */}
          <div>
            <h1 className="font-bold text-xl text-gray-800">{PassPannelData.title.toUpperCase()}</h1>
            <div className="flex justify-between mt-1 items-baseline text-gray-600">
              <span className="badge text-white badge-primary px-3 py-3">{PassPannelData.jobType}</span>
              <span>📅 {createdate.toLocaleDateString()}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-1 -mt-2">Description</h2>
            <p className="whitespace-pre-wrap text-justify h-44 overflow-y-scroll bg-blue-50 p-3 rounded-lg leading-relaxed text-gray-600 hide-scrollbar">
              {PassPannelData.description}
            </p>
          </div>

          {/* Requirements */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-1 -mt-2">Requirements</h2>
            <div className="h-40 overflow-y-scroll bg-blue-50 p-3 rounded-lg hide-scrollbar">
              <ul>
                {PassPannelData.requirements.map((req, index) => (
                  <li key={index}>
                    <div className='p-1'>
                      <i className="ri-circle-fill text-[8px]"></i>
                      <p>{req}</p>
                    </div> 
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Salary & Work Setup */}
          <div className="flex justify-between font-medium text-gray-700">
            <span className='badge bg-green-400 flex gap-1'><p>Salary:</p><strong> {PassPannelData.salary}</strong></span>
            <span className='badge badge-accent py-1 px-2'>{PassPannelData.workSetup.charAt(0).toUpperCase() + PassPannelData.workSetup.slice(1)}</span>
          </div>
          {/* Last Date */}
          <div className="flex items-baseline gap-2">
            <h3 className="font-medium text-gray-800">Last Date to Apply:</h3>
            <p className=" text-red-500">{lastdate.toLocaleDateString()}</p>
          </div>

          {/* Apply Button */}
          <div>
            <button
              onClick={() => HandleApply(PassPannelData._id)}
              className="btn btn-primary w-full text-lg text-white shadow-lg hover:shadow-black hover:shadow-lg">
              Apply Now
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default SidePannel;
