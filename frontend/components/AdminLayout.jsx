import React from 'react'
import {Outlet} from 'react-router-dom'
import { NavbarAdmin } from './NavbarAdmin'

export const AdminLayout = () => {
  return (
    <>
      <NavbarAdmin/>

      <Outlet/>

    </>
  )
}