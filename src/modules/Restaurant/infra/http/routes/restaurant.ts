import express from 'express'
import { allRestaurantController } from '../../../usecases/getAllRestaurants'
import { getRestaurantByIdController } from '../../../usecases/getRestaurantById'
import { registerRestaurantController } from '../../../usecases/registerRestaurant'

const restaurantRouter = express.Router()

restaurantRouter.post('/', (req: any, res) => registerRestaurantController.executeImpl(req, res))
restaurantRouter.get('/', (req: any, res) => allRestaurantController.executeImpl(req, res))
restaurantRouter.get('/:id', (req: any, res) => getRestaurantByIdController.executeImpl(req, res))

export { restaurantRouter }