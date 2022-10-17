import { ICategoryRepository } from "../../../repos/ICategoryRepository"
import { IRestaurantRepository } from "../../../repos/IRestaurantRepository"
import { GetCategoriesOfRestaurant } from "../../../usecases/getCategoriesOfRestaurant/GetCategoriesOfRestaurant"
import { GetCategoriesOfRestaurantDTO } from "../../../usecases/getCategoriesOfRestaurant/GetCategoriesOfRestaurantDTO"
import { Restaurant404 } from "../../../usecases/registerRestaurant/RegisterRestaurantErrors"


describe('Get categories by restaurantId', () => {

    let useCase: GetCategoriesOfRestaurant

    // beforeEach(() => {
    //     categoryRepo = {
    //         findById: jest.fn(),
    //         save: jest.fn(),
    //     }
    //     useCase = new GetCategoriesOfRestaurant(categoryRepo)
    // })

    it('should throw restaurant not found exception if restaurantId is incorrect', async () => {

        const restaurantRepo: IRestaurantRepository = {

            findById: jest.fn().mockImplementation(() => {
                throw new Restaurant404()
            }),
            save: jest.fn(),
            getAllRestaurants: jest.fn(),
        }
        const useCase = new GetCategoriesOfRestaurant(restaurantRepo)
        const dto: GetCategoriesOfRestaurantDTO = {
            restaurantId: 'wrong'
        }
        const result = await useCase.execute(dto)
        const error = result.value

        expect(result.isLeft()).toBeTruthy()
        expect(error).toBeInstanceOf(Restaurant404)

    })

   
})