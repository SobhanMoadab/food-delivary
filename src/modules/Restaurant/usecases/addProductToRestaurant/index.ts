import { AddProductToRestaurantUseCase } from './AddProductToRestaurant'
import { AddProductToRestaurantController } from './AddProductToRestaurantController'
import { CategoryRepository } from '../../repos/impl/categoryImpl'
import { CategoryModel } from '../../../../shared/infra/database/mongoose/models/Category'
import { RestaurantRepository } from '../../repos/impl/restaurantImpl'
import { RestaurantModel } from '../../../../shared/infra/database/mongoose/models/Restaurant'



const createProductUseCase = new AddProductToRestaurantUseCase(new CategoryRepository(CategoryModel), new RestaurantRepository(RestaurantModel))
const createProductController = new AddProductToRestaurantController(createProductUseCase)


export {
    createProductController,
    createProductUseCase
}