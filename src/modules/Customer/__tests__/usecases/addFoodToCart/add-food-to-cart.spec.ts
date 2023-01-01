import { Food } from "../../../../Restaurant/domain/food"
import { RestaurantId } from "../../../../Restaurant/domain/RestaurantId"
import { IFoodRepository } from "../../../../Restaurant/repos/IFoodRepository"
import { Food404 } from "../../../../Restaurant/usecases/addFoodToRestaurant/addFoodToRestaurantErrors"
import { ICartService } from "../../../services/cartService"
import { AddFoodToCart } from "../../../usecases/addFoodToCart/AddFoodToCart"
import { AddFoodToCartDTO } from "../../../usecases/addFoodToCart/AddFoodToCartDTO"
import { CartIsEmpty } from "../../../usecases/submitOrder/SubmitOrderErrors"

describe('Add food to cart', () => {

    let dto: AddFoodToCartDTO
    let useCase: AddFoodToCart
    let foodRepo: IFoodRepository
    let cartService: ICartService
    let food: Food

    beforeEach(() => {
        food = Food.create({
            fee: 333,
            name: 'sss',
            recipe: 'ssss',
            restaurantId: RestaurantId.create().getValue(),
            discountedFee: 3333
        }).getValue()
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
            increment: jest.fn(),
            emptyCart: jest.fn()
        }
        useCase = new AddFoodToCart(foodRepo, cartService)
    })

    it('should throw error if foodId does not exist', async () => {
        foodRepo.findById = jest.fn(() => Promise.reject())
        const result = await useCase.execute(dto)
        expect(result.value.isFailure).toBeTruthy()
        expect(result.value).toBeInstanceOf(Food404)
    })


    it('should add food to cart', async () => {
        jest.spyOn(foodRepo, 'findById').mockImplementation(() => Promise.resolve(food))
        const result = await useCase.execute(dto)
        expect(result.value.isFailure).toBeFalsy()


    })

})
