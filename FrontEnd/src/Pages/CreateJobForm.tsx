import React, { useContext, useState } from 'react';
import { UserDataContext } from '../Context/Usercontext';
import { CreateJobMut } from '../GraphQL/Mutation';
import { useMutation } from '@apollo/client';

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
        const reqArray: String[] = requirements.split(",")
      
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
                requirements: reqArray,

            }
          }
        })
        if(response) {
          console.log(response.data.CreateNewJob)
        }
      }
      catch(err){
          console.log(err)
      }





    }







 
    return (
    <div
      className="w-full h-screen bg-[url('/bg-office.png')] bg-conver bg-center overflow-hidden bg-no-repeat  px-6 py-10"
    >
     
     <div className="w-full max-w-xl bg-white/50 backdrop-blur-md border border-white/40 rounded-2xl shadow-2xl p-8 text-gray-800 overflow-y-auto max-h-[90vh]">
        <p className='-mt-4 mb-4 text-xl text-black'><i className="ri-arrow-go-back-line"></i> back</p>
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Create Job Posting</h1>

        <form className="space-y-5" onSubmit={(e) => CreateJobFromHandler(e)}>
          <div>
            <label className="block mb-1 font-medium">Job Title</label>
            <input type="text" placeholder="e.g. Frontend Developer" className="glass-input-light" onChange={(e) => settitle(e.target.value)}/>
          </div>

          <div>
            <label className="block mb-1 font-medium">Work Setup</label>
            <select className="glass-input-light" onChange={(e) => setworkSetup(e.target.value)}>
              <option value="">Select</option>
              <option>onsite</option>
              <option>remote</option>
              <option>hybrid</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Job Type</label>
            <select className="glass-input-light" onChange={(e) => setjobType(e.target.value)}>
              <option value="">Select</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Internship</option>
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

          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-blue-600 w-[500px] hover:bg-black  text-white font-semibold px-6 py-2 rounded-md transition duration-300"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJobForm;
