import React from 'react'
import AuthPage from './Pages/AuthPage'
import LandingPage from './Pages/LandingPage'
import CreateJobForm from './Pages/CreateJobForm'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserProtectedRoutes from './Components/UserProtectedRoutes'
import EmpLandingPage from './Pages/EmpLandingPage'
import EmployeerProtector from './Components/EmployeerProtector'


const app = () => {

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <div><LandingPage/></div>
    },
    {
      path: "/Auth",
      element: <div><AuthPage/></div>
    },
    {
      path: "/Employeer/Dashboard",
      element: <div><EmployeerProtector><EmpLandingPage/></EmployeerProtector></div>
    },
    {
      path: "/create/job",
      element: <div> <EmployeerProtector><CreateJobForm/></EmployeerProtector></div>
    }

  ])



  return (
    <RouterProvider router={routes}></RouterProvider>
  ) 
}

export default app