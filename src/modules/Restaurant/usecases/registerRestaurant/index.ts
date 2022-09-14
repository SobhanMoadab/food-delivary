import { CategoryModel } from "../../../../shared/infra/database/mongoose/models/Category";
import { RestaurantModel } from "../../../../shared/infra/database/mongoose/models/Restaurant";
import { CategoryRepository } from "../../repos/impl/categoryImpl";
import { RestaurantRepository } from "../../repos/impl/restaurantImpl";
import { RegisterRestaurantUseCase } from "./RegisterRestaurant";
import { RegisterRestaurantController } from "./RegisterRestaurantController";

const restaurantRepo = new RestaurantRepository(RestaurantModel)
const categoryRepo = new CategoryRepository(CategoryModel)

const registerRestaurantUseCase = new RegisterRestaurantUseCase(categoryRepo, restaurantRepo)
const registerRestaurantController = new RegisterRestaurantController(registerRestaurantUseCase)

export {
    registerRestaurantUseCase,
    registerRestaurantController
}