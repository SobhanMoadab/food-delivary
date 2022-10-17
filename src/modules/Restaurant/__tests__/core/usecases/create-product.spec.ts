// /* eslint-disable prefer-const */
// import { AddProductToRestaurantUseCase } from '../../../usecases/addProductToCategory/addProductToCategory'
// import { ICategoryRepository } from '../../../repos/ICategoryRepository'
// // import { createMock } from 'ts-auto-mock'
// import { AddProductToRestaurantDTO } from '../../../usecases/addProductToCategory/addProductToCategoryDTO'
// import { IRestaurantRepository } from '../../../repos/IRestaurantRepository'
// import { Restaurant } from '../../../domain/restaurant'


describe('create product use case', () => {

//     let restaurantRepo: IRestaurantRepository
//     let categoryRepo: ICategoryRepository
//     let useCase: AddProductToRestaurantUseCase
//     let restaurant: Restaurant

//     beforeEach(() => {
//         restaurant = Restaurant.create({
//             city: 'a',
//             name: 'a',
//             ownerName: 'a',
//             ownerSurname: 'a',
//             phoneNumber: 111111111111
//         }).getValue()

//         jest.clearAllMocks()
//         restaurantRepo = {
//             findById: jest.fn().mockReturnValue(restaurant),
//             getAllRestaurants: jest.fn(),
//             save: jest.fn(),

//         }
//         categoryRepo = {
//             findById: jest.fn().mockReturnValueOnce({
//                 categoryId: 'test'
//             }),
//             save: jest.fn()
//         }
//         useCase = new AddProductToRestaurantUseCase(categoryRepo, restaurantRepo)
//     })

    it('should add product to restaurant', async () => {
//         let dto: AddProductToRestaurantDTO
//         dto = {
//             name: 'test',
//             categoryId: 'test',
//             discountedFee: 3000,
//             fee: 3000,
//             recipe: 'test',
//         }
//         const result = await useCase.execute(dto)
//         expect(categoryRepo.findById).toBeCalled()
//         // expect(result.isRight()).toBeTruthy()
//     })
//     it('should return error when category does not exists', async () => {
//         let dto: AddProductToRestaurantDTO
//         dto = {
//             name: 'test',
//             categoryId: '',
//             discountedFee: 3000,
//             fee: 3000,
//             recipe: 'test',
//         }
//         const result = await useCase.execute(dto)
//         expect(categoryRepo.findById).toBeCalled()
//         // expect(result.isRight()).toBeTruthy()
    })

})