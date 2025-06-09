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

async function categoryCreateModel({category}) {
      const query = `INSERT INTO categories (name)
                        VALUES ($1)`

      const values = [category]

      try {
            await pool.query(query, values)
      }
      catch (error) {
            console.log("Error creating category model error", error)
            throw Error
      }
}

export { categoriesGetAllModel, categoryCreateModel }