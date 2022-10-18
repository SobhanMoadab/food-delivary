import { CreateCategoryController } from './CreateFoodController'
import { CreateCategoryUseCase } from './CreateFood'
import { CategoryModel } from '../../../../shared/infra/database/mongoose/models/Category'
import { CategoryRepository } from '../../repos/impl/categoryImpl'
import { RestaurantRepository } from '../../repos/impl/restaurantImpl'
import { RestaurantModel } from '../../../../shared/infra/database/mongoose/models/Restaurant'
import { FoodRepository } from '../../repos/impl/foodImpl'
import { FoodModel } from '../../../../shared/infra/database/mongoose/models/Food'


const foodRepo = new FoodRepository(FoodModel)

const categoryRepo = new CategoryRepository(CategoryModel, foodRepo)
const restaurantRepo = new RestaurantRepository(RestaurantModel, foodRepo)

const createCategoryUseCase = new CreateCategoryUseCase(categoryRepo, restaurantRepo)
const createCategoryController = new CreateCategoryController(createCategoryUseCase)


export {
    createCategoryController,
    createCategoryUseCase
}