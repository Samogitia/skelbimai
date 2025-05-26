import {useState, useEffect} from 'react'
import { getAllAdvertsAPI } from '../../services/advertsAPI'
import Table from 'react-bootstrap/Table'
import { userGetAllAPI } from '../../services/usersAPI'
import DropdownButton from 'react-bootstrap/DropdownButton'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import { userDeleteAPI, userDeleteFullAPI, restoreUserAPI } from '../../services/usersAPI'



export const Admin = () => {
      const [advertsArray, setAdvertsArray] = useState([])
      const [usersArray, setUsersArray] = useState([])

      useEffect(() => {
            getAds()
            getUsers()
      },[])

      async function getAds() {
            const res = await getAllAdvertsAPI()
            console.log(res.data)
            if(res.success) {
                  setAdvertsArray(res.data)
            }
            else {
                  alert(res.message)
            }
      }

      async function getUsers() {
            const res = await userGetAllAPI()
            if (res.success) {
                  setUsersArray(res.data)
            }
            else {
                  alert(res.message)
            }
      }

      async function userDeleteFull(userId) {
            await userDeleteFullAPI(userId)
            getUsers()
      }

      async function userDelete(userId) {
            await userDeleteAPI(userId)
            getUsers()
      }

      async function userRestore(userId) {
            await restoreUserAPI(userId)
            getUsers()
      }


      return (
      <div className='d-flex flex-row mx-auto mt-5 p-3 component' style={{tableLayout: "auto", maxHeight: "90vh", width: "90vw"}} >
            {/* <ListGroup>
                  {advertsArray.map((advert, index) => (<ListGroup.Item key={advert.id}> #{index+1} {advert.advert_name}</ListGroup.Item>))}
            </ListGroup> */}
            <div className='flex-grow-1 overflow-auto'>
            	<Table striped bordered hover>
				<thead>
				<tr>
				<th>#</th>
				<th>Name</th>
				<th>Description</th>
				<th>Category</th>
				<th>Price</th>
                        <th>Created By</th>
				<th>Rating</th>
				<th style={{width: '1%'}}>Action</th>
				</tr>
				</thead>
				{advertsArray.map((advert, index) => (
					<tbody key={advert.id}>
						<tr>
							<td>{index+1}</td>
							<td>{advert.advert_name}</td>
							<td>{advert.description}</td>
							<td>{advert.category_name}</td>
							<td>{advert.price}</td>
                                          <td>{advert.user_name}</td>
							<td>{advert.rating}</td>
							<td><DropdownButton id="dropdown-basic-button" title="☰" size="sm" variant="light-outline"/></td>
						</tr>
					</tbody>
				))}
    			</Table>
            </div>
            <div className='flex-grow-1 overflow-auto'>
                  <Table striped bordered hover >
				<thead>
				<tr>
				<th>#</th>
				<th>Name</th>
				<th>Last Name</th>
				<th>Email</th>
				<th>Status</th>
                        <th>Created</th>
				<th>Deleted</th>
				<th style={{width: '1%'}}>Action</th>
				</tr>
				</thead>
				{usersArray.map((user, index) => (
					<tbody key={user.id}>
						<tr>
							<td>{index+1}</td>
							<td>{user.name}</td>
							<td>{user.last_name}</td>
							<td>{user.email}</td>
							<td style={{color: user.status === "admin" ? 'blue' : 'green'}}>{user.status}</td>
                                          <td>{user.created_at}</td>
							<td>{user.deleted_at}</td>
							<td>
                                                <DropdownButton id="dropdown-basic-button" title="☰" size="sm" variant="light-outline">
                                                      <DropdownItem as="button" onClick={() => userDelete(user.id)}>Delete</DropdownItem>
                                                      <DropdownItem as="button" onClick={() => userDeleteFull(user.id)}>Full Delete</DropdownItem>
                                                      <DropdownItem as="button" onClick={() => userRestore(user.id)}>Restore</DropdownItem>
                                                </DropdownButton>
                                          </td>    
						</tr>
					</tbody>
				))}
    			</Table>
            </div>
      </div>
      )
}
