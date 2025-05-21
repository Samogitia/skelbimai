import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

export const CreateAd = ({	photos,
					name,
					description,
					price,
					categoryArray,
					addPhoto, 
					updatePhoto, 
					removePhoto,
					setName,
					setDescription,
					setPrice,
					setCategoryId,
					submitAdvert }) => {
  	return (
		<div className='component p-4 createAdForm'>
			<Form onSubmit={submitAdvert}>
      			<Form.Group className="mb-3" controlId="formGroupName">
					<Form.Label>Name</Form.Label>
					<Form.Control onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" value={name} required/>
      			</Form.Group>

      			<Form.Group className="mb-3" controlId="formGroupDescription">
					<Form.Label>Description</Form.Label>
					<Form.Control onChange={(e) => setDescription(e.target.value)} as="textarea" rows={5} placeholder="Description" value={description} required/>
      			</Form.Group>

				<Form.Group className="mb-3" controlId="formGroupPrice">
					<Form.Label>Price</Form.Label>
					<Form.Control onChange={(e) => setPrice(Number(e.target.value))} type="number" placeholder="Price" value={price} required/>
      			</Form.Group>

				<Form.Group className='mb-3'>
					<Form.Label>Category</Form.Label>
					<Form.Select onChange={(e) => setCategoryId(Number(e.target.value))} required>
						<option value="" style={{display: 'none'}}>Choose Category</option>
						{categoryArray.map((category) => 
						(<option key={category.id} value={category.id}>{category.name}</option>)   
						)}
					</Form.Select>
                  	</Form.Group>

				<Button variant="dark" type="button" onClick={addPhoto} className='mb'> Add Photo </Button>
				{photos.map((url, index) => (
					
				<Form.Group key={index} className="mb-3" controlId={`formGroupPhoto${index}`}>
					<Form.Label>Photo {index+1}</Form.Label>

					<InputGroup>
					<Form.Control type="text" placeholder="Photo URL" onChange={(e) => updatePhoto(index, e.target.value.trim())} value={url}/>
					
					<Button variant="dark" type="button" onClick={() => removePhoto(index)}>Remove</Button>
					</InputGroup>
      			</Form.Group>

				))}
				<Button variant="dark" type="submit" className='ms-4'>Create Advert</Button>
				
    			</Form>
		</div>
  	)
}
