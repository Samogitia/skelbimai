import express from 'express'
import authUser from '../middlewares/authUser.js'
import authAdmin from '../middlewares/authAdmin.js'
import { getAllCategories } from '../controllers/categoriesController.js'

const categoryRouter = express.Router()

categoryRouter.route("/get").get(authUser, getAllCategories )

export default categoryRouter