import React, {useContext, useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import {NavLink} from 'react-router-dom'
import { AuthorizationContext } from '../context/authorizationProvider'
// import { infoUserAPI } from '../services/usersAPI'

export const NavbarAdmin = () => {
	const {user, logout} = useContext(AuthorizationContext)
	// const [user_name, setUser_name] = useState("")

	// async function userInfo(id) {
	// 	const {user_name} = await infoUserAPI(id)
	// 	setUser_name(user_name)
	// }

	// useEffect(() => {
	// 	userInfo(user.id)
	// },[user])

	
	return (
	<Navbar expand="lg" fixed="top" className="bg-body-tertiary" bg="dark" data-bs-theme="light">
      	<Container fluid>
			<Navbar.Brand>Admin Panel</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav"> 
					<Nav className="me-auto" variant="tabs" defaultActiveKey="/admin/Mechanics">
						<Nav.Link as={NavLink} to="/home">Home</Nav.Link>
						<Nav.Link as={NavLink} to="/admin/users">Users</Nav.Link>
						<Nav.Link as={NavLink} to="/admin/categories">Categories</Nav.Link>
						{/* {user.role === "admin" && (<Nav.Link as={NavLink} to="/admin/mechanics">Admin Panel</Nav.Link>)} */}
					</Nav>
					<Nav className="ms-auto" variant="pills">	
						<Navbar.Text>
							Signed in as: <a href="">{user.email}</a>
						</Navbar.Text>
						<Button onClick={logout} variant="outline-light"  className='ms-2' size='sm'>Log Out</Button>
					</Nav>
				</Navbar.Collapse>
      	</Container>
    	</Navbar>
  	)
}