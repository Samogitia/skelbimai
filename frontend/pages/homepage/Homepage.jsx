import React, {useState, useEffect, useContext} from 'react'
import { AuthorizationContext } from '../../context/authorizationProvider'
import { getAllAdvertsAPI } from '../../services/advertsAPI'
import { AdvertCards } from './advertCards'
import { AdvertInfo } from '../../components/AdvertInfo'
import { getPhotosAPI } from '../../services/photosAPI'
import { getAllCommentsByIdAPI, createCommentAPI, deleteCommentAPI } from '../../services/commentsAPI'

export const Homepage = () => {
	const {user} = useContext(AuthorizationContext)
	const [advertsArray, setAdvertsArray] = useState([])
	const [pageState, setPageState] = useState("display")
	const [commentsArray, setCommentArray] = useState([])
	const [infoAdvert, setInfoAdvert] = useState(null)

	
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

	function showInfo(advert) {
		setPageState("info")
		setInfoAdvert(advert)
		console.log(infoAdvert)
	}

	async function getComments(advert_id) {
		const comments = await getAllCommentsByIdAPI(advert_id)
		
		if (comments.success) {
			setCommentArray(comments.data)
		}
		else {
			alert(comments.message)
		}
	}

	// async function getPhoto(id) {
	// 	const res = await getPhotosAPI(id)
	// 	console.log(res.data)
	// 	if (res.success) {
	// 		setPhotos(res.data)
	// 		return res.data[0]
	// 	}
	// 	else {
	// 		alert(res.message)
	// 	}
	// }

	useEffect(() => {
		getAds()
	},[])

return (
    	<div>
		{pageState === "display" ?
		(<AdvertCards advertsArray={advertsArray} showInfo={showInfo} />):
		pageState === "info" ?
		(<AdvertInfo setPageState={setPageState} infoAdvert={infoAdvert} />):
		(null)}
    	</div>
  	)
}
