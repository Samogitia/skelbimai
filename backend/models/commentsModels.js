import { pool } from '../database/database.js'

async function createCommentModel({advert_id, user_id, comment }) {
      const query = `INSERT INTO comments (advert_id, user_id, comment)
                        VALUES ($1, $2, $3)`
      
      const values = [advert_id, user_id, comment]

      try {
            await pool.query(query, values)
      }
      catch (error) {
            console.log("Error writing comment to db.", error)
      }
}

async function getCommentsByIdModel({advert_id}) {
      const query = `SELECT id, user_id, comment
                        FROM comments
                        WHERE advert_id = $1`

      const values = [advert_id]

      try {
            const comments = await pool.query(query, values)
            return comments.rows
      }
      catch (error) {
            console.log("Error getting comments from db.", error)
      }
} 


async function deleteCommentModel({commentId}) {
      const query = `UPDATE comments (deleted_at)
                        SET deleted_at = NOW()
                        WHERE id = $1`

      const values = [comment_id]

      try {
            await pool.query(query, values)
      }
      catch (error) {
            console.log("Error deleting comment", error)
      }
}


async function restoreCommentModel({commentId}) {
      const query = `UPDATE comments (deleted_at)
                        SET deleted_at = NULL
                        WHERE id = $1`

      const values = [commentId]

      try {
            await pool.query(query, values)
      }
      catch (error) {
            console.log("Error restoring comment", error)
      }
}


export {createCommentModel, deleteCommentModel, getCommentsByIdModel, restoreCommentModel}