import { UnexpectedError } from "../../../../../shared/core/AppError"
import { IFoodRepository } from "../../../repos/IFoodRepository"
import { FoodRepository } from "../../../repos/impl/foodImpl"
import { GetFoodsOfRestaurant } from "../../../usecases/getFoodsOfRestaurant/GetFoodsOfRestaurant"


describe('Get foods by restaurantId', () => {


    it('should throw error if restaurantId is incorrect', async () => {

        const foodRepo: IFoodRepository = {
            findById: jest.fn(),
            getFoodsByRestaurantId: jest.fn().mockImplementation(() => Promise.reject()),
            save: jest.fn(),
            saveBulk: jest.fn()
        }
        const useCase = new GetFoodsOfRestaurant(foodRepo)
        const result = await useCase.execute({ restaurantId: 'a' })
        const value = result.value

        expect(result.isRight()).toBeFalsy()
        expect(value).toBeInstanceOf(UnexpectedError)

    })
})