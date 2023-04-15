import { RestaurantRepository } from "../../../../Restaurant/repos/impl/restaurantImpl"
import { IRestaurantRepository } from "../../../../Restaurant/repos/IRestaurantRepository"
import { FindNearRestaurant } from "../../../usecases/findNearRestaurant/FindNearRestaurant"
import { FindNearRestaurantDTO, NearRestaurantsDTO } from "../../../usecases/findNearRestaurant/FindNearRestaurantDTO"


describe('Find near restaurant useCase', () => {
    let useCase: FindNearRestaurant
    let restaurantRepo: IRestaurantRepository

    beforeEach(() => {
        restaurantRepo = {
            findById: jest.fn(),
            getAllRestaurants: jest.fn(),
            save: jest.fn(),
            getRestaurantsByCity: jest.fn()
        }
        useCase = new FindNearRestaurant(restaurantRepo)

    })

    it('should exists', () => {
        expect(useCase).toBeDefined()
    })

    it('should return list of restaurants', async () => {
        const dto: FindNearRestaurantDTO = {
            city: 'rasht'
        }
        jest.spyOn(restaurantRepo, 'getRestaurantsByCity').mockResolvedValue([{
            name: 'test',
            rating: 444
        }])

        const result = await useCase.execute(dto)

        expect(result.isLeft()).toBeFalsy()
        const value = result.value.getValue()
        expect(value).toEqual(
            expect.arrayContaining(
                [
                    {
                        name: 'test',
                        rating: 444
                    }
                ]
            )
        )
    })
})