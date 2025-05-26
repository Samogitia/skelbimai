 import React from 'react'
 import Card from 'react-bootstrap/Card'
 import Button from 'react-bootstrap/Button'
 import ListGroup from 'react-bootstrap/ListGroup'
 import Figure from 'react-bootstrap/Figure'
import FigureCaption from 'react-bootstrap/esm/FigureCaption'
 
 export const AdvertsFavorites = ({advertsArray, showInfo, favoritedAdverts, addFavorite, removeFavorite}) => {

      const isFavorited = ((favoritedAds, advert) => {
            const exists = favoritedAds.some((favorited) => favorited.id === advert.id)
            return exists ? "no-hover ratingButton-selected" : "no-hover ratingButton-notSelected"
      })

      function toggleFavorited(advertId) {
            const exists = favoritedAdverts.find((favorited) => favorited.id === advertId)

            exists ?
            removeFavorite(advertId) : 
            addFavorite(advertId)
      }

   return (
     <div data-bs-theme="dark" className='d-flex mx-auto mt-3 p-4' style={{maxWidth: "100vw", maxHeight: "90vh", tableLayout: "auto"}}>
            <div  className='flex-grow-1 d-flex justify-content-center flex-wrap overflow-auto advertCard'>
                  {favoritedAdverts.map((advert) =>  (
                  <Card  key={advert.id} style={{width: "20vw"}} className='me-4 mb-5'>
                        <Card.Img onClick={() => showInfo(advert)} variant="top" src={advert?.photoUrls[0]?.photo_url || null} style={{height: "25vh", objectFit: "cover"}}/>
                        <Card.Body >
                              <Card.Title>{advert.advert_name}</Card.Title>
                              <Card.Text>
                              </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                              <ListGroup.Item>Description: {advert.description}</ListGroup.Item>
                              <ListGroup.Item>Category: {advert.category_name}</ListGroup.Item>
                              <ListGroup.Item>Price: {advert.price}</ListGroup.Item>
                              <ListGroup.Item>Created by: {advert.user_name}</ListGroup.Item>
                              <ListGroup.Item>Added: {new Date(advert.created_at).toLocaleDateString()}</ListGroup.Item>
                              <ListGroup.Item>Rating: {advert.rating}  <Button className={isFavorited(favoritedAdverts, advert)} onClick={() => toggleFavorited(advert.id)}>&#9733;</Button></ListGroup.Item>
                        </ListGroup>
                  </Card>
                  ))}
            </div>
      </div>
   )
 }
 