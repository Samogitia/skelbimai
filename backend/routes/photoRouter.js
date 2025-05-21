import express from 'express'
import authUser from '../middlewares/authUser.js'
import { createPhoto, getPhotos } from '../controllers/photoController.js'

const photoRouter = express.Router()

photoRouter.route("/create").post(authUser, createPhoto)
photoRouter.route("/get").get(authUser, getPhotos)

export default photoRouter