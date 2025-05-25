import express from 'express'
import authUser from '../middlewares/authUser.js'
import authAdmin from '../middlewares/authAdmin.js'
import { getCommentsById, createComment, deleteComment, restoreComment } from '../controllers/commentsController.js'

const commentsRouter = express.Router()

commentsRouter.route("/create").post(authUser, createComment)
commentsRouter.route("/delete").delete(authUser, deleteComment)
commentsRouter.route("/get/:advertId").get(authUser, getCommentsById)
commentsRouter.route("/restore").put(authUser, authAdmin, restoreComment)

export default commentsRouter