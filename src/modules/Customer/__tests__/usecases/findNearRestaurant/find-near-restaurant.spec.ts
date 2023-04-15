import { FindNearRestaurant } from "../../../usecases/findNearRestaurant/FindNearRestaurant"


describe('Find near restaurant useCase', () => {
    let useCase: FindNearRestaurant

    beforeEach(()=> {
        useCase = new FindNearRestaurant()
    })
    it('should exists', () => {
       expect(useCase).toBeDefined()
    })
})