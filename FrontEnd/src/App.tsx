import React from 'react'
import AuthPage from './Pages/AuthPage'
import LandingPage from './Pages/LandingPage'
import CreateJobForm from './Pages/CreateJobForm'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserProtectedRoutes from './Components/UserProtectedRoutes'


const app = () => {

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <div><UserProtectedRoutes><LandingPage/></UserProtectedRoutes></div>
    },
    {
      path: "/Auth",
      element: <div><AuthPage/></div>
    }
  ])



  return (
    <RouterProvider router={routes}></RouterProvider>
  ) 
}

export default app