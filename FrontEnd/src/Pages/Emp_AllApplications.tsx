import React, { useEffect, useState } from 'react'
import Emp_Applications from '../Components/Emp_Applications'
import Emp_NavBar from '../Components/Emp_NavBar'
import { Client } from '../main'
import { GetAllApplications } from '../GraphQL/Queries'
import { Slide, toast, ToastContainer } from 'react-toastify'

const Emp_AllApplications = () => {

  let [AppData, setAppData] = useState<any[]>()
  let [FilteredData, setFilteredData] = useState<any[]>()
  const cachedData = Client.readQuery({ query: GetAllApplications })
  const [field, setField] = useState("")
  const [value, setvalue] = useState("")

  useEffect(() => {
    if(cachedData?.GetApplications) {
      setAppData(cachedData?.GetApplications);
      sessionStorage.setItem("AppsData", JSON.stringify(cachedData?.GetApplications));
    }
  }, [cachedData?.GetApplications]);

  if(!AppData){
    let apps: any = sessionStorage.getItem("AppsData")
    console.log(apps)
    if(apps){
      let JsonData = JSON.parse(apps)
      setAppData(JsonData)
    }
  }

  
  function SearchApp() {
    if (AppData) {
      let filtered = AppData.filter((item) => {
        if(field === "atsScore") {
          return item.atsScore > Number(value)
        }
        else if(field === "status"){
          return item.status === value.trim()[0].toUpperCase() + value.slice(1, value.length)
        }
        else if(field == "jobId.title"){
          return item.jobId.title.toLowerCase().includes(value.toLowerCase())
        }else{
          console.log("Invalid Search")
        }
        
      });

      if(filtered.length > 0){
      console.log("Check Filtered Data: ", filtered)
      setFilteredData(filtered)
      setAppData(filtered);
      }
      else {
        toast.error("Your Searched Item Does Not Exist")
      }
    }

  }

  function ClearSearch(){
    setFilteredData([])
    let apps: any = sessionStorage.getItem("AppsData")
    setvalue("")
    if(apps){
      let JsonData = JSON.parse(apps)
      setAppData(JsonData)
    }
  }

  return (
    <div>

      <div className=''>
        <Emp_NavBar />
      </div>

      {/* Search Bar */}
      <div className='p-4'>
        <div className="flex items-center relative bg-blue-200  rounded-full overflow-hidden shadow-lg w-full max-w-[36%]">

          {/* Search Icon + Input */}
          <div className="flex items-center px-4">
            <i className="ri-search-line text-gray-500 text-lg"></i>
            <input
              value={value}
              onChange={(e) => setvalue(e.target.value)}
              type="text"
              placeholder="Job title or keyword"
              className="p-3 w-48 text-black bg-transparent outline-none"
            />
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-white"></div>

          {/* Country Dropdown */}
          <select
            onChange={(e) => setField(e.target.value)}
            className="px-4 py-3 text-black bg-transparent outline-none cursor-pointer"
            defaultValue=""
          >
            <option value="" disabled>
              Find By
            </option>
            <option value="status">Status</option>
            <option value="atsScore">Score</option>
            <option value="jobId.title">Job Title</option>
          </select>

          {/* Button */}
          <button
            onClick={() => { SearchApp() }}
            className="bg-blue-700 px-5 py-3 ml-2 flex items-center justify-center text-white hover:bg-gray-800 transition">
            <i className="ri-arrow-right-line text-lg"></i>
          </button>

          { FilteredData && FilteredData.length > 0 ?
            <p
              onClick={() => ClearSearch()}
              className="absolute text-black text-2xl left-[435px] cursor-pointer">
              <i className="ri-close-circle-line"></i>
            </p> : null
          }
        </div>
      </div>

      <div>
        {AppData ? <Emp_Applications Applications={AppData} /> : ""}
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
        transition={Slide}
      />

    </div>
  )
}

export default Emp_AllApplications