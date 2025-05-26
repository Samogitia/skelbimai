import express from 'express'
import { userCreate, userLogin, userDelete, getAllUsers, userDeleteFull, restoreUser } from '../controllers/usersControllers.js'
import authUser from '../middlewares/authUser.js'
import authAdmin from '../middlewares/authAdmin.js'

const userRouter = express.Router()

userRouter.route("/create").post(userCreate)
userRouter.route("/login").post(userLogin)
userRouter.route("/getAll").get(authUser, authAdmin, getAllUsers)
userRouter.route("/delete/:userId").delete(authUser, authAdmin, userDelete)
userRouter.route("/deletefull/:userId").delete(authUser, authAdmin, userDeleteFull)
userRouter.route("/restore").put(authUser, authAdmin, restoreUser)

export default userRouter