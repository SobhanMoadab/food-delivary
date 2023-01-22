import express from 'express'
import { createFoodController } from '../../../usecases/addFoodToRestaurant'
import { getFoodsOfRestaurantController } from '../../../usecases/getFoodsOfRestaurant'

const foodRouter = express.Router()

foodRouter.post('/', (req: any, res) => createFoodController.executeImpl(req, res))
foodRouter.get('/:restaurantId/restaurant', (req: any, res) => getFoodsOfRestaurantController.executeImpl(req, res))


export { foodRouter }