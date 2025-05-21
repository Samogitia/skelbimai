import { Outlet } from 'react-router-dom'
import { NavbarUser } from './NavbarUser'

export const Layout = () => {
      return (
            <>
                  <NavbarUser/>
                  <Outlet/>
            </>
      )
}
