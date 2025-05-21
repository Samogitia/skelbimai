import { pool } from '../database/database.js'

async function categoriesGetAllModel() {

      const query = `SELECT id, name
                        FROM categories
                        ORDER BY name`

      try {
            const result = await pool.query(query)
            return result.rows
      }
      catch (error) {
            console.log("Eror getting categories from db", error)
      }
}

export { categoriesGetAllModel }