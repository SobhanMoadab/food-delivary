import { CategoryModel } from "../../../../shared/infra/database/mongoose/models/Category";
import { FoodModel } from "../../../../shared/infra/database/mongoose/models/Food";
import { RestaurantModel } from "../../../../shared/infra/database/mongoose/models/Restaurant";
import { CategoryRepository } from "../../repos/impl/categoryImpl";
import { FoodRepository } from "../../repos/impl/foodImpl";
import { RestaurantRepository } from "../../repos/impl/restaurantImpl";
import { RegisterRestaurantUseCase } from "./RegisterRestaurant";
import { RegisterRestaurantController } from "./RegisterRestaurantController";

const foodRepo = new FoodRepository(FoodModel)
const restaurantRepo = new RestaurantRepository(RestaurantModel, foodRepo)
const categoryRepo = new CategoryRepository(CategoryModel, foodRepo)

const registerRestaurantUseCase = new RegisterRestaurantUseCase(restaurantRepo)
const registerRestaurantController = new RegisterRestaurantController(registerRestaurantUseCase)

export {
    registerRestaurantUseCase,
    registerRestaurantController
}