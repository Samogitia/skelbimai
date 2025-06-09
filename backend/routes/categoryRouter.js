import express from 'express'
import authUser from '../middlewares/authUser.js'
import authAdmin from '../middlewares/authAdmin.js'
import { getAllCategories, createCategory } from '../controllers/categoriesController.js'

const categoryRouter = express.Router()

categoryRouter.route("/get").get(authUser, getAllCategories )
categoryRouter.route("/create").post(authUser, authAdmin, createCategory)

export default categoryRouter