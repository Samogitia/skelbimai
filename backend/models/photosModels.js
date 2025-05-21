import { pool } from '../database/database.js'

async function createPhotoModel({advert_id, photo_url}) {
      const query = `INSERT INTO photos (advert_id, photo_url)
                        VALUES ($1, $2)`

      const values = [advert_id, photo_url]

      try {
           await pool.query(query, values)
      }
      catch (error) {
            console.log("Failed writing photo.", error)
      }
}

async function getPhotosByIdModel(advert_id) {
      const query = `SELECT photo_url from photos
                        WHERE advert_id = $1`
      
      const values = [advert_id]

      try {
            const photos = await pool.query(query, values)
            return photos.rows
      }
      catch (error) {
            console.log("Failed getting photos.", error)
      }
}

export { createPhotoModel, getPhotosByIdModel }