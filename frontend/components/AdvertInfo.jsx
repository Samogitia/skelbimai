import React, {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'

export const AdvertInfo = ({setPageState, infoAdvert, user, submitComment, setComment, comment, commentsArray}) => {
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
                        {infoAdvert?.photoUrls.map((url, index) => <Image key={index} thumbnail variant="top" src={url.photo_url} style={{width: "40vw", objectFit: "fill"}}/>)}
                        <Button onClick={showPhoto}>Hide Photos</Button>
                        </div>
                  )} 
                  </Card>
         
            </div>
                  <div>
                        <div>
                              {commentsArray.map((com, index) => (
                                    <Card key={com.id} className={`mb-2 p-2 rounded ${com.user_id === user.id
                                          ? 'bg-primary text-white ms-auto'
                                          : 'bg-light text-dark me-auto'
                                          }`}
                                          style={{
                                          maxWidth: '70%',
                                          // Align user's own comments to the right
                                          marginLeft: com.user_id === user.id ? 'auto' : 0,
                                          marginRight: com.user_id !== user.id ? 'auto' : 0,
                                          }}>
                                          <Card.Header> {`#${index+1} By user: ${com.user_id} Posted at: ${new Date(com.created_at).toLocaleString}`}</Card.Header>
                                          <Card.Body>
                                                <blockquote className='blockquote mb-0'>
                                                      <p className="fw-bold">{com.comment}</p>
                                                </blockquote>
                                          </Card.Body>
                                    </Card>     
                              ))}
                        </div>
                        
                        <div style={{width: "40vw"}} className='me-4 mb-5 commentDiv'>comments
                              <Form onSubmit={() => submitComment(infoAdvert.id)}>
                                    <Form.Group className="mb-3" controlId="ControlTextarea">
                                    <Form.Label>Example textarea</Form.Label>
                                    <Form.Control onChange={(e) => setComment(e.target.value)} as="textarea" rows={3} placeholder='comment..' value={comment}/>
                                    </Form.Group>
                                    <Button type="submit" className='mb-5'>Post</Button>
                              </Form>
                        </div>

                  </div> 
      </div>
      )
}
