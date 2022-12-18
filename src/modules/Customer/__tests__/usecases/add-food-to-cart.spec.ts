import { IFoodRepository } from "../../../Restaurant/repos/IFoodRepository"
import { FoodRepository } from "../../../Restaurant/repos/impl/foodImpl"
import { Food404 } from "../../../Restaurant/usecases/addFoodToRestaurant/addFoodToRestaurantErrors"
import { ICartService } from "../../services/cartService"
import { RedisCartService } from "../../services/redis/redisCartService"
import { redisClient } from "../../services/redis/redisConnection"
import { AddFoodToCart } from "../../usecases/addFoodToCart/AddFoodToCart"
import { CartIsEmpty } from "../../usecases/submitOrder/SubmitOrderErrors"

describe('Add food to cart', () => {


    let foodRepo: IFoodRepository
    let cartService: ICartService
    let useCase: AddFoodToCart

    beforeEach(() => {
        jest.resetModules()
        foodRepo = {
            findById: jest.fn(),
            getFoodsByRestaurantId: jest.fn(),
            save: jest.fn(),
            saveBulk: jest.fn()
        }
        cartService = {
            retrieveItems: jest.fn()
        }
        useCase = new AddFoodToCart(foodRepo, cartService)
    })

    it('should throw error if foodId does not exists', async () => {

        foodRepo.findById = jest.fn(() => Promise.reject())
        const result = await useCase.execute({ userId: 'test', foodId: 'test' })
        expect(result.value.isFailure).toBeTruthy()
        expect(result.value).toBeInstanceOf(Food404)
    })

    it('should throw error if redis cart is empty', async () => {
        cartService.retrieveItems = jest.fn(() => Promise.reject())
        const result = await useCase.execute({ userId: 'test', foodId: 'test' })
        expect(result.value.isFailure).toBeTruthy()
        expect(result.value).toBeInstanceOf(CartIsEmpty)

    })
})
