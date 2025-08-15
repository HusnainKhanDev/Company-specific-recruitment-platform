import React from 'react'
import AuthPage from './Pages/AuthPage'
import LandingPage from './Pages/LandingPage'
import CreateJobForm from './Pages/Emp_CreateJobForm'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserProtectedRoutes from './Components/UserProtectedRoutes'
import EmpLandingPage from './Pages/Emp_LandingPage'
import EmployeerProtector from './Components/EmployeerProtector'
import AllJobs from './Pages/AllJobs'
import ApplyForm from './Pages/ApplyForm'
import UserApplications from './Pages/UserApplications'
import Emp_SeeAllJobs from './Pages/Emp_SeeAllJobs'
import Emp_AllApplications from './Pages/Emp_AllApplications'


const app = () => {

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <div><LandingPage/></div>
    },
    {
      path: "/auth",
      element: <div><AuthPage/></div>
    },
    {
      path: "/all/job",
      element: <div> <AllJobs/></div>
    },
    {
      path: "/apply/job/form",
      element: <div> <ApplyForm/></div>
    },
    {
      path: "/user/appliations",
      element: <div> <UserApplications/></div>
    },


    {
      path: "/employeer/Dashboard",
      element: <div><EmpLandingPage/></div>
    },
    {
      path: "/create/job",
      element: <div> <CreateJobForm/></div>
    },
    {
      path: "/all/listed/jobs",
      element: <div><Emp_SeeAllJobs/></div>
    },
    {
      path: "/all/applications",
      element: <div><Emp_AllApplications/></div>
    }

  ])



  return (
    <RouterProvider router={routes}></RouterProvider>
  ) 
}

export default app