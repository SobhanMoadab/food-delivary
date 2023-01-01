
import { AddFoodToCart } from './AddFoodToCart'
import { FoodRepository } from '../../../Restaurant/repos/impl/foodImpl'
import { FoodModel } from '../../../../shared/infra/database/mongoose/models/Food'
import { RedisCartService } from '../../services/redis/redisCartService'
import { redisClient } from '../../services/redis/redisConnection'
import { AddFoodToCartController } from './AddFoodToCartController'

const foodRepo = new FoodRepository(FoodModel)
const cartService = new RedisCartService(redisClient)

const createAddFoodToCart = new AddFoodToCart(foodRepo, cartService)
const createAddFoodToCartController = new AddFoodToCartController(createAddFoodToCart)

export {
    createAddFoodToCart,
    createAddFoodToCartController
}