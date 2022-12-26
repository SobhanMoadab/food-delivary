import { OrderModel } from "../../../../shared/infra/database/mongoose/models/Order"
import { FoodModel } from "../../../../shared/infra/database/mongoose/models/Food"
import { RestaurantModel } from "../../../../shared/infra/database/mongoose/models/Restaurant"
import { FoodRepository } from "../../../Restaurant/repos/impl/foodImpl"
import { RestaurantRepository } from "../../../Restaurant/repos/impl/restaurantImpl"
import { OrderRepository } from "../../repos/impl/OrderImpl"
import { SubmitOrderUseCase } from "./SubmitOrder"
import { SubmitOrderController } from "./SubmitOrderController"
import { RedisCartService } from "../../services/redis/redisCartService"
import { redisClient } from "../../services/redis/redisConnection"

const foodRepository = new FoodRepository(FoodModel)
const restaurantRepository = new RestaurantRepository(RestaurantModel, foodRepository)
const cartService = new RedisCartService(redisClient)


const createSubmitOrderUseCase = new SubmitOrderUseCase(restaurantRepository, cartService)
const createSubmitOrderController = new SubmitOrderController(createSubmitOrderUseCase)

export {
    createSubmitOrderController,
    createSubmitOrderUseCase,
}