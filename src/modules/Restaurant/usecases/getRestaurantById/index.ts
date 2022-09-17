import { RestaurantModel } from "../../../../shared/infra/database/mongoose/models/Restaurant"
import { RestaurantRepository } from "../../repos/impl/restaurantImpl"
import { GetRestaurantById } from "./GetRestaurantById"
import { GetRestaurantByIdController } from "./GetRestaurantByIdController"


const restaurantRepo = new RestaurantRepository(RestaurantModel)
const getRestaurantByIdUseCase = new GetRestaurantById(restaurantRepo)
const getRestaurantByIdController = new GetRestaurantByIdController(getRestaurantByIdUseCase)

export {
    getRestaurantByIdUseCase,
    getRestaurantByIdController
}