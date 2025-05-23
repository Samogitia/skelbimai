import React, {useState} from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image'
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem'

export const AdvertInfo = ({setPageState, infoAdvert}) => {
      const [showMorePhotos, setShowMorePhotos] = useState(false)

      function showPhoto() {
            showMorePhotos ? setShowMorePhotos(false) : setShowMorePhotos(true)
      }

      return (
      <div data-bs-theme="light" className='d-flex mx-auto mt-3 p-4 component' style={{maxWidth: "95vw", maxHeight: "90vh", overflow: "auto"}}>
            <div className='advertInfo'>
                  <Card style={{width: "45vw"}} className='me-4 mb-5'>
                        <Card.Img variant="top" src={infoAdvert?.photoUrls[0]?.photo_url || null} style={{height: "50vh", objectFit: "fill"}}/>
                        <Card.Body>
                              <Card.Title>{infoAdvert.advert_name}</Card.Title>
                              {/* <Card.Title>{infoAdvert.photoUrls.map(url => url.photo_url)}</Card.Title> */}
                              <Card.Text>
                              </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                              <ListGroup.Item>Description: {infoAdvert.description}</ListGroup.Item>
                              <ListGroup.Item>Category: {infoAdvert.category_name}</ListGroup.Item>
                              <ListGroup.Item>Price: {infoAdvert.price}</ListGroup.Item>
                              <ListGroup.Item>Created by: {infoAdvert.user_name}</ListGroup.Item>
                              <ListGroup.Item>Added: {new Date(infoAdvert.created_at).toLocaleDateString()}</ListGroup.Item>
                        <ListGroup.Item>
                              <Button onClick={showPhoto} style={{width: "7vw"}} className='me-3'>More Photos</Button>
                              <Button onClick={() => setPageState("display")} style={{width: "7vw"}}>Back</Button>
                              </ListGroup.Item>
                        </ListGroup>
                  {showMorePhotos && ( 
                        <div> 
                        {infoAdvert?.photoUrls.map((url, index) => <Image key={index} thumbnail variant="top" src={url.photo_url} style={{width: "45vw", objectFit: "fill"}}/>)}
                        <Button onClick={showPhoto}>Hide Photos</Button>
                        </div>
                  )} 
                  </Card>
         
            </div>
                  <div>
                        
                        <div style={{width: "30vw"}} className='me-4 mb-5 commentDiv'>comments

                        </div>

                  </div> 
      </div>
      )
}
