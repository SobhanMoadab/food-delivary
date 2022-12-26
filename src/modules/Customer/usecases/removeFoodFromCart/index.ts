import { RedisCartService } from "../../services/redis/redisCartService"
import { redisClient } from "../../services/redis/redisConnection"
import { RemoveFoodFromCart } from "./RemoveFoodFromCart"
import { RemoveFoodFromCartController } from "./RemoveFoodFromCartController"

const cartService = new RedisCartService(redisClient)
const createRemoveFoodFromCart = new RemoveFoodFromCart(cartService)
const createRemoveFoodFromCartController = new RemoveFoodFromCartController(createRemoveFoodFromCart)

export {
    createRemoveFoodFromCart,
    createRemoveFoodFromCartController
}