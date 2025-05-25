import React, {useState, useEffect, useContext} from 'react'
import { AuthorizationContext } from '../../context/authorizationProvider'
import { getAllAdvertsAPI } from '../../services/advertsAPI'
import { AdvertCards } from './advertCards'
import { AdvertInfo } from '../../components/AdvertInfo'
import { getPhotosAPI } from '../../services/photosAPI'
import { getAllCommentsByIdAPI, createCommentAPI, deleteCommentAPI, restoreCommentAPI, deleteCommentAdminAPI } from '../../services/commentsAPI'

export const Homepage = () => {
	const {user} = useContext(AuthorizationContext)
	const [advertsArray, setAdvertsArray] = useState([])
	const [pageState, setPageState] = useState("display")
	const [commentsArray, setCommentArray] = useState([])
	const [comment, setComment] = useState("")
	const [infoAdvert, setInfoAdvert] = useState(null)
	
	
	useEffect(() => {
		getAds()
	},[])
	
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



return (
    	<div>
		{pageState === "display" ?
		(<AdvertCards advertsArray={advertsArray} showInfo={showInfo} />):
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
		(null)}
    	</div>
  	)
}
