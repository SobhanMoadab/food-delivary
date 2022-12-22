import { IFoodRepository } from "../../../Restaurant/repos/IFoodRepository"
import { Food404 } from "../../../Restaurant/usecases/addFoodToRestaurant/addFoodToRestaurantErrors"
import { ICartService } from "../../services/cartService"
import { AddFoodToCart } from "../../usecases/addFoodToCart/AddFoodToCart"
import { AddFoodToCartDTO } from "../../usecases/addFoodToCart/AddFoodToCartDTO"
import { CartIsEmpty } from "../../usecases/submitOrder/SubmitOrderErrors"

describe('Add food to cart', () => {

    let dto: AddFoodToCartDTO
    let useCase: AddFoodToCart
    let foodRepo: IFoodRepository
    let cartService: ICartService

    beforeEach(() => {
        dto = {
            foodId: 'foodId',
            userId: 'userId'
        }
        foodRepo = {
            findById: jest.fn(),
            getFoodsByRestaurantId: jest.fn(),
            save: jest.fn(),
            saveBulk: jest.fn()
        }
        cartService = {
            decrement: jest.fn(),
            getCartItems: jest.fn(),
            increment: jest.fn()
        }
        useCase = new AddFoodToCart(foodRepo, cartService)
    })

    it('should throw error if foodId does not exist', async () => {
        foodRepo.findById = jest.fn(() => Promise.reject())
        const result = await useCase.execute(dto)
        expect(result.value.isFailure).toBeTruthy()
        expect(result.value).toBeInstanceOf(Food404)
    })

    it('should throw error if cart is empty', async () => {
        cartService.getCartItems = jest.fn(() => Promise.reject())
        const result = await useCase.execute(dto)
        expect(result.value.isFailure).toBeTruthy()
        expect(result.value).toBeInstanceOf(CartIsEmpty)
    })
    // it('should add food to cart', async () => {
    //     const result = await useCase.execute(dto)
    // })

})
