/* eslint-disable @typescript-eslint/no-explicit-any */
import { Restaurant } from "../domain/restaurant"


export class RestaurantMapper {
    public static toDomain(raw: any): Restaurant {
        const restaurantOrError = Restaurant.create({
            name: raw._doc.name,
            city: raw._doc.city,
            ownerName: raw._doc.ownerName,
            ownerSurname: raw._doc.ownerSurname,
            phoneNumber: raw._doc.phoneNumber,
            categories: raw._doc.categories ?? [],
            product: raw._doc.product,
            id: raw._doc._id
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