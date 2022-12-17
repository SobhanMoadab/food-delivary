import { IRestaurantRepository } from "../../../Restaurant/repos/IRestaurantRepository"
import { Restaurant404 } from "../../../Restaurant/usecases/registerRestaurant/RegisterRestaurantErrors"
import { ICartService } from "../../services/cartService"
import { SubmitOrderUseCase } from "../../usecases/submitOrder/SubmitOrder"
import { CartIsEmpty } from "../../usecases/submitOrder/SubmitOrderErrors"



describe('submit order', () => {

    beforeEach(() => {
        ''
    })

    it('should throw error if restaurantId is not correct ', async () => {
        const restaurantRepo: IRestaurantRepository = {
            findById: jest.fn().mockImplementation(() => Promise.reject()),
            getAllRestaurants: jest.fn(),
            save: jest.fn()
        }
        const cartService: ICartService = {
            retrieveItems: jest.fn()
        }

        //     const dto: SubmitOrderDTO = {
        //         foodsPrice: 333,
        //         restaurantId: 'test'
        //     }

        const useCase = new SubmitOrderUseCase(restaurantRepo, cartService)
        const result = await useCase.execute({ foodsPrice: 333333, restaurantId: 'test', userId: 'test' })

        expect(result.value).toBeInstanceOf(Restaurant404)
        expect(result.value.isSuccess).toBeFalsy()
        // })

        // it('should throw error if redis cart is empty', async () => {
        //     const restaurantRepo: IRestaurantRepository = {
        //         findById: jest.fn().mockImplementation(() => Promise.resolve()),
        //         getAllRestaurants: jest.fn(),
        //         save: jest.fn()
        //     }
        //     const dto: SubmitOrderDTO = {
        //         foodsPrice: 333,
        //         restaurantId: 'test'
        //     }

        //     const useCase = new SubmitOrderUseCase(restaurantRepo)
        //     const result = await useCase.execute(dto)
        //     expect(result.value).toBeInstanceOf(Restaurant404)
        //     expect(result.value.isSuccess).toBeFalsy()
    })

    it('should respond correctly', async () => {
        const cartService: ICartService = {
            retrieveItems: jest.fn()
        }
        const restaurantRepo: IRestaurantRepository = {
            findById: jest.fn(),
            getAllRestaurants: jest.fn(),
            save: jest.fn()
        }
        const useCase = new SubmitOrderUseCase(restaurantRepo, cartService)
        const result = await useCase.execute({ foodsPrice: 333, restaurantId: 'test', userId: 'test' })
        expect(result.value.isSuccess).toBeTruthy()
    })

    it('should throw redis error if user does not exists', async () => {

        const restaurantRepo: IRestaurantRepository = {
            findById: jest.fn(),
            getAllRestaurants: jest.fn(),
            save: jest.fn()
        }
        const cartService: ICartService = {
            retrieveItems: jest.fn().mockImplementation(() => Promise.reject())
        }

        const useCase = new SubmitOrderUseCase(restaurantRepo, cartService)
        const result = await useCase.execute({ foodsPrice: 333, restaurantId: 'test', userId: 'test' })
        expect(result.value.isSuccess).toBeFalsy()
        expect(result.value).toBeInstanceOf(CartIsEmpty)

    })
})