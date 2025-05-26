import {useContext, useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {NavLink, useNavigate, useSearchParams, useLocation} from 'react-router-dom'
import { AuthorizationContext } from '../context/authorizationProvider'
import { getCategoriesAPI } from '../services/categoriesAPI'


export const NavbarUser = () => {
	const [searchParams] = useSearchParams()
	const {user, logout} = useContext(AuthorizationContext)
	const [categoriesArray, setCategoriesArray] = useState([])
	// const [search, setSearch] = useState("")
	// const [category, setCategory] = useState("")
	const search = searchParams.get("search") || ""
	const category = searchParams.get("category") || ""
	const navigate = useNavigate()
	const showSearch = location.pathname === "/home"


	useEffect(()=> {
		getCategories()
	},[])


	async function getCategories() {
		const res = await getCategoriesAPI()
		if (res.success) {
			setCategoriesArray(res.data)
		}
	}

	function setSearch(e) {
		const params = new URLSearchParams(searchParams)
		if (e.target.value) params.set("search", e.target.value)
			else params.delete("search")
		navigate(`/home?${params.toString()}`, { replace: true})
	}

	function setCategory(e) {
		const params = new URLSearchParams(searchParams)
		if (e.target.value) params.set("category", e.target.value)
			else params.delete("category")
		navigate(`/home?${params.toString()}`, { replace: true})
	}

	// function submitSearch(event) {
	// 	event.preventDefault()
	// 	const params = []
	// 	if (category) params.push(`category=${category}`)
	// 	if (search) params.push(`search=${}`)
	// }


	return (
	<Navbar expand="lg" fixed="top">
      	<Container fluid>
			<Navbar.Brand>Adverts</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav"> 
					<Nav className="me-auto" variant="pills" defaultActiveKey="/home">
						<Nav.Link as={NavLink} to="/home">Home</Nav.Link>
						<Nav.Link as={NavLink} to="/createAd">CreateAd</Nav.Link>
						<Nav.Link as={NavLink} to="/favorites">Favorites</Nav.Link>
						{showSearch && (
							<Form className='d-flex'>
							<Form.Group className='ms-3'>
								<Form.Select onChange={setCategory}>
									<option value="" style={{display: 'none'}}>Category</option>
									<option value="">None</option>
									{categoriesArray.map((category) => (<option key={category.id} value={category.id}>{category.name}</option>))}
								</Form.Select>
							</Form.Group>
							<Form.Control size="sm" type="search" placeholder='search' value={search} onChange={setSearch} className='ms-3' style={{width: "15vw"}}/>
							</Form>
						)}
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
