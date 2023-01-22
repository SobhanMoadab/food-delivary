/* eslint-disable @typescript-eslint/no-explicit-any */
import { Restaurant } from "../domain/restaurant"


export class RestaurantMapper {

    public static toDomain(raw: any): Restaurant {
        const restaurantOrError = Restaurant.create({
            name: raw.name,
            city: raw.city,
            ownerName: raw.ownerName,
            ownerSurname: raw.ownerSurname,
            phoneNumber: raw.phoneNumber,
        })
        console.log({ 1111: restaurantOrError.getValue()})
        return restaurantOrError.isSuccess ? restaurantOrError.getValue() : restaurantOrError.getErrorValue()
    }
    public static toPersistence(restaurant: Restaurant): any {
        return {
            name: restaurant.props.name,
            ownerName: restaurant.props.ownerName,
            ownerSurname: restaurant.props.ownerSurname,
            city: restaurant.props.city,
            phoneNumber: restaurant.props.phoneNumber
        }
    }
}