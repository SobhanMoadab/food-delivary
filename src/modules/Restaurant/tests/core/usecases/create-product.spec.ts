/* eslint-disable prefer-const */
import { IProductRepository } from '../../../repos/IProductRepository'
import { CreateProductUseCase } from '../../../usecases/createProduct/CreateProduct'
import { ICategoryRepository } from '../../../repos/ICategoryRepository'
import { createMock } from 'ts-auto-mock'
import { CreateProductDTO } from '../../../usecases/createProduct/CreateProductDTO'
import { Category } from '../../../domain/category'


describe('create product use case', () => {

    let productRepo: IProductRepository
    let categoryRepo: ICategoryRepository
    let useCase: CreateProductUseCase

    beforeEach(async () => {
        productRepo = createMock<IProductRepository>()
        categoryRepo = createMock<ICategoryRepository>()
        useCase = new CreateProductUseCase(productRepo, categoryRepo)
    })

    it('should create product', async () => {
        let dto: CreateProductDTO

        dto = {
            name: 'test',
            category: 'test',
            discountedFee: 3000,
            fee: 3000,
            recipe: 'test',
        }
        const result = await useCase.execute(dto)
        expect(categoryRepo.findById).toBeCalled()
        expect(productRepo.save).toBeCalled()
        expect(result.isRight()).toBeTruthy()
    })

})