import { RestaurantModel } from "../../../../shared/infra/database/mongoose/models/Restaurant"
import { RestaurantRepository } from "../../repos/impl/restaurantImpl"
import { GetAllRestaurantsUseCase } from "./AllRestaurant"
import { GetAllRestaurantsController } from "./AllRestaurantController"


const restaurantRepo = new RestaurantRepository(RestaurantModel)
const allRestaurantUseCase = new GetAllRestaurantsUseCase(restaurantRepo)
const allRestaurantController = new GetAllRestaurantsController(allRestaurantUseCase)

export {
    allRestaurantController,
    allRestaurantUseCase
}