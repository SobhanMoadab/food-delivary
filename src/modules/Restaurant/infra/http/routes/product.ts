import express from 'express'
import { createProductController } from '../../../usecases/addProductToRestaurant'

const productRouter = express.Router()

productRouter.post('/', (req: any, res) => createProductController.executeImpl(req, res))

export { productRouter }