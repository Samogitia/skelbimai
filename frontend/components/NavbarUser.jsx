import {useContext} from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import {NavLink} from 'react-router-dom'
import { AuthorizationContext } from '../context/authorizationProvider'

export const NavbarUser = () => {
	const {user, logout} = useContext(AuthorizationContext)

	return (
	<Navbar expand="lg" fixed="top">
      	<Container fluid>
			<Navbar.Brand>Adverts</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav"> 
					<Nav className="me-auto" variant="pills" defaultActiveKey="/home">
						<Nav.Link as={NavLink} to="/home">Home</Nav.Link>
						<Nav.Link as={NavLink} to="/createAd">CreateAd</Nav.Link>
						<Nav.Link as={NavLink} to="/filters">Filters</Nav.Link>
						<NavDropdown title="Categories" id="nav-dropdown">
        						<NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
        						<NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
        						<NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
        						<NavDropdown.Divider />
        						<NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
      					</NavDropdown>
						{user?.status === "admin" && (<Nav.Link as={NavLink} to="/admin">Admin Panel</Nav.Link>)}
					</Nav>
					<Nav className="ms-auto" variant="pills">	
						<Navbar.Text>
							Signed in as: <a href="">{user.email}</a>
						</Navbar.Text>
						<Button onClick={logout} variant="outline-dark"  className='ms-2 p-1' size='sm'>Log Out</Button>
					</Nav>
				</Navbar.Collapse>
      	</Container>
    	</Navbar>
  	)
}
