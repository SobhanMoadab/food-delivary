import { IRestaurantRepository } from "../../../../repos/IRestaurantRepository"
import { RegisterRestaurantUseCase } from "../../../../usecases/registerRestaurant/RegisterRestaurant"
import { RegisterRestaurantDTO } from "../../../../usecases/registerRestaurant/RegisterRestaurantDTO"


describe('Register restaurant usecase', () => {

    let useCase: RegisterRestaurantUseCase
    let restaurantRepo: IRestaurantRepository
    let dto: RegisterRestaurantDTO

    beforeEach(() => {
        restaurantRepo = {
            findById: jest.fn(),
            getAllRestaurants: jest.fn(),
            save: jest.fn(),
        }
        useCase = new RegisterRestaurantUseCase(restaurantRepo)
        dto = {
            city: 'test',
            name: 'test',
            ownerName: 'test',
            ownerSurname: 'test',
            phoneNumber: 333
        }
    })

    it('should throw error if dto is not correct', async () => {
        dto.city = ''
        const result = await useCase.execute(dto)
        expect(result.isLeft).toBeTruthy()
    })

    it('should respond correctly with proper dto', async () => {
        const result = await useCase.execute(dto)
        expect(result.isRight).toBeTruthy()
    })
})