import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { ActionSelect } from '../../components/ActionSelect'

export const UsersTable = ({users, userDelete, findEditUser, setPageState}) => {
  	return (
    		<div data-bs-theme="dark" className='d-flex flex-column mx-auto mt-5 p-4 component' style={{width: "50vw", tableLayout: "auto"}}>
                {console.log(users)}
		<h3>Users table</h3>
            <br />
			<Table striped bordered hover >
				<thead>
				<tr>
				<th>#</th>
				<th>Username</th>
                <th>Last Name</th>
				<th>Email</th>
				<th>Status</th>
				<th style={{width: '1%'}}>Action</th>
				</tr>
				</thead>
				{users.map((users, index) => (
					<tbody key={users.id}>
						<tr>
							<td>{index+1}</td>
							<td>{users.name}</td>
                            <td>{users.last_name}</td>
							<td>{users.email}</td>
							<td style={{color: users.status === "admin" ? 'lightblue' : 'green'}}>{users.status}</td>
							<td><ActionSelect deleteAction={userDelete} targetId={users.id} editAction={findEditUser} /></td>
						</tr>
					</tbody>
				))}
    			</Table>
			
			<Button style={{width: "5vw"}} onClick={() => setPageState("create")} variant="primary" type="button" size="sm">
                        Add User
                  </Button>
			

    		</div>
  	)
}


// className='position-absolute top-50 start-50 translate-middle component p-4'