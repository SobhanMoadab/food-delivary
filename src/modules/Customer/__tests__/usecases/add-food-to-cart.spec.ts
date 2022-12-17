import { IFoodRepository } from "../../../Restaurant/repos/IFoodRepository"
import { IRestaurantRepository } from "../../../Restaurant/repos/IRestaurantRepository"
import { Food404 } from "../../../Restaurant/usecases/addFoodToRestaurant/addFoodToRestaurantErrors"
import { AddFoodToCart } from "../../usecases/addFoodToCart/AddFoodToCart"


describe('Add food to cart', () => {

    it('should throw error if foodId does not exists', async () => {

        const foodRepo: IFoodRepository = {
            findById: jest.fn(() => Promise.reject()),
            getFoodsByRestaurantId: jest.fn(),
            save: jest.fn(),
            saveBulk: jest.fn()
        }

        const useCase = new AddFoodToCart(foodRepo)
        const result = await useCase.execute({ userId: 'test', foodId: 'test' })
        expect(result.value.isFailure).toBeTruthy()
        expect(result.value).toBeInstanceOf(Food404)
    })
})