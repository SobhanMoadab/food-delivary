import { ProductModel } from '../../../../shared/infra/database/mongoose/models/Product'
import { ProductRepository } from '../../repos/impl/productMongoose'
import { CreateProductUseCase } from './CreateProduct'
import { CreateProductController } from './CreateProductController'
import { CategoryRepository } from '../../repos/impl/categoryMongoose'
import { CategoryModel } from '../../../../shared/infra/database/mongoose/models/Category'



const createProductUseCase = new CreateProductUseCase(new ProductRepository(ProductModel), new CategoryRepository(CategoryModel))
const createProductController = new CreateProductController(createProductUseCase)


export {
    createProductController,
    createProductUseCase
}