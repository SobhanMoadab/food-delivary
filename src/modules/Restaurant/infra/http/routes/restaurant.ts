import express from 'express'
import { registerRestaurantController } from '../../../usecases/registerRestaurant'

const restaurantRouter = express.Router()

restaurantRouter.post('/', (req: any, res) => registerRestaurantController.executeImpl(req, res))

export { restaurantRouter }