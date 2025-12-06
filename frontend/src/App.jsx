import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/navbar'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Verify from './pages/Verify'
import VerifyEmail from './pages/VerifyEmail'
import Products from './pages/Products'

const router = createBrowserRouter([
  {
    path: "/",
    element: <><Navbar/><Home/> </>,
  },
  {
    path: "/signup",
    element: <><Signup/> </>,
  },
  {
    path: "/login",
    element: <><Login/> </>,
  },
  {
    path: "/verify",
    element: <><Verify/> </>,
  },
  {
    path: "/verify/:token",
    element: <><VerifyEmail/> </>,
  },
  {
    path: "/products",
    element: <><Navbar/><Products/> </>,
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App