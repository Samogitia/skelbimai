import React, {useState, useEffect, useContext} from 'react'
import { useSearchParams } from 'react-router-dom'
import { AuthorizationContext } from '../../context/authorizationProvider'
import { getAllAdvertsAPI } from '../../services/advertsAPI'
import { AdvertsFavorites } from './AdvertsFavorites'
import { AdvertInfo } from '../../components/AdvertInfo'
import  Spinner from 'react-bootstrap/Spinner'
import { getAllCommentsByIdAPI, createCommentAPI, deleteCommentAPI, restoreCommentAPI, deleteCommentAdminAPI } from '../../services/commentsAPI'
import { searchAdvertsAPI } from '../../services/searchAPI'
import { favoriteAddAPI, favoriteRemoveAPI, favoriteGetAPI } from '../../services/favoriteAPI'

export const Favorites = () => {
	const {user} = useContext(AuthorizationContext)
	const [advertsArray, setAdvertsArray] = useState([])
	const [pageState, setPageState] = useState("display")
	const [commentsArray, setCommentArray] = useState([])
	const [comment, setComment] = useState("")
	const [infoAdvert, setInfoAdvert] = useState(null)
	const [searchParams] = useSearchParams()
	const [favoritedAdverts, setFavoritedAdverts] = useState([]) 

	const search = searchParams.get("search") || ""
	const category = searchParams.get("category") || ""
	
	
	// useEffect(() => {
	// 	getAds()
	// },[])

	useEffect(() => {
		const searchQuery = setTimeout(() => {
			searchAdverts()
		}, 500)

		return () => clearTimeout(searchQuery)
	},[searchParams])
	
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

	useEffect(() => {
		getFavorites(user.id)
	},[])

	async function searchAdverts() {
		const res = await searchAdvertsAPI(search, category)
		if (res.success) {
			setAdvertsArray(res.data)
		}
		else {
			alert(res.message)
		}
	}
	
	function showInfo(advert) {
		setInfoAdvert(advert)
		setPageState("info")
		setCommentArray([])
		console.log(infoAdvert)
		console.log(commentsArray)
		getComments(advert.id)
	}

	async function getComments(advertId) {
		const comments = await getAllCommentsByIdAPI(advertId)
		
		if (comments.success) {
			setCommentArray(comments.data)
		}
		else {
			alert(comments.message)
		}
	}

	async function submitComment(advertId) {
		event.preventDefault()
		if (comment != "") {
			const res = await createCommentAPI(advertId, user.id, comment)
			if (res.success) {
				setComment("")
				getComments(advertId)
			}
		}
	}


	async function deleteComment(commentId, userId) {
		if (infoAdvert.userId === user.id || user.status === "admin" || user.id === userId) {
			const res = await deleteCommentAPI(commentId)
			if (res.success) {
				getComments(infoAdvert.id)
			}
		}
	}

	async function deleteCommentAdmin(commentId) {
		if (user.status === "admin") {
			const res = await deleteCommentAdminAPI(commentId)
			if (res.success) {
				getComments(infoAdvert.id)
			}
		}
	}

	async function restoreComment(commentId, userId) {
		if (infoAdvert.userId === user.id || user.status === "admin" || user.id === userId) {
			const res = await restoreCommentAPI(commentId)
			if (res.success) {
				getComments(infoAdvert.id)
			}
		}	}


	async function addFavorite(advertId) {
		try {
			await favoriteAddAPI(user.id, advertId)
			getFavorites(user.id)
			searchAdverts()
		}
		catch (error) {
			console.log(error)
		}
	}

	async function removeFavorite(advertId) {
		try {
			await favoriteRemoveAPI(user.id, advertId)
			getFavorites(user.id)
			searchAdverts()
		}
		catch (error) {
			console.log(error)
		}
	}

	async function getFavorites(userId) {
		const res = await favoriteGetAPI(userId)
		if (res.success) {
			setFavoritedAdverts(res.data)
		}
	}




return (
    	<div>
		{pageState === "display" ?
		(<AdvertsFavorites advertsArray={advertsArray} showInfo={showInfo} addFavorite={addFavorite} removeFavorite={removeFavorite} favoritedAdverts={favoritedAdverts} />):
		pageState === "info" ?
		(<AdvertInfo 	setPageState={setPageState} 
					infoAdvert={infoAdvert} 
					user={user} 
					submitComment={submitComment} 
					setComment={setComment}
					getComments={getComments}
					comment={comment}
					commentsArray={commentsArray}
					deleteComment={deleteComment}
					restoreComment={restoreComment}
					deleteCommentAdmin={deleteCommentAdmin}
		/>):
		(<Spinner animation="border" variant="dark"/>)}
    	</div>
  	)
}
