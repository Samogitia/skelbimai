import { pool } from '../database/database.js'

async function createAdvertModel({name, description, category_id, price, user_id}) {
      const query = `INSERT INTO adverts (name, description, category_id, price, user_id)
                        VALUES ( $1, $2, $3, $4, $5)
                        RETURNING id`
                        

      const values = [name, description, category_id, price, user_id]
      
      try {
            const advert_id = await pool.query(query, values)
            return advert_id.rows[0].id
      }
      catch(error) {
            console.log("Failed to write advert to database.", error)
      }
}

async function getAllAdvertsModel() {
      
      const query = `SELECT   adverts.id,
                              adverts.name AS advert_name,
                              adverts.description,
                              categories.name AS category_name,
                              adverts.price,
                              users.name AS user_name,
                              adverts.created_at
                              FROM adverts
                                    JOIN categories
                                          ON adverts.category_id = categories.id
                                    JOIN users
                                          ON adverts.user_id = users.id
                              ORDER BY adverts.created_at`

      try {
            const result = await pool.query(query)
            return result.rows
      }
      catch {
            console.log("Error getting all adverts.", error)
            throw error
      }
}


async function deleteAdvertModel({id}) {
      const query = `DELETE FROM adverts
                        WHERE id = $1`

      const values = [id]

      try {
            await pool.query(query, values)
      }
      catch(error) {
            console.log("Failed to delete advert from database.", error)
            throw error
      }
}

export { createAdvertModel, deleteAdvertModel, getAllAdvertsModel }