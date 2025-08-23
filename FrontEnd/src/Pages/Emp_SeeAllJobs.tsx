import React, { useEffect, useState } from 'react';
import Emp_NavBar from '../Components/Emp_NavBar';
import { useMutation, useQuery } from '@apollo/client';
import { GetJobs } from '../GraphQL/Queries';
import { Job } from '../Components/Cards';
import { useNavigate } from 'react-router-dom';
import { DeleteJob } from '../GraphQL/Mutation';

const Emp_SeeAllJobs = () => {
  const { data, loading, error } = useQuery(GetJobs , {
    fetchPolicy: "network-only"
  });

  const [deletejob] = useMutation(DeleteJob, {
    refetchQueries: [{ query: GetJobs }],
    onError: (err) => console.log("Error Message", err)
  })

  const [JobData, setJobData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setJobData(data?.GetAllJobs); 
  }, [data]);

  function handleEdit(data: Job) {
    navigate("/edit/job", { state: { data } });
  }

  async function handleDelete(ID: string) {
    console.log("ID a gai")
    try {
      let res = await deletejob({
        variables: {
          id: ID
        }
      })


  }
  catch(err: any){
    console.log(err.message)
  }
}

  return (
    <div>
      <Emp_NavBar />
      <div className="p-6">
        <div className="overflow-auto max-h-[500px] border rounded-xl shadow-lg">
          <table className="table table-sm table-zebra table-pin-rows min-w-[400px]">
            <thead >
              <tr>
                <th className="p-2 bg-blue-500 text-white">#</th>
                <th className="bg-blue-500 text-white ">Title</th>
                <th className="bg-blue-500 text-white ">Closing Date</th>
                <th className="bg-blue-500 text-white ">Work Setup</th>
                <th className="bg-blue-500 text-white ">Salary</th>
                <th className="bg-blue-500 text-white ">Description</th>
                <th className="bg-blue-500 text-white ">Requirements</th>
                <th className="bg-blue-500 text-white ">Job Type</th>
                <th className="bg-blue-500 text-white ">Created At</th>
                <th className="bg-blue-500 text-white ">Applicants</th>
                <th className="bg-blue-500 text-white ">Edit</th>
                <th className="bg-blue-500 text-white ">Delete</th>
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
                    {job.description.split(" ").length > 5
                      ? job.description.split(" ").slice(0, 5).join(" ") + "..."
                      : job.description}
                  </td>
                  <td>{job.requirements.join(",")}</td>
                  <td>{job.jobType}</td>
                  <td>{new Date(Number(job.createdAt)).toLocaleDateString()}</td>
                  <td>{job.countApplicants}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(job)}
                      className="btn btn-sm btn-outline btn-primary"
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button 
                    onClick={() => handleDelete(job._id)}
                    className="btn btn-sm btn-outline btn-error">
                      Delete
                    </button>
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
