import { pool } from '../database/database.js'

async function searchModel({search, category}) {
      
      let query = `SELECT     adverts.id,
                              adverts.name AS advert_name,
                              adverts.description,
                              categories.name AS category_name,
                              adverts.price,
                              adverts.user_id AS "userId",
                              users.name AS user_name,
                              adverts.created_at,
                              COUNT (favorites.advert_id) AS rating
                              FROM adverts
                                    JOIN categories
                                          ON adverts.category_id = categories.id
                                    JOIN users
                                          ON adverts.user_id = users.id
                                    LEFT JOIN favorites
                                          ON favorites.advert_id = adverts.id`
                                    

      let where = []
      let params = []
      let paramIndex = 1

      if (search) {
            where.push(`(adverts.name ILIKE $${paramIndex} OR adverts.description ILIKE $${paramIndex})`)
            params.push(`%${search}%`)
            paramIndex++
      }

      if (category) {
            where.push(`categories.id = $${paramIndex}`)
            params.push(category)
            paramIndex++
      }

      if (where.length > 0) {
            query += " WHERE " + where.join(" AND ")
      }

      query += `  GROUP BY
                        adverts.id,
                        advert_name,
                        adverts.description,
                        category_name,
                        adverts.price,
                        "userId",
                        user_name,
                        adverts.created_at
                  ORDER BY adverts.created_at`

      // query += "ORDER BY adverts.created_at"

      try {
            const result = await pool.query(query, params)
            return result.rows
      }
      catch (error) {
            console.log("Error returning search", error)
      }
}

export { searchModel }