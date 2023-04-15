import { FindNearRestaurant } from "../../../usecases/findNearRestaurant/FindNearRestaurant"
import { FindNearRestaurantDTO } from "../../../usecases/findNearRestaurant/FindNearRestaurantDTO"


describe('Find near restaurant useCase', () => {
    let useCase: FindNearRestaurant

    beforeEach(() => {
        useCase = new FindNearRestaurant()
    })

    it('should exists', () => {
        expect(useCase).toBeDefined()
    })

    it('should return list of restaurants', async () => {
        const dto: FindNearRestaurantDTO = {
            city: 'rasht'
        }

        const result = await useCase.execute(dto)
        expect(result.isLeft()).toBeFalsy()
    })
})