import { addFavoriteModel, favoritedAdvertsModel, removeFavoriteModel } from "../models/favoriteModels.js";
import { getPhotosByIdModel } from "../models/photosModels.js";

async function addFavorite(req, res, next) {
      const {userId, advertId} = req.body
      console.log(`req.body: ${JSON.stringify(req.body)}`)

      if (!userId || !advertId) {
            return res.status(400).json({message: "No user id or advert id"})
      }

      try {
            await addFavoriteModel({userId, advertId})
            res.status(201).json({message: "Succes adding favorite"})
      }
      catch (error) {
            next(error)
      }
}

async function removeFavorite(req, res, next) {
      const {userId, advertId} = req.body

      if (!userId || !advertId) {
            return res.status(400).json({message: "No user id or advert id"})
      }

      try {
            await removeFavoriteModel({userId, advertId})
            res.status(201).json({message: "Succes removing favorite"})
      }
      catch (error) {
            next(error)
      }
}

async function favoritedByUser (req, res, next) {
      const {userId} = req.params
      console.log(`req.params: ${JSON.stringify(req.params)}`)

      if (!userId) {
            return res.status(400).json({message: "No user id (favoritedByUser)"})
      }
      
      try {
            const favorites = await favoritedAdvertsModel({userId})

            const advertsPhotos = await Promise.all(
                  favorites.map( async advert => {
                        const photo_urls = await getPhotosByIdModel(advert.id)
                        return { ...advert, photoUrls: photo_urls}
                  })
            )

            res.status(200).json(advertsPhotos)
      }
      catch (error) {
            next(error)   
      }
}

export { addFavorite, removeFavorite, favoritedByUser}