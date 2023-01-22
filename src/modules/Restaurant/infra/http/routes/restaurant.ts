import express from 'express'
import { allRestaurantController } from '../../../usecases/getAllRestaurants'
import { getFoodsOfRestaurantController } from '../../../usecases/getFoodsOfRestaurant'
import { getRestaurantByIdController } from '../../../usecases/getRestaurantById'
import { registerRestaurantController } from '../../../usecases/registerRestaurant'

const restaurantRouter = express.Router()

restaurantRouter.post('/register', (req: any, res) => registerRestaurantController.executeImpl(req, res))
restaurantRouter.get('/', (req: any, res) => allRestaurantController.executeImpl(req, res))
restaurantRouter.get('/:id', (req: any, res) => getRestaurantByIdController.executeImpl(req, res))
restaurantRouter.get('/:id/foods', (req: any, res) => getFoodsOfRestaurantController.executeImpl(req, res))

export { restaurantRouter }