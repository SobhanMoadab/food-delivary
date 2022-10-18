import { AddFoodToRestaurantUseCase } from './addFoodToRestaurant'
import { AddFoodToRestaurantController } from './addFoodToRestaurantController'
import { CategoryRepository } from '../../repos/impl/categoryImpl'
import { CategoryModel } from '../../../../shared/infra/database/mongoose/models/Category'
import { RestaurantRepository } from '../../repos/impl/restaurantImpl'
import { RestaurantModel } from '../../../../shared/infra/database/mongoose/models/Restaurant'
import { FoodRepository } from '../../repos/impl/foodImpl'
import { FoodModel } from '../../../../shared/infra/database/mongoose/models/Food'

const foodRepo = new FoodRepository(FoodModel)
const restaurantRepo = new RestaurantRepository(RestaurantModel, foodRepo)
const categoryRepo = new CategoryRepository(CategoryModel, foodRepo)

const createFoodUseCase = new AddFoodToRestaurantUseCase(restaurantRepo)
const createFoodController = new AddFoodToRestaurantController(createFoodUseCase)


export {
    createFoodController,
    createFoodUseCase
}