 import React from 'react'
 import Card from 'react-bootstrap/Card'
 import Button from 'react-bootstrap/Button'
 import ListGroup from 'react-bootstrap/ListGroup'
 
 export const AdvertCards = ({advertsArray, getPhoto}) => {
   return (
     <div data-bs-theme="dark" className='d-flex mx-auto mt-3 p-4' style={{maxWidth: "100vw", maxHeight: "90vh", tableLayout: "auto"}}>
            <div className='flex-grow-1 d-flex justify-content-center flex-wrap overflow-auto advertCard'>
                  {/* {console.log("ratedMechanics:", ratedMechanics)} */}
                  {advertsArray.map((advert) =>  (
                  <Card key={advert.id} style={{width: "20vw"}} className='me-4 mb-5'>
                        <Card.Img variant="top" src={advert?.photoUrls[0]?.photo_url || null} style={{height: "25vh", objectFit: "cover"}}/>
                        <Card.Body>
                              <Card.Title>{advert.advert_name}</Card.Title>
                              {/* <Card.Title>{advert.description}</Card.Title> */}
                              <Card.Text>
                              </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                              <ListGroup.Item>Description: {advert.description}</ListGroup.Item>
                              <ListGroup.Item>Category: {advert.category_name}</ListGroup.Item>
                              <ListGroup.Item>Price: {advert.price}</ListGroup.Item>
                              <ListGroup.Item>Created by: {advert.user_name}</ListGroup.Item>
                        </ListGroup>
                  </Card>
                  ))}
            </div>
      </div>
   )
 }
 