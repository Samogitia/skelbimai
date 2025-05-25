import express from 'express'
import authUser from '../middlewares/authUser.js'
import authAdmin from '../middlewares/authAdmin.js'
import { getCommentsById, createComment, deleteComment, restoreComment, deleteCommentAdmin } from '../controllers/commentsController.js'

const commentsRouter = express.Router()

commentsRouter.route("/create").post(authUser, createComment)
commentsRouter.route("/delete/:commentId").delete(authUser, deleteComment)
commentsRouter.route("/get/:advertId").get(authUser, getCommentsById)
commentsRouter.route("/restore").put(authUser, restoreComment)
commentsRouter.route("/deletefull/:commentId").delete(authUser, authAdmin, deleteCommentAdmin)

export default commentsRouter