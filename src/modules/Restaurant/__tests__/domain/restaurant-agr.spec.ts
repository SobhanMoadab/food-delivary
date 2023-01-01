import { DomainEvents } from "../../../../shared/domain/events/DomainEvents"
import { Food } from "../../domain/food"
import { Restaurant } from "../../domain/restaurant"


describe('Restaurant AR', () => {

    let restaurant: Restaurant
    let food: Food

    beforeEach(() => {
        restaurant = Restaurant.create({
            city: 'ss',
            name: 'ss',
            ownerName: 'ss',
            ownerSurname: 'ss',
            phoneNumber: 333,
        }).getValue()

        food = Food.create({
            fee: 33,
            name: 'test',
            recipe: 'test',
            restaurantId: restaurant.restaurantId,
            discountedFee: 22
        }).getValue()
    })

    it('should store event', () => {
        // restaurant.addFood(food)
        // const events = restaurant.domainEvents
        // expect(events).toContain()
    })
})