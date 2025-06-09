import React, {useState} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'


export const UserCreate = ({createUser, setPageState}) => {
      const [name, setName] = useState("")
      const [last_name, setLastName] = useState("")
      const [email, setEmail] = useState("")
      const [status, setStatus] = useState("")
      const [password, setPassword] = useState("")
      const [alert, setAlert] = useState("")

      async function submitCreate(event) {
            setAlert("")
            try {
                  event.preventDefault()
                  await createUser(name, last_name, email, status, password)
            }
            catch (error) {
                  const status = error.response?.status
                  const code = error.response?.data?.code

                  if (status === 409 && code === '23505') {
                        setAlert("Email already exists.")
                  }
                  else {
                        setAlert(error.message || "Error")
                  }
                  console.log(error)
            }
      }

      function clear() {
            setName("")
            setLastName("")
            setEmail("")
            setStatus("")
            setPassword("")
      }
      

      return (
      <>
      <div className='position-absolute top-50 start-50 translate-middle component p-4' style={{width: "35vw", maxHeight: "80vh", tableLayout: "auto"}} data-bs-theme="dark">
            <h3>Create User</h3>
            <br />
            <Form onSubmit={submitCreate}>
                  <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" value={name} required/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicLastName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last Name" value={last_name} required/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" value={email} required/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicRole">
                        <Form.Label>Status</Form.Label>
                        <Form.Control onChange={(e) => setStatus(e.target.value)} type="text" placeholder="status" value={status}/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" value={password} required/>
                  </Form.Group>
                  <Button variant="primary" type="submit" className='me-2'>
                        Create
                  </Button>
                  <Button  onClick={clear} variant="primary" type="button" className='me-2'>
                        Clear
                  </Button>
                  <Button  onClick={() => setPageState("table")} variant="primary" type="button">
                        Cancel
                  </Button>
            </Form>
      </div>
      {alert && (<Alert variant="warning" className='mt-5 w-25 position-absolute top-50 start-50 translate-middle-x p-5 ' data-bs-theme="dark" dismissible><Alert.Heading>{alert}</Alert.Heading></Alert>)}
      </>
      )
}