import {
      categoriesGetAllModel
} from "../models/categoriesModels.js"

async function getAllCategories(req, res, next) {
      try {
            const categories = await categoriesGetAllModel()
            res.status(200).json(categories)
      }
      catch (error) {
            next (error)
      }
}

export { getAllCategories }