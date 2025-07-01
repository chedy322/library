import React from 'react'
import { Outlet } from "react-router";
import Nav from '../components/Nav/nav';
function Layout() {
  return (
    <div className='main'>
      <Nav/>
      <Outlet/>
    </div>
  )
}

export default Layout
