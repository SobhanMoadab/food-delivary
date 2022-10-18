import { FoodModel } from "../../../../shared/infra/database/mongoose/models/Food"
import { RestaurantModel } from "../../../../shared/infra/database/mongoose/models/Restaurant"
import { FoodRepository } from "../../repos/impl/foodImpl"
import { RestaurantRepository } from "../../repos/impl/restaurantImpl"
import { GetRestaurantById } from "./GetRestaurantById"
import { GetRestaurantByIdController } from "./GetRestaurantByIdController"

const foodRepo = new FoodRepository(FoodModel)
const restaurantRepo = new RestaurantRepository(RestaurantModel, foodRepo)
const getRestaurantByIdUseCase = new GetRestaurantById(restaurantRepo)
const getRestaurantByIdController = new GetRestaurantByIdController(getRestaurantByIdUseCase)

export {
    getRestaurantByIdUseCase,
    getRestaurantByIdController
}