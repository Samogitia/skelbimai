import React, {useState, useEffect, useContext} from 'react'
import { AuthorizationContext } from '../../context/authorizationProvider'
import { getAllAdvertsAPI } from '../../services/advertsAPI'
import { getPhotosAPI } from '../../services/photosAPI'
import { AdvertCards } from './advertCards'

export const Homepage = () => {
	const {user} = useContext(AuthorizationContext)
	let [photos, setPhotos] = useState([])
	let [advertsArray, setAdvertsArray] = useState([])
	
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

	async function getPhoto(id) {
		const res = await getPhotosAPI(id)
		console.log(res.data)
		if (res.success) {
			setPhotos(res.data)
			return res.data[0]
		}
		else {
			alert(res.message)
		}
	}

	useEffect(() => {
		getAds()
	},[])

return (
    	<div>
		<AdvertCards advertsArray={advertsArray} getPhoto={getPhoto}/>
    	</div>
  	)
}
