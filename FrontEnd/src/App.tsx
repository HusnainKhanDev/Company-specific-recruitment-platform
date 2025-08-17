import React from 'react'
import AuthPage from './Pages/AuthPage'
import LandingPage from './Pages/LandingPage'
import CreateJobForm from './Pages/Emp_CreateJobForm'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserProtectedRoutes from './Components/UserProtectedRoutes'
import EmpLandingPage from './Pages/Emp_LandingPage'
import EmployeerProtector from './Components/Emp_Protector'
import AllJobs from './Pages/AllJobs'
import ApplyForm from './Pages/ApplyForm'
import UserApplications from './Pages/UserApplications'
import Emp_SeeAllJobs from './Pages/Emp_SeeAllJobs'
import Emp_AllApplications from './Pages/Emp_AllApplications'
import Emp_EditJob from './Pages/Emp_EditJob'
import Emp_Protector from './Components/Emp_Protector'


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
      element: <div><UserProtectedRoutes><AllJobs/></UserProtectedRoutes></div>
    },
    {
      path: "/apply/job/form",
      element: <div><UserProtectedRoutes><ApplyForm/></UserProtectedRoutes></div>
    },
    {
      path: "/user/appliations",
      element: <div><UserProtectedRoutes><UserApplications/></UserProtectedRoutes></div>
    },
    

    {
      path: "/employeer/Dashboard",
      element: <div><Emp_Protector><EmpLandingPage/></Emp_Protector></div>
    },
    {
      path: "/create/job",
      element: <div><Emp_Protector><CreateJobForm/></Emp_Protector></div>
    },
    {
      path: "/all/listed/jobs",
      element: <div><Emp_SeeAllJobs/></div>
    },
    {
      path: "/edit/job",
      element: <div><Emp_EditJob/></div>
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