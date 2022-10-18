import { OrderModel } from "../../../../shared/infra/database/mongoose/models/Order"
import { FoodModel } from "../../../../shared/infra/database/mongoose/models/Food"
import { RestaurantModel } from "../../../../shared/infra/database/mongoose/models/Restaurant"
import { FoodRepository } from "../../../Restaurant/repos/impl/foodImpl"
import { RestaurantRepository } from "../../../Restaurant/repos/impl/restaurantImpl"
import { OrderRepository } from "../../repos/impl/OrderImpl"
import { SubmitOrderUseCase } from "./SubmitOrder"
import { SubmitOrderController } from "./SubmitOrderController"

const orderRepository = new OrderRepository(OrderModel)
const foodRepository = new FoodRepository(FoodModel)
const restaurantRepository = new RestaurantRepository(RestaurantModel, foodRepository)

const createSubmitOrderUseCase = new SubmitOrderUseCase(orderRepository, restaurantRepository, foodRepository)
const createSubmitOrderController = new SubmitOrderController(createSubmitOrderUseCase)

export {
    createSubmitOrderController,
    createSubmitOrderUseCase,

}