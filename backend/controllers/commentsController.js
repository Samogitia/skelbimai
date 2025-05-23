import {    createCommentModel,
            deleteCommentModel,
            getCommentsByIdModel,
            restoreCommentModel
      } from "../models/commentsModels.js";


async function createComment(req, res, next) {
      const {advert_id, user_id, comment} = req.body
      console.log(`req.body: ${JSON.stringify(req.body)}`)

      if (!advert_id || !user_id || !comment) {
            return res.status(400).json({message: "Incomplete comment data."})
      }

      try {
            await createCommentModel({
                  advert_id,
                  user_id,
                  comment
            })

            res.status(201).json({message: "Comment created."})
      }
      catch (error) {
            next(error)
      }
}

async function getCommentsById(req, res, next) {
      const {advert_id} = req.body
      console.log(`req.body: ${JSON.stringify(req.body)}`)

      if (!advert_id) {
            return res.status(400).json({message: "No advert Id."})
      }

      try {
            const comments = await getCommentsByIdModel({advert_id})
            res.status(200).json(comments)
      }
      catch (error) {
            next(error)
      }
}


async function deleteComment(req, res, next) {
      const {commentId} = req.body
      console.log(`req.body: ${JSON.stringify(req.body)}`)

      if (!commentId) {
            return res.status(400).json({message: "No comment Id."})
      }

      try {
            await deleteCommentModel({commentId})
            res.status(200).json({message: "comment deleted"})
      }
      catch (error) {
             next(error)
      }
}

async function restoreComment(req, res, next) {
      const {commentId} = req.body
      console.log(`req.body: ${JSON.stringify(req.body)}`)

      if (!commentId) {
            return res.status(400).json({message: "Invalid comment Id"})
      }

      try {
            await restoreCommentModel({commentId})
            res.status(200).json({message: "comment restored"})
      }
      catch (error) {
            next(error)
      }
}

export { createComment, getCommentsById, deleteComment, restoreComment }
