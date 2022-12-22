import { IRestaurantRepository } from "../../../Restaurant/repos/IRestaurantRepository"
import { Restaurant404 } from "../../../Restaurant/usecases/registerRestaurant/RegisterRestaurantErrors"
import { ICartService } from "../../services/cartService"
import { SubmitOrderUseCase } from "../../usecases/submitOrder/SubmitOrder"
import { SubmitOrderDTO } from "../../usecases/submitOrder/SubmitOrderDTO"
import { CartIsEmpty } from "../../usecases/submitOrder/SubmitOrderErrors"



describe('submit order', () => {
    let restaurantRepo: IRestaurantRepository,
        cartService: ICartService,
        dto: SubmitOrderDTO,
        useCase: SubmitOrderUseCase

    beforeEach(() => {
        jest.resetModules()
        restaurantRepo = {
            findById: jest.fn(),
            getAllRestaurants: jest.fn(),
            save: jest.fn()
        }
        cartService = {
            getCartItems: jest.fn(),
            decrement: jest.fn(),
            increment: jest.fn()
        }
        useCase = new SubmitOrderUseCase(restaurantRepo, cartService)

        dto = {
            foodsPrice: 333,
            restaurantId: '1',
            userId: '1'
        }
    })

    it('should throw error if restaurantId is not correct ', async () => {
        restaurantRepo.findById = jest.fn(() => Promise.reject())
        const result = await useCase.execute({ foodsPrice: 333333, restaurantId: 'test', userId: 'test' })
        expect(result.value).toBeInstanceOf(Restaurant404)
        expect(result.value.isSuccess).toBeFalsy()
    })

    it('should respond correctly', async () => {
        const result = await useCase.execute(dto)
        expect(result.value.isSuccess).toBeTruthy()
    })

})