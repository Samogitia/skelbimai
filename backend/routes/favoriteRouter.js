import express from 'express'
import authUser from '../middlewares/authUser.js'
import authAdmin from '../middlewares/authAdmin.js'
import { removeFavorite, addFavorite, favoritedByUser } from '../controllers/favoriteController.js'

const favoriteRouter = express.Router()

favoriteRouter.route("/add").post(authUser, addFavorite)
favoriteRouter.route("/delete").delete(authUser, removeFavorite)
favoriteRouter.route("/get/:userId").get(authUser, favoritedByUser)

export default favoriteRouter