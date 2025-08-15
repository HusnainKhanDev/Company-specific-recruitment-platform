import React from 'react';
import Emp_NavBar from '../Components/Emp_NavBar';

const Emp_SeeAllJobs = () => {
  return (
    <div className=''>    
        <div>
            <Emp_NavBar/>
        </div>

      <div className="h-[570px] overflow-x-auto p-3 mt-3">
      <table className="table table-xs table-pin-rows table-pin-cols bg-blue-200">
        <thead >
          <tr>
            <th>#</th>
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
          <tr>
            <th>1</th>
            <td>Frontend Developer</td>
            <td>2025-09-30</td>
            <td>Remote</td>
            <td>$3000/month</td>
            <td className="max-w-xs truncate" title="Build and maintain user interfaces using React.">
              Build and maintain user interfaces using React.
            </td>
            <td>HTML, CSS, JavaScript, React</td>
            <td>Full-Time</td>
            <td>2025-08-14</td>
            <td>12</td>
            <td>Edit</td>
            <td>Delete</td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>

  );
};

export default Emp_SeeAllJobs;
