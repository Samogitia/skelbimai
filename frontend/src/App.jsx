import { useState, useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { LoginPage } from '../pages/login/loginPage'
import Spinner from 'react-bootstrap/Spinner'
import { AuthorizationContext } from '../context/authorizationProvider'
import { Homepage } from '../pages/homepage/Homepage'
import { Layout } from '../components/Layout'
import { AdvertPage } from '../pages/adverts/AdvertPage'
import { Admin } from '../pages/admin/Admin'
import { Favorites } from '../pages/favorites/Favorites'

function AuthUserRoute({children}) {
	const { user, loading } = useContext(AuthorizationContext)
	console.log(user)
	console.log("AuthUserRoute running...", { user, loading });
	if (loading) return null
	if (!user) {
		return <Navigate to="/login" replace/>
	}
	return children
}

function AuthAdminRoute({children}) {
	const { user } = useContext(AuthorizationContext)
	if ( user.status !== "admin") {
		return <Navigate to="/home" replace/>
	}
	return children
}


function App() {
	const { loading } = useContext(AuthorizationContext)

	if (loading) {
	return <Spinner animation="border"/>
	}

  	return (
    	<>
		<Routes>
			<Route path='/login' element={<LoginPage/>}/>
			<Route path='/' element={<AuthUserRoute><Layout/></AuthUserRoute>}>
				<Route index element={<Homepage/>}/>
				<Route path='home' element={<Homepage/>}/>
				<Route path='createAd' element={<AdvertPage/>}/>
				<Route path='favorites' element={<Favorites/>}/>
				<Route path='admin' element={<AuthAdminRoute><Admin/></AuthAdminRoute>}/>
			</Route>
		</Routes>  
    	</>
  	)
}

export default App
