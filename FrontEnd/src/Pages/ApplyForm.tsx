import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../Context/Usercontext';
import axios from 'axios';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { useLazyQuery } from '@apollo/client';
import { GetJobs } from '../GraphQL/Queries';

const ApplyForm = () => {
  let arr = ["#slide1", "#slide2", "#slide3", "#slide4"];
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    window.location.href = arr[counter];
  }, [counter])

  const [getjobs, { data: lazyData, loading: lazyLoading, error: lazyError }] = useLazyQuery(GetJobs, {
    fetchPolicy: 'network-only'
  });
  const {User} = useContext(UserDataContext)

  const location = useLocation()
  const navigate = useNavigate()
  const [fullname, setFullname] = useState(User.fullname);
  const [email, setEmail] = useState(User.email);
  const [phone, setPhone] = useState(User.phone || "");
  const [jobId, setJobId] = useState("");
  const [candidateDescription, setCandidateDescription] = useState("");
  const [linkedInProfile, setLinkedInProfile] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [skills, setSkills] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [position, setposition] = useState("");
  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");

  
console.log(User._id)
  useEffect(() => {
      setJobId(location.state?.ID)
  }, [])

  async function Submitform(){
    const formdata = new FormData()
    formdata.append("fullname", fullname)
    formdata.append("email", email)
    formdata.append("phone", phone)
    formdata.append("jobId", jobId)
    formdata.append("candidateId", User._id)
    formdata.append("candidateDescription", candidateDescription)
    formdata.append("linkedInProfile", linkedInProfile)
    if (resume) {
      formdata.append("resume", resume);
    }
    formdata.append("skills", skills)
    formdata.append("companyName", companyName)
    formdata.append("position", position)
    formdata.append("startDate", startDate)
    formdata.append("endDate", endDate)

    try{
      let response = await axios.post("http://localhost:4000/submit/application", formdata, {withCredentials: true})
      console.log(response)
      console.log(response)
      if(response.status === 201){
        getjobs()
        navigate("/")
      }
    }
    catch(err: any){
      toast.error(err.response.data.error)
    }

  }


  return (

    <div className="p-6 space-y-3 w-screen h-screen bg-[#d1d1d1]">
        <Link //Back Button
          to={"/"}
          className='absolute text-xl flex gap-2 text-black '>
          <i className="ri-arrow-go-back-line"></i> 
          <p>Back</p>
        </Link>
      {/* Steps Indicator */}
      <div className=" flex justify-center text-lg h-16 ">
        <ul className="steps w-[50%] ">
          <li className={` step ${counter >= 0 ? "step-primary" : ""}`}>Personal Info</li>
          <li className={`step ${counter >= 1 ? "step-primary" : ""}`}>Professional Profile</li>
          <li className={`step ${counter >= 2 ? "step-primary" : ""}`}>Work Experience</li>
          <li className={`step ${counter >= 3 ? "step-primary" : ""}`}>Review & Submit</li>
        </ul>
      </div>

      {/* Carousel */}
      <div className="carousel w-[60%] ml-[21%] rounded-lg mt-2   shadow-black shadow-lg ">

        {/* Slide 1 - Personal Information */}
        <div id="slide1" className="carousel-item relative w-full">
          <div className='bg-gradient-to-bl from-[#23b993]  to-[#1f9199] w-full p-6 space-y-4'>
            <h2 className="text-2xl text-white font-bold">Personal Information</h2>
            <input value={fullname} onChange={(e) => setFullname(e.target.value)} type="text" placeholder="Full Name" className="input input-bordered w-[600px] border-2 hover:border-black" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="input input-bordered w-[600px] border-2 hover:border-black" />
            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="Phone" className="input input-bordered w-[600px] border-2 hover:border-black" />
          </div>
        </div>


        {/* Slide 2 - Professional Profile */}
        <div id="slide2" className="carousel-item relative w-full">
          <div className='bg-gradient-to-bl from-[#23b993]  to-[#1f9199] w-full p-8 space-y-5'>
            <h2 className="text-2xl text-white font-bold">Professional Profile</h2>
            <div className="w-[600px] py-2 bg-white rounded-lg flex items-center px-5  border-2 hover:border-black cursor-pointer">
              <p className="text-gray-400">Choose Resume</p>
              <p className='ml-5'>{resume?.name}</p>
              <input
                onChange={(e) => setResume(e.target?.files ? e.target?.files[0] : null)}
                required
                type="file"
                className="absolute opacity-0 w-full cursor-pointer" />
            </div>

            <input value={linkedInProfile} onChange={(e) => setLinkedInProfile(e.target.value)} type="text" placeholder="LinkdIn Profile" className="input input-bordered w-[600px] border-2 hover:border-black" />
            <input required value={skills} onChange={(e) => setSkills(e.target.value)} type="text" placeholder="Skills Comma Separated e.g: react, nodejs, java" className="input input-bordered w-[600px] border-2 hover:border-black" />
            <textarea value={candidateDescription} onChange={(e) => setCandidateDescription(e.target.value)} rows={3} placeholder="Tell us something about you" className=" textarea w-[600px] shadow-lg"></textarea>
          </div>
        </div>

        {/* Slide 3 - Work Experience */}
        <div id="slide3" className="carousel-item relative w-full">
          <div className='bg-gradient-to-bl from-[#23b993]  to-[#1f9199] w-full p-8 space-y-5'>
            <h2 className="text-2xl -mb-4 text-white font-bold">Work Experience</h2>
            <h1 className='text-white'>Tell Us, About Your Last or Current Job</h1>
            <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} type="text" placeholder="Company Name" className="input input-bordered w-[600px] border-2 hover:border-black" />
            <input value={position} onChange={(e) => setposition(e.target.value)} type="text" placeholder="Position" className="input input-bordered w-[600px] border-2 hover:border-black" />
            <div className="w-[600px] bg-white rounded-lg flex items-center px-5 justify-between border-2 hover:border-black">
              <p className='text-gray-400'>Starting Date</p>
              <input value={startDate} onChange={(e) => setstartDate(e.target.value)} type="date" placeholder="Starting Date" className="h-12 w-[450px] border-0 focus:outline-none  " />
            </div>
            <div className="w-[600px] bg-white rounded-lg flex items-center px-5 justify-between border-2 hover:border-black">
              <p className='text-gray-400'>End Date</p>
              <input value={endDate} onChange={(e) => setendDate(e.target.value)} type="date" placeholder="End Date" className="h-12 w-[450px] border-0 focus:outline-none" />
            </div>
          </div>
        </div>

        {/* Slide 4 - Review */}
        <div id="slide4" className="carousel-item relative w-full">
          <div className='bg-gradient-to-bl from-[#23b993]  to-[#1f9199] w-full p-6 space-y-2 text-white'>
            <h2 className="text-xl text-white font-bold">Review & Submit</h2>
            <hr />
            <p><strong>Name: </strong>{fullname} </p>
            <p><strong>Email: </strong>{email} </p>
            <p><strong>Phone: </strong>{phone} </p>
            <hr />
            <p><strong>Skills: </strong>{skills} </p>
            <p><strong>LinkdIn Profile: </strong>{linkedInProfile} </p>
            <p><strong>Resume: </strong>{resume?.name} </p>
            <hr />
            <p><strong>Company Name:</strong> {companyName} </p>
            <p><strong>Position: </strong>{position} </p>
            <p><strong>Start Date: </strong>{startDate} </p>
            <p><strong>End Date: </strong>{endDate} </p>
            <button
              onClick={Submitform}
              className='absolute top-[83%] left-[83%] h-10 bg-white text-black w-28 transition-transform duration-300 hover:scale-110 hover:font-medium rounded-lg'>
              Submit
            </button>

          </div>
        </div>

      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between w-[60%] ml-[21%] py-3">
        <button
          onClick={() => setCounter(counter-1)}
          className={`btn btn-primary w-32 h-14 text-lg  ${counter === 0 ? 'btn-disabled' : ''}`}
        >
          Previous
        </button>

        <button
          onClick={() => setCounter(counter + 1)}
          className={`btn btn-success w-32 h-14 text-lg ${counter === 3 ? 'btn-disabled' : ''}`}
        >
          Next
        </button>
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
        transition={Bounce}
      />
    </div>
  );
};

export default ApplyForm;
