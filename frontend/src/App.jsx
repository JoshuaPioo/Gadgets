import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/navbar'
import Signup from './pages/Signup'
import Login from './pages/Login'

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
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App