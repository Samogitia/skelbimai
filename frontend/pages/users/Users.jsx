import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import { UsersTable } from './UsersTable'
import { userDeleteFullAPI, userRegisterAPI, userGetAllAPI, updateUserAPI } from '../../services/usersAPI'
import { UserEdit } from './UserEdit'
import { UserCreate } from './UserCreate'
import  Spinner from 'react-bootstrap/Spinner'


export const Users = () => {
  	const [users, setUsers] = useState([])
	const [pageState, setPageState] = useState(null)
	const [editUser, setEditUser] = useState(null)

	useEffect(() => {
		getAllUsers()
	},[])


	async function getAllUsers() {
		const usersRes = await userGetAllAPI()
        if (usersRes.success) {
            setUsers(usersRes.data)
            setPageState("table")
        }
		console.log(users)
  		}

	function findEditUser(id) {
		const editUser = users.find((user) => user.id === id)
		setEditUser(editUser)
		setPageState("edit")
	}

	async function createUser(name, last_name, email, status, password) {
		await userRegisterAPI(name, last_name, email, status, password)
		getAllUsers()
	}


	async function userUpdate(updatedUser) {
		try {
			await updateUserAPI(updatedUser)
			getAllUsers()
		}
		catch (error) {
			console.log("update User (userEdit) Erorr: ", error)
		}
	}

	async function userDelete(id) {
		try {
			await userDeleteFullAPI(id)
			await getAllUsers()
		}
		catch(error) {
			console.log("Error deleting user. userDelete", error )
		}
	}


	return (
        	<div className='position-relative h-100 v-100 mt-5' >
          		{/* <Button onClick={test}> Get All Users</Button>
			<Button onClick={() => setPageState("edit")}> Edit page</Button> */}

			{pageState === "edit" ? 
				(<UserEdit editUser={editUser} userUpdate={userUpdate} setPageState={setPageState}/>) :
			pageState === "table" ?
				(<UsersTable users={users} userDelete={userDelete} findEditUser={findEditUser} setPageState={setPageState}/>) :
			pageState === "create" ?
				(<UserCreate createUser={createUser} setPageState={setPageState}/>) :
				(<Spinner animation="border"/>)
			}
			
        	</div>
  	)
}