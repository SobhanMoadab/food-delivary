import express from 'express'
import { createCategoryController } from '../../../RestaurantOwner/usecases/createCategory'

const categoryRouter = express.Router()

categoryRouter.post('/', (req: any, res) => createCategoryController.executeImpl(req, res))

export { categoryRouter }