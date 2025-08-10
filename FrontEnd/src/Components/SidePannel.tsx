import React from 'react';
import { Job } from './Cards';

interface PassDataIF {
  PassData?: Job;
}

const SidePannel = ({ PassData }: PassDataIF) => {
  console.log("Data from Side pannel: ", PassData);
 

  if (!PassData) return null; 
  const createdate = new Date(Number(PassData?.createdAt))
  const lastdate = new Date(Number(PassData?.closingDate))

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content"></div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>

        <ul className="menu bg-white min-h-full w-[30%] p-3 space-y-4">
          {/* Job Title */}
          <div>
            <h1 className="font-bold text-xl text-gray-800">{PassData.title.toUpperCase()}</h1>
            <div className="flex justify-between mt-1 items-baseline text-gray-600">
              <span className="badge text-white badge-primary px-3 py-3">{PassData.jobType}</span>
              <span>📅 {createdate.toLocaleDateString()}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-1 -mt-2">Description</h2>
            <p className="text-justify h-44 overflow-y-scroll bg-blue-50 p-3 rounded-lg leading-relaxed text-gray-600 hide-scrollbar">
              {PassData.description}
            </p>
          </div>

          {/* Requirements */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-1 -mt-2">Requirements</h2>
            <div className="h-40 overflow-y-scroll bg-blue-50 p-3 rounded-lg hide-scrollbar space-y-2">
              {PassData.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </div>
          </div>

          {/* Salary & Work Setup */}
          <div className="flex justify-between font-medium text-gray-700">
            <span className='badge bg-green-400 flex gap-1'><p>Salary:</p><strong> {PassData.salary}</strong></span>
            <span className='badge badge-accent py-1 px-2'>{PassData.workSetup.charAt(0).toUpperCase() + PassData.workSetup.slice(1)}</span>
          </div>
          {/* Last Date */}
          <div className="flex items-baseline gap-2">
            <h3 className="font-medium text-gray-800">Last Date to Apply:</h3>
            <p className=" text-red-500">{lastdate.toLocaleDateString()}</p>
          </div>

          {/* Apply Button */}
          <div>
            <button className="btn btn-primary w-full text-lg text-white shadow-lg hover:shadow-black hover:shadow-lg">
              Apply Now
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default SidePannel;
