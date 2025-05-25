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

async function getCommentsByIdModel({advertId}) {
      const query = `SELECT   comments.id, 
                              comments.user_id AS "userId",
                              comment, 
                              comments.created_at AS "commentCreatedAt", 
                              comments.deleted_at AS "commentDeletedAt",
                              users.name AS "userName"
                        FROM comments
                              JOIN users
                                    ON users.id = comments.user_id
                        WHERE advert_id = $1
                        ORDER BY comments.created_at`

      const values = [advertId]

      try {
            const comments = await pool.query(query, values)
            return comments.rows
      }
      catch (error) {
            console.log("Error getting comments from db.", error)
      }
} 


async function deleteCommentModel({commentId}) {
      const query = `UPDATE comments
                        SET deleted_at = NOW()
                        WHERE id = $1`

      const values = [commentId]

      try {
            await pool.query(query, values)
      }
      catch (error) {
            console.log("Error deleting comment", error)
      }
}

async function deleteAdminCommentModel({commentId}) {
      const query = `DELETE FROM comments
                        WHERE id = $1`

      const values = [commentId]

      try {
            await pool.query(query, values)
      }
      catch (error) {
            console.log("Error deleting (admin) comment", error)
      }
} 


async function restoreCommentModel({commentId}) {
      const query = `UPDATE comments
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


export {createCommentModel, deleteCommentModel, getCommentsByIdModel, restoreCommentModel, deleteAdminCommentModel}