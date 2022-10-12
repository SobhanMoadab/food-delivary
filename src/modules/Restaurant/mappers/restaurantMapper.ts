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
            categories: raw.categories ?? [],
            products: raw.products ?? [],
            id: raw._id
        })
        return restaurantOrError.isSuccess ? restaurantOrError.getValue() : restaurantOrError.getErrorValue()
    }
    public static toPersistence(restaurant: Restaurant): any {
        return {
            name: restaurant.props.name,
            ownerName: restaurant.props.ownerName,
            ownerSurname: restaurant.props.ownerSurname,
            city: restaurant.props.city,
            categories: restaurant.props.categories,
        }
    }
}