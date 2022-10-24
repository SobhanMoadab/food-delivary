import { UnexpectedError } from "../../../../../shared/core/AppError"
import { Food } from "../../../domain/food"
import { Foods } from "../../../domain/foods"
import { RestaurantId } from "../../../domain/RestaurantId"
import { IFoodRepository } from "../../../repos/IFoodRepository"
import { GetFoodsOfRestaurant } from "../../../usecases/getFoodsOfRestaurant/GetFoodsOfRestaurant"


describe('Get foods by restaurantId', () => {

    let foodRepo: IFoodRepository
    const food: Food = Food.create({
        fee: 111,
        name: 'a',
        recipe: 'a',
        restaurantId: RestaurantId.create().getValue(),
        discountedFee: 222
    }).getValue()

    const foods: Foods = Foods.create()
    foods.add(food)

    beforeEach(() => {
        foodRepo = {
            findById: jest.fn(),
            getFoodsByRestaurantId: jest.fn(),
            save: jest.fn(),
            saveBulk: jest.fn()
        }
    })

    it('should throw error if restaurantId is incorrect', async () => {

        jest.spyOn(foodRepo, 'getFoodsByRestaurantId').mockImplementation(() => Promise.reject())
        const useCase = new GetFoodsOfRestaurant(foodRepo)
        const result = await useCase.execute({ restaurantId: 'a' })
        const value = result.value

        expect(result.isRight()).toBeFalsy()
        expect(value).toBeInstanceOf(UnexpectedError)

    })

    it('should return array of food', async () => {

        jest.spyOn(foodRepo, 'getFoodsByRestaurantId').mockImplementation(() => Promise.resolve(foods.getItems()))
        const useCase = new GetFoodsOfRestaurant(foodRepo)
        const result = await useCase.execute({ restaurantId: 'a' })
        const value = result.value.getValue() as Food[]
        expect(result.isRight()).toBeTruthy()
        expect(value).toContainEqual(food)
    })


})