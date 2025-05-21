import React, {useState, useContext} from 'react'
import { CreateAd } from './CreateAd'
import { createAdvertAPI } from '../../services/advertsAPI'
import { AuthorizationContext } from '../../context/authorizationProvider'
import { getCategoriesAPI } from '../../services/categoriesAPI'
import { useEffect } from 'react'

export const AdvertPage = () => {
      const [photos, setPhotos] = useState([])
      const [name, setName] = useState("")
      const [description, setDescription] = useState("")
      const [price, setPrice] = useState(null)
      const [category_id, setCategoryId] = useState(null)
      const {user} = useContext(AuthorizationContext)
      const [categoryArray, setCategoryArray] = useState([])

      useEffect(() => {
    
            getCategories()
      },[])

      async function getCategories() {
            const cat = await getCategoriesAPI()
            if (cat.success) {
                  setCategoryArray(cat.data)    
            }
      }

      const addPhoto = () => {
            setPhotos(prev => [...prev, ""])
            console.log(photos)
      }

      function updatePhoto(index, value) {
            const updated = [...photos]
            updated[index] = value
            setPhotos(updated)
      }

      function removePhoto(index) {
            const updated = [...photos]
            updated.splice(index, 1)
            setPhotos(updated)
      }

      async function submitAdvert(event) {
            event.preventDefault()
            const user_id = user.id
            const filteredPhotos = photos.filter(url => url.trim() !== "")
            const res = await createAdvertAPI(name, description, category_id, price, user_id, filteredPhotos)
            if (res.success) {
                  alert(res.message)
            }
            console.log(res.message)
      }


  return (
      <>
            <CreateAd   photos={photos}
                        price={price}
                        name={name}
                        description={description}
                        categoryArray={categoryArray}
                        addPhoto={addPhoto}
                        updatePhoto={updatePhoto} 
                        removePhoto={removePhoto} 
                        submitAdvert={submitAdvert}
                        setCategoryId={setCategoryId}
                        setPrice={setPrice}
                        setName={setName}
                        setDescription={setDescription}
                        getCategories={getCategories}
                         />
      </>
  )
}
