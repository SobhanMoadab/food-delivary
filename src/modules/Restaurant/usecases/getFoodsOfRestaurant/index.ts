import { FoodModel } from "../../../../shared/infra/database/mongoose/models/Food"
import { FoodRepository } from "../../repos/impl/foodImpl"
import { GetFoodsOfRestaurant } from "./GetFoodsOfRestaurant"
import { GetFoodsOfRestaurantController } from "./GetFoodsOfRestaurantController"


const foodRepo = new FoodRepository(FoodModel)
const createGetFoodsOfRestaurantUseCase = new GetFoodsOfRestaurant(foodRepo)
const createGetFoodsOfRestaurant = new GetFoodsOfRestaurantController(createGetFoodsOfRestaurantUseCase)


export {
    createGetFoodsOfRestaurantUseCase,
    createGetFoodsOfRestaurant
}