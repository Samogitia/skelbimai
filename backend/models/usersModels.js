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

async function userDeleteModel({id}) {
      const query = `DELETE FROM users
                        WHERE id = $1`

      const values = [id]

      try {
            await pool.query(query, values)
      }
      catch (error) {
            console.log("Error deleting user from database", error.detail)
      }
}

export { userCreateModel, userDeleteModel, userVerifyModel }