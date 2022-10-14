import { CategoryModel } from "../../../../shared/infra/database/mongoose/models/Category";
import { ProductModel } from "../../../../shared/infra/database/mongoose/models/Product";
import { RestaurantModel } from "../../../../shared/infra/database/mongoose/models/Restaurant";
import { CategoryRepository } from "../../repos/impl/categoryImpl";
import { ProductRepository } from "../../repos/impl/productImpl";
import { RestaurantRepository } from "../../repos/impl/restaurantImpl";
import { RegisterRestaurantUseCase } from "./RegisterRestaurant";
import { RegisterRestaurantController } from "./RegisterRestaurantController";

const productRepo = new ProductRepository(ProductModel)
const restaurantRepo = new RestaurantRepository(RestaurantModel)
const categoryRepo = new CategoryRepository(CategoryModel, productRepo)

const registerRestaurantUseCase = new RegisterRestaurantUseCase(categoryRepo, restaurantRepo)
const registerRestaurantController = new RegisterRestaurantController(registerRestaurantUseCase)

export {
    registerRestaurantUseCase,
    registerRestaurantController
}