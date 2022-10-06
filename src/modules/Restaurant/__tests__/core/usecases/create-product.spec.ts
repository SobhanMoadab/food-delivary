/* eslint-disable prefer-const */
import { IProductRepository } from '../../../repos/IProductRepository'
import { CreateProductUseCase } from '../../../usecases/createProduct/CreateProduct'
import { ICategoryRepository } from '../../../repos/ICategoryRepository'
// import { createMock } from 'ts-auto-mock'
import { mock } from 'jest-mock-extended'
import { CreateProductDTO } from '../../../usecases/createProduct/CreateProductDTO'


describe('create product use case', () => {

    let productRepo: IProductRepository
    let categoryRepo: ICategoryRepository
    let useCase: CreateProductUseCase

    beforeEach(() => {
        productRepo = mock<IProductRepository>()
        categoryRepo = mock<ICategoryRepository>()
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
    it('should return error when category does not exists', async () => {
        let dto: CreateProductDTO
        dto = {
            name: 'test',
            category: '',
            discountedFee: 3000,
            fee: 3000,
            recipe: 'test',
        }
        const result = await useCase.execute(dto)
        expect(categoryRepo.findById).toBeCalled()
        expect(productRepo.save).toBeCalledTimes(1)
        expect(result.isRight()).toBeTruthy()
    })

})