import React from 'react'
import AuthPage from './Pages/AuthPage'
import LandingPage from './Pages/LandingPage'
import CreateJobForm from './Pages/CreateJobForm'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserProtectedRoutes from './Components/UserProtectedRoutes'
import EmpLandingPage from './Pages/EmpLandingPage'
import EmployeerProtector from './Components/EmployeerProtector'
import AllJobs from './Pages/AllJobs'
import ApplyForm from './Pages/ApplyForm'
import UserApplications from './Pages/UserApplications'


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
      path: "/employeer/Dashboard",
      element: <div><EmployeerProtector><EmpLandingPage/></EmployeerProtector></div>
    },
    {
      path: "/create/job",
      element: <div> <EmployeerProtector><CreateJobForm/></EmployeerProtector></div>
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
    }

  ])



  return (
    <RouterProvider router={routes}></RouterProvider>
  ) 
}

export default app