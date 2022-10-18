import { ProductModel } from "../../../../shared/infra/database/mongoose/models/Product"
import { ProductRepository } from "../../repos/impl/productImpl"
import { GetFoodsOfRestaurant } from "./GetFoodsOfRestaurant"
import { GetFoodsOfRestaurantController } from "./GetFoodsOfRestaurantController"


const productRepo = new ProductRepository(ProductModel)
const createGetFoodsOfRestaurantUseCase = new GetFoodsOfRestaurant(productRepo)
const createGetFoodsOfRestaurant = new GetFoodsOfRestaurantController(createGetFoodsOfRestaurantUseCase)


export {
    createGetFoodsOfRestaurantUseCase,
    createGetFoodsOfRestaurant
}