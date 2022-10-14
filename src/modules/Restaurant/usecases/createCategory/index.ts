import { CreateCategoryController } from './CreateCategoryController'
import { CreateCategoryUseCase } from './CreateCategory'
import { CategoryModel } from '../../../../shared/infra/database/mongoose/models/Category'
import { CategoryRepository } from '../../repos/impl/categoryImpl'
import { RestaurantRepository } from '../../repos/impl/restaurantImpl'
import { RestaurantModel } from '../../../../shared/infra/database/mongoose/models/Restaurant'
import { ProductRepository } from '../../repos/impl/productImpl'
import { ProductModel } from '../../../../shared/infra/database/mongoose/models/Product'


const productRepo = new ProductRepository(ProductModel)

const categoryRepo = new CategoryRepository(CategoryModel,productRepo)
const restaurantRepo = new RestaurantRepository(RestaurantModel)

const createCategoryUseCase = new CreateCategoryUseCase(categoryRepo, restaurantRepo)
const createCategoryController = new CreateCategoryController(createCategoryUseCase)


export {
    createCategoryController,
    createCategoryUseCase
}