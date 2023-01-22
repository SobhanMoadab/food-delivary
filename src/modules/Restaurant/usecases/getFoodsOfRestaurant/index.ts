import { FoodModel } from "../../../../shared/infra/database/mongoose/models/Food"
import { FoodRepository } from "../../repos/impl/foodImpl"
import { GetFoodsOfRestaurant } from "./GetFoodsOfRestaurant"
import { GetFoodsOfRestaurantController } from "./GetFoodsOfRestaurantController"


const foodRepo = new FoodRepository(FoodModel)
const getFoodsOfRestaurantUseCase = new GetFoodsOfRestaurant(foodRepo)
const getFoodsOfRestaurantController = new GetFoodsOfRestaurantController(getFoodsOfRestaurantUseCase)


export {
    getFoodsOfRestaurantUseCase,
    getFoodsOfRestaurantController
}