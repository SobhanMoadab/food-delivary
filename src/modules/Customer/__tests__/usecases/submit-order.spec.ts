import { IRestaurantRepository } from "../../../Restaurant/repos/IRestaurantRepository"
import { Restaurant404 } from "../../../Restaurant/usecases/registerRestaurant/RegisterRestaurantErrors"
import { SubmitOrderUseCase } from "../../usecases/submitOrder/SubmitOrder"
import { SubmitOrderDTO } from "../../usecases/submitOrder/SubmitOrderDTO"



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
        const dto: SubmitOrderDTO = {
            foodsPrice: 333,
            restaurantId: 'test'
        }

        const useCase = new SubmitOrderUseCase(restaurantRepo)
        const result = await useCase.execute(dto)
        expect(result.value).toBeInstanceOf(Restaurant404)
        expect(result.value.isSuccess).toBeFalsy()
    })

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
    // })
})