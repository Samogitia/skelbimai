import {
      categoriesGetAllModel,
      categoryCreateModel
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

async function createCategory(req, res, next) {
      const {category} = req.body

      if (!category) {
            return res.stauts(400).json({message: "No category data"})
      }

      try {
            await categoryCreateModel({category})
      }
      catch (error) {
            if (error.code === '23505') {
                  return res.status(409).json({error: 'Category already exists', code: '23505'})
            }
            next(error)
      }
}

export { getAllCategories, createCategory }