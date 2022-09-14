import express from 'express'
import { createCategoryController } from '../../../usecases/createCategory'

const categoryRouter = express.Router()

categoryRouter.post('/', (req: any, res) => createCategoryController.executeImpl(req, res))

export { categoryRouter }