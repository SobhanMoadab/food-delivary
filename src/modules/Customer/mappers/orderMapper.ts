/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectId } from "mongodb";
import { Order } from "../domain/Order";

export class OrderMapper {
    public static toDomain(raw: any): Order {

        const orderOrError = Order.create({
            foodsPrice: raw._doc.foodsPrice,
            restaurantId: raw._doc.restaurantId,
            status: raw._doc.restaurant,
            id: raw._doc._id
        })
        return orderOrError.isSuccess ? orderOrError.getValue() : orderOrError.getErrorValue()
    }

    public static toPersistence({ props }: Order): any {
        return {
            foodsPrice: props.foodsPrice,
            status: props.status,
            restaurant: props.restaurantId,
            id: new ObjectId()
        }
    }
}   