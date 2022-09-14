import { CreateCategoryController } from './CreateCategoryController'
import { CreateCategoryUseCase } from './CreateCategory'
import { CategoryModel } from '../../../../shared/infra/database/mongoose/models/Category'
import { CategoryRepository } from '../../repos/impl/categoryMongoose'



const createCategoryUseCase = new CreateCategoryUseCase(new CategoryRepository(CategoryModel))
const createCategoryController = new CreateCategoryController(createCategoryUseCase)


export {
    createCategoryController,
    createCategoryUseCase
}