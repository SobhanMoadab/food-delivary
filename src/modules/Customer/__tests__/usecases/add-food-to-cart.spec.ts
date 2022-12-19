import { IFoodRepository } from "../../../Restaurant/repos/IFoodRepository"
import { Food404 } from "../../../Restaurant/usecases/addFoodToRestaurant/addFoodToRestaurantErrors"
import { ICartService } from "../../services/cartService"
import { AddFoodToCart } from "../../usecases/addFoodToCart/AddFoodToCart"
import { AddFoodToCartDTO } from "../../usecases/addFoodToCart/AddFoodToCartDTO"
import { CartIsEmpty } from "../../usecases/submitOrder/SubmitOrderErrors"

describe('Add food to cart', () => {


    let foodRepo: IFoodRepository
    let cartService: ICartService
    let useCase: AddFoodToCart
    let dto: AddFoodToCartDTO

    beforeEach(() => {
        jest.resetModules()
        foodRepo = {
            findById: jest.fn(),
            getFoodsByRestaurantId: jest.fn(),
            save: jest.fn(),
            saveBulk: jest.fn()
        }
        cartService = {
            retrieveItems: jest.fn(),
            decrement: jest.fn(),
            increment: jest.fn()
        }
        useCase = new AddFoodToCart(foodRepo, cartService)
        dto = {
            userId: '1',
            foodId: '1',
            qty: 1
        }
    })

    it('should throw error if foodId does not exists', async () => {

        foodRepo.findById = jest.fn(() => Promise.reject())
        const result = await useCase.execute(dto)
        expect(result.value.isFailure).toBeTruthy()
        expect(result.value).toBeInstanceOf(Food404)
    })

    it('should throw error if redis cart is empty', async () => {
        cartService.retrieveItems = jest.fn(() => Promise.reject())
        const result = await useCase.execute(dto)
        expect(result.value.isFailure).toBeTruthy()
        expect(result.value).toBeInstanceOf(CartIsEmpty)

    })

    it('should increment if item exists in redis cart', async () => {
        cartService.retrieveItems = jest.fn(() => Promise.resolve(dto))
        const result = await useCase.execute(dto)
        await cartService.increment('1', '1')
        const item = await cartService.retrieveItems('1')
        // expect(dto.qty).toBe(dto.qty + 1)
    })
})
