import express from 'express'
import { userCreate, userLogin } from '../controllers/usersControllers.js'
import authUser from '../middlewares/authUser.js'
import authAdmin from '../middlewares/authAdmin.js'

const userRouter = express.Router()

userRouter.route("/create").post(userCreate)
userRouter.route("/login").post(userLogin)

export default userRouter