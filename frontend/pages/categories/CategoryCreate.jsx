import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import React, { useState }from 'react'
import { categoryCreateAPI } from '../../services/categoriesAPI'


export const CategoryCreate = () => {
const  [category, setCategory] = useState("")
const [alert, setAlert] = useState("")


// const setCityF = (property, value) => {
// 	setCity(prev => ({...prev, [property]: value}))
// }

async function submitCategory(event) {
	event.preventDefault()
	setAlert("")
	console.log(category)
	
		const res = await categoryCreateAPI(category)
        if (res.success) {
            setCategory("")
        }
	    else {
            const status = error.response?.status
            console.log(res)
            if (res.status === 409) {
                setAlert("Category already exists.")
            }
            else {
                setAlert(res.message || "Error")
            }
            console.log(error)
            }
}

return (
	<>
	<div data-bs-theme="dark" className='position-absolute top-50 start-50 translate-middle component p-4' style={{width: "35vw", maxHeight: "80vh", tableLayout: "auto"}}>
		<Form onSubmit={submitCategory}>
			<Form.Group className="mb-3">
				<Form.Label className='mb-3'>Add City</Form.Label>
				<Form.Control onChange={(e) => setCategory(e.target.value)}type="text" placeholder="Enter category" value={category} required/>
			</Form.Group>
			<Button variant="primary" type="submit" data-bs-theme="dark" className='mt-3'>
				Create
			</Button>
		</Form>
	</div>
	{alert && (<Alert variant="warning" className='mt-5 w-25 position-absolute top-25 start-50 translate-middle-x p-4 ' data-bs-theme="dark" dismissible><Alert.Heading>{alert}</Alert.Heading></Alert>)}
	</>
)
}