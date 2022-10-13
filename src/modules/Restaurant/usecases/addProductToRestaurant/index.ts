import { ProductModel } from '../../../../shared/infra/database/mongoose/models/Product'
import { ProductRepository } from '../../repos/impl/productImpl'
import { CreateProductUseCase } from './AddProductToRestaurant'
import { CreateProductController } from './AddProductToRestaurantController'
import { CategoryRepository } from '../../repos/impl/categoryImpl'
import { CategoryModel } from '../../../../shared/infra/database/mongoose/models/Category'



const createProductUseCase = new CreateProductUseCase(new ProductRepository(ProductModel), new CategoryRepository(CategoryModel))
const createProductController = new CreateProductController(createProductUseCase)


export {
    createProductController,
    createProductUseCase
}