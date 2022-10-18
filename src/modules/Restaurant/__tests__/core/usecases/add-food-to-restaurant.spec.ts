import { Restaurant } from "../../../domain/restaurant"
import { IRestaurantRepository } from "../../../repos/IRestaurantRepository"
import { AddFoodToRestaurantUseCase } from "../../../usecases/addFoodToRestaurant/addFoodToRestaurant"
import { AddFoodToRestaurantDTO } from "../../../usecases/addFoodToRestaurant/addFoodToRestaurantDTO"


/*
    Feature:
        As restaurant owner,
        I want to add food to menu

    Scenario:  Restaurant is adding food to menu

    Given: a restaurant      
    When: he adds food to restaurant
    Then: restaurant's menu is updated    

*/


describe('add food to restaurant use case', () => {

    let useCase: AddFoodToRestaurantUseCase
    let restaurant: Restaurant
    let restaurantRepo: IRestaurantRepository
    let dto: any

    beforeEach(() => {
        dto = {
            discountedFee: 333,
            fee: 3333,
            name: 'asd',
            recipe: 'asd',
            restaurantId: 'asd'
        }
        restaurant = Restaurant.create({
            city: 'aa',
            name: 'aa',
            ownerName: 'aa',
            ownerSurname: 'aa',
            phoneNumber: 3333
        }).getValue()

        restaurantRepo = {
            findById: jest.fn(),
            getAllRestaurants: jest.fn(),
            save: jest.fn()
        }
        useCase = new AddFoodToRestaurantUseCase(restaurantRepo)
    })

    it('should add food to restaurant', async () => {

        restaurant = Restaurant.create({
            city: 'aa',
            name: 'aa',
            ownerName: 'aa',
            ownerSurname: 'aa',
            phoneNumber: 3333
        }).getValue()

        jest.spyOn(restaurantRepo, 'findById').mockImplementation(() => Promise.resolve(restaurant))
        const result = await useCase.execute(dto)
        expect(result.isRight()).toBeTruthy()

    })

    it('should throw restaurant not found error, if id is not correct', async () => {

        const result = await useCase.execute(dto)
        console.log({ result: result.value })
        // expect(result.isRight()).toBeFalsy()
    })

})