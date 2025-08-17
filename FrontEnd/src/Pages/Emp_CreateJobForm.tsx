import React, { useContext, useState } from 'react';
import { UserDataContext } from '../Context/Usercontext';
import { CreateJobMut } from '../GraphQL/Mutation';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Bounce, Flip, toast, ToastContainer } from 'react-toastify';

const CreateJobForm = () => {

    const [title, settitle] = useState("")
    const [workSetup, setworkSetup] = useState("")
    const [salary, setsalary] = useState("")
    const [description, setdescription] = useState("")
    const [requirements, setrequirements] = useState("")
    const [jobType, setjobType] = useState("")
    const [createdBy, setcreatedBy] = useState("")
    const [closingDate, setclosingDate] = useState("")

    const {User} = useContext(UserDataContext)
    const [CreateJob, { data, loading, error} ] = useMutation(CreateJobMut)

   
    async function CreateJobFromHandler(e: any){
        e.preventDefault()
        setcreatedBy(User._id)
      
      try{
        let response = await CreateJob({
          variables: {
            input:  {
                title,
                workSetup,
                salary,
                jobType,
                createdBy,
                closingDate,
                description,
                requirements,
            }
          }
        })
        if(response.data.CreateNewJob) {
          toast.success("New Job is Created")
        }
      }
      catch(error: any){
          // console.log("Create form",  error.graphQLErrors[0].message)
          toast.error(error.graphQLErrors[0].message)
      }
    }



    return (
      // Main Div
    <div className="w-full h-screen bg-[url('/bg-office.png')] bg-conver bg-center overflow-hidden bg-no-repeat  px-6 py-10">
     
     {/* Actual Card */}
     <div className="w-full max-w-xl bg-white/50 backdrop-blur-md border border-white/40 rounded-2xl shadow-2xl p-5 text-gray-800 overflow-y-auto max-h-[90vh]">
        
        <Link //Back Button
          to={"/employeer/Dashboard"}
          className='mb-4 text-xl flex gap-2 text-black'><i className="ri-arrow-go-back-line"></i> 
          <p>Back</p>
        </Link>

        <h1 className="text-2xl font-bold mb-4 mt-4 text-gray-800">Create Job Posting</h1>
        

        <form className="space-y-5" onSubmit={(e) => CreateJobFromHandler(e)}>
          <div>
            <label className="block mb-1 font-medium">Job Title</label>
            <input type="text" placeholder="e.g. Frontend Developer" className="glass-input-light" onChange={(e) => settitle(e.target.value)}/>
          </div>

          <div>
            <label className="block mb-1 font-medium">Work Setup</label>
            <select className="glass-input-light" onChange={(e) => setworkSetup(e.target.value)}>
              <option value="">Select</option>
              <option value={"onsite"}>onsite</option>
              <option value={"remote"}>remote</option>
              <option value={"hybrid"}>hybrid</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Job Type</label>
            <select className="glass-input-light" onChange={(e) => setjobType(e.target.value)}>
              <option value="">Select</option>
              <option value={"full-time"}>Full-time</option>
              <option value={"part-time"}>Part-time</option>
              <option value={"internship"}>Internship</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Expected Salary</label>
            <input type="text" placeholder="e.g. 60K - 100K" className="glass-input-light" onChange={(e) => setsalary(e.target.value)}/>
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea rows={4} placeholder="Job details..." className="glass-input-light resize-none" onChange={(e) => setdescription(e.target.value)}/>
          </div>

          <div>
            <label className="block mb-1 font-medium">Required Skills</label>
            <input type="text" placeholder="e.g. React, Node.js" className="glass-input-light" onChange={(e) => setrequirements(e.target.value)}/>
          </div>

          <div>
            <label className="block mb-1 font-medium">Deadline</label>
            <input type="date" className="glass-input-light" onChange={(e) => setclosingDate(e.target.value)}/>
          </div>

            <button
              type="submit"
              className="bg-blue-600  w-[520px] hover:bg-black  text-white font-semibold px-6 py-2 rounded-md transition duration-300"
            >
              Post Job
            </button>
        </form>

      {/* Card End */}
      </div> 

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Flip}
      />




    </div>
  );
};

export default CreateJobForm;
