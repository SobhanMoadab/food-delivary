import express from 'express'
import { createFoodController } from '../../../usecases/addFoodToRestaurant'
import { createGetFoodsOfRestaurant } from '../../../usecases/getFoodsOfRestaurant'

const foodRouter = express.Router()

foodRouter.post('/', (req: any, res) => createFoodController.executeImpl(req, res))
foodRouter.get('/:restaurantId/restaurant', (req: any, res) => createGetFoodsOfRestaurant.executeImpl(req, res))


export { foodRouter }