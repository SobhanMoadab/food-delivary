import { AddProductToRestaurantUseCase } from './addFoodToRestaurant'
import { AddProductToRestaurantController } from './addFoodToRestaurantController'
import { CategoryRepository } from '../../repos/impl/categoryImpl'
import { CategoryModel } from '../../../../shared/infra/database/mongoose/models/Category'
import { RestaurantRepository } from '../../repos/impl/restaurantImpl'
import { RestaurantModel } from '../../../../shared/infra/database/mongoose/models/Restaurant'
import { ProductRepository } from '../../repos/impl/productImpl'
import { ProductModel } from '../../../../shared/infra/database/mongoose/models/Product'

const productRepo = new ProductRepository(ProductModel)
const restaurantRepo = new RestaurantRepository(RestaurantModel)
const categoryRepo = new CategoryRepository(CategoryModel, productRepo)

const createProductUseCase = new AddProductToRestaurantUseCase(categoryRepo, productRepo, restaurantRepo)
const createProductController = new AddProductToRestaurantController(createProductUseCase)


export {
    createProductController,
    createProductUseCase
}