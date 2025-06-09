import { pool } from '../database/database.js'

async function userCreateModel({name, last_name, email, status, password_h}) {
      const query = `INSERT INTO users (name, last_name, email, status, password_h)
                        VALUES ($1, $2, $3, $4, $5)`

      const values = [name, last_name, email, status, password_h]

      try {
            await pool.query(query, values)
      }
      catch (error) {
            console.log("Error writing user to database", error)
            throw error
      }
}

async function userVerifyModel({email}) {
      const query = `SELECT id, status, password_h
                        FROM users
                        WHERE email = $1`

      const values = [email]

      try {
            const result = await pool.query(query, values)
            return result.rows[0]
      }
      catch (error) {
            console.log("Error verifying user", error.detail)  
      }
}

async function userGetAllModel() {
      const query = `SELECT *
                        FROM users`

      try {
            const users = await pool.query(query)
            return users.rows
      }
      catch (error) {
            console.log("Error geting users", error)
      }
}

async function userDeleteFullModel({userId}) {
      const query = `DELETE FROM users
                        WHERE id = $1`

      const values = [userId]

      try {
            await pool.query(query, values)
      }
      catch (error) {
            console.log("Error deleting user from database", error.detail)
      }
}

async function userDeleteModel({userId}) {
      const query = `UPDATE users
                        SET   deleted_at = NOW(),
                              status = 'deleted'
                        WHERE id = $1`

      const values = [userId]

      try {
            await pool.query(query, values)
      }
      catch (error) {
            console.log("Error deleting user(soft)", error)
      }
}

async function restoreUserModel({userId}) {
      const query = `UPDATE users
                        SET   deleted_at = NULL,
                              status = 'user'
                        WHERE id = $1`

      const values = [userId]

      try {
            await pool.query(query, values)
      }
      catch (error) {
            console.log("Error restoring user", error)
      }
}

async function userEditModel({id, name, last_name, email, status, password_h}) {
      const query = `UPDATE ONLY users
                        SET   name = $2,
                              last_name = $3,
                              email = $4,
                              status = COALESCE($5, status),
                              password_h = COALESCE($6, password_h)
                        WHERE id = $1`

      const values = [id, name, last_name, email, status, password_h]
      try {
            const result = await pool.query(query, values)
            return result
      }
      catch (error) {
            console.log("Error updating user", error)
      }
}


export { userCreateModel, userDeleteFullModel, userDeleteModel, userVerifyModel, userGetAllModel, restoreUserModel, userEditModel }