import React, { useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { UserDataContext } from '../Context/Usercontext'
import { useMutation, useQuery } from '@apollo/client'
import { EditJob } from '../GraphQL/Mutation'
import { Bounce, toast, ToastContainer } from 'react-toastify'

const Emp_EditJob = () => {

    const location = useLocation()
    const {User, setUser} = useContext(UserDataContext)
    const [ editjob, {data, loading, error}] = useMutation(EditJob)

    const formattedDate = location.state.data?.closingDate ? new Date(Number(location.state.data.closingDate)).toISOString().split("T")[0] : "";
    const [_id, set_id] = useState(location.state.data._id )
    const [title, settitle] = useState(location.state.data.title )
    const [workSetup, setworkSetup] = useState(location.state.data.workSetup)
    const [salary, setsalary] = useState(location.state.data.salary)
    const [description, setdescription] = useState(location.state.data.description)
    const [requirements, setrequirements] = useState(location.state.data.requirements.join(','))
    const [jobType, setjobType] = useState(location.state.data.jobType)
    const [createdBy, setcreatedBy] = useState(User._id)
    const [closingDate, setclosingDate] = useState(formattedDate)

    async function EditJobHandler(e: any){
      e.preventDefault()
      try{
        let response = await editjob({
          variables: {
            input: {
              _id,
              closingDate: new Date(closingDate).toLocaleDateString(),
              title,
              workSetup,
              salary,
              description,
              requirements,
              jobType,
              createdBy
            }
          }
        })
        if(response){
          console.log(response)    
          toast.success("Successfully Edit")
        }
      }
      catch(err: any){
        console.log(err.graphQLErrors[0])
      }
    }

    

  return (
    <div className=' w-screen h-screen bg-[url("/Bg_Img.jpg")] bg-no-repeat bg-cover'>
        <div className="fixed top-8 left-[27%] w-full max-w-xl bg-white/30 backdrop-blur-sm border border-white/40 rounded-2xl shadow-white/20 shadow-xl p-5 text-white overflow-y-auto max-h-[90vh]">
        <Link
          to={"/all/listed/jobs"}
          className='mb-4 text-xl flex gap-2 text-white'><i className="ri-arrow-go-back-line"></i> 
          <p>Back</p>
        </Link>
        <h1 className="text-2xl font-bold mb-4 mt-4 text-white">Edit Job Post</h1>

        <form className="space-y-5" onSubmit={(e) => EditJobHandler(e)}>
          <div>
            <label className="block mb-1 font-medium">Job Title</label>
            <input value={title} type="text" placeholder="e.g. Frontend Developer" className="glass-input-light" onChange={(e) => settitle(e.target.value)}/>
          </div>

          <div>
            <label className="block mb-1 font-medium">Work Setup</label>
            <select value={workSetup} className="glass-input-light" onChange={(e) => setworkSetup(e.target.value)}>
              <option value="">Select</option>
              <option>onsite</option>
              <option>remote</option>
              <option>hybrid</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Job Type</label>
            <select value={jobType} className="glass-input-light" onChange={(e) => setjobType(e.target.value)}>
              <option value="">Select</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="internship">Internship</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Expected Salary</label>
            <input value={salary} type="text" placeholder="e.g. 60K - 100K" className="glass-input-light" onChange={(e) => setsalary(e.target.value)}/>
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea value={description} rows={4} placeholder="Job details..." className="glass-input-light resize-none" onChange={(e) => setdescription(e.target.value)}/>
          </div>

          <div>
            <label className="block mb-1 font-medium">Required Skills</label>
            <input value={requirements} type="text" placeholder="e.g. React, Node.js" className="glass-input-light" onChange={(e) => setrequirements(e.target.value)}/>
          </div>

          <div>
            <label className="block mb-1 font-medium">Deadline</label>
            <input value={closingDate} type="date" className="glass-input-light" onChange={(e) => setclosingDate(e.target.value)}/>
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </div>
  )
  
}

export default Emp_EditJob