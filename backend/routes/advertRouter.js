import express from 'express'
import authUser from '../middlewares/authUser.js'
import authAdmin from '../middlewares/authAdmin.js'
import { createAdvert, getAllAdverts } from '../controllers/advertController.js'

const advertRouter = express.Router()

advertRouter.route("/create").post(authUser, createAdvert)
advertRouter.route("/get").get(authUser, getAllAdverts)

export default advertRouter
