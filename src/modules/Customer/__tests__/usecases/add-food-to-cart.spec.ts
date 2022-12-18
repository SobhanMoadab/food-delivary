import { IFoodRepository } from "../../../Restaurant/repos/IFoodRepository"
import { FoodRepository } from "../../../Restaurant/repos/impl/foodImpl"
import { Food404 } from "../../../Restaurant/usecases/addFoodToRestaurant/addFoodToRestaurantErrors"
import { ICartService } from "../../services/cartService"
import { RedisCartService } from "../../services/redis/redisCartService"
import { redisClient } from "../../services/redis/redisConnection"
import { AddFoodToCart } from "../../usecases/addFoodToCart/AddFoodToCart"

describe('Add food to cart', () => {


    let foodRepo: IFoodRepository
    let cartService: ICartService

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
    })

    it('should throw error if foodId does not exists', async () => {

        // const foodRepo: IFoodRepository = {
        //     findById: jest.fn(() => Promise.raceject()),
        //     getFoodsByRestaurantId: jest.fn(),
        //     save: jest.fn(),
        //     saveBulk: jest.fn()
        // }
        foodRepo.findById = jest.fn(() => Promise.reject())
        const useCase = new AddFoodToCart(foodRepo, cartService)
        const result = await useCase.execute({ userId: 'test', foodId: 'test' })
        expect(result.value.isFailure).toBeTruthy()
        expect(result.value).toBeInstanceOf(Food404)
    })

    it('should throw error if redis cart is empty', async () => {
        const useCase = new AddFoodToCart(foodRepo, cartService)
        const result = await useCase.execute({ userId: 'test', foodId: 'test' })

    })
})
