import { pool } from "../database/database.js"

async function addFavoriteModel({userId, advertId}) {
      const query = `INSERT INTO favorites (user_id, advert_id)
                        VALUES ($1, $2)`

      const values = [userId, advertId]
      try {
            await pool.query(query, values)
      }
      catch(error) {
            console.log("Error adding to favorites", error)
            throw error
      }
}

async function removeFavoriteModel({userId, advertId}) {
      const query = `DELETE FROM favorites
                        WHERE user_id = $1
                        AND advert_id = $2`

      const values = [userId, advertId]

      try {
            await pool.query(query, values)
      }
      catch (error) {
            console.log("Error removing favorite", error)
            throw error
      }
}

async function favoritedAdvertsModel({userId}) {
      const query =     `SELECT adverts.* 
                              FROM favorites 
                              JOIN adverts 
                                    ON adverts.id = favorites.advert_id 
                              WHERE favorites.user_id = $1`

      const values = [userId]

      try {
            const favorites = await pool.query(query, values)
            return favorites.rows
      }
      catch (error) {
            console.log("Error getting favorites", error.detail)
            throw(error)
      }
}

export { addFavoriteModel, removeFavoriteModel, favoritedAdvertsModel}