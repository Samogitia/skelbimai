import { createPhotoModel, getPhotosByIdModel } from "../models/photosModels.js";

async function createPhoto(req, res, next) {
      const {advert_id, url} = req.body
      console.log(`req.body: ${JSON.stringify(req.body)}`)

      if (!advert_id || !url) {
            return res.status(400).json({message: "Incomplete photo data."})
      }

      try {
            await createPhotoModel({
                  advert_id,
                  url
            })

            res.status(201).json({message: "Photo url created successfuly"})
      }
      catch (error) {
            next(error)
      }
}

async function getPhotos(req, res, next) {
      const {advert_id} = req.body
      console.log(`req.body: ${JSON.stringify(req.body)}`)

      if (!advert_id) {
            return res.status(400).json({message: "Missing advert id"})
      }

      try {
            const photos = getPhotosByIdModel({advert_id})
            res.status(200).json(photos)
      }
      catch (error) {
            next(error)
      }
}



export { createPhoto, getPhotos }