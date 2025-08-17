import React, { useEffect, useState } from 'react';
import Emp_NavBar from '../Components/Emp_NavBar';
import { useQuery } from '@apollo/client';
import { GetJobs } from '../GraphQL/Queries';
import { Job } from '../Components/Cards';
import { useNavigate } from 'react-router-dom';

const Emp_SeeAllJobs = () => {
  const { data, loading, error } = useQuery(GetJobs);
  const [JobData, setJobData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    setJobData(data?.GetAllJobs);
  }, [data]);

  function handleEdit(data: Job){
    navigate("/edit/job", {state: {data}})
  }

  return (
    <div>
      <Emp_NavBar />

      <div className="p-6">
        <div className="overflow-x-auto shadow-lg rounded-xl">
          <table className="table table-zebra w-full text-sm md:text-base">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-4">#</th>
                <th>Title</th>
                <th>Closing Date</th>
                <th>Work Setup</th>
                <th>Salary</th>
                <th>Description</th>
                <th>Requirements</th>
                <th>Job Type</th>
                <th>Created At</th>
                <th>Applicants</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {JobData?.map((job: any, index) => (
                <tr
                  key={job.id}
                  className="hover:bg-blue-50 transition-colors duration-200"
                >
                  <td className="p-4 font-medium">{index + 1}</td>
                  <td className="font-semibold">{job.title}</td>
                  <td>{new Date(Number(job.closingDate)).toLocaleDateString()}</td>
                  <td>{job.workSetup}</td>
                  <td className="text-green-600 font-semibold">${job.salary}</td>
                  <td
                    className="max-w-xs truncate"
                    title={job.description}
                  >
                    {job.description.split(" ").length > 5 ? job.description.split(" ").slice(0,5).join(" ") +"..."
                    : job.description}
                  </td>
                  <td>{job.requirements.join(',')}</td>
                  <td>{job.jobType}</td>
                  <td>{new Date(Number(job.createdAt)).toLocaleDateString()}</td>
                  <td className=''>{job.applicants?.length || 0}</td>
                  <td>
                    <button 
                    onClick={() => handleEdit(job)}
                    className="btn btn-sm btn-outline btn-primary ">Edit</button>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline btn-error">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Emp_SeeAllJobs;
