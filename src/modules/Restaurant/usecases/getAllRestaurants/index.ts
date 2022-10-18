import { FoodModel } from "../../../../shared/infra/database/mongoose/models/Food"
import { RestaurantModel } from "../../../../shared/infra/database/mongoose/models/Restaurant"
import { FoodRepository } from "../../repos/impl/foodImpl"
import { RestaurantRepository } from "../../repos/impl/restaurantImpl"
import { GetAllRestaurantsUseCase } from "./AllRestaurant"
import { GetAllRestaurantsController } from "./AllRestaurantController"

const foodRepo = new FoodRepository(FoodModel)
const restaurantRepo = new RestaurantRepository(RestaurantModel, foodRepo)
const allRestaurantUseCase = new GetAllRestaurantsUseCase(restaurantRepo)
const allRestaurantController = new GetAllRestaurantsController(allRestaurantUseCase)

export {
    allRestaurantController,
    allRestaurantUseCase
}