/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectId } from "mongodb";
import { Order } from "../domain/Order";

export class OrderMapper {
    public static toDomain(raw: any): Order {
        const orderOrError = Order.create({
            foodsPrice: raw.foodsPrice,
            restaurantId: raw.restaurantId,
            status: raw.restaurant,
            customerId: raw.customerId,
        }, raw._id)
        return orderOrError.isSuccess ? orderOrError.getValue() : orderOrError.getErrorValue()
    }

    public static toPersistence({ props }: Order): any {
        return {
            foodsPrice: props.foodsPrice,
            status: props.status ?? 'PENDING',
            restaurantId: props.restaurantId,
            customerId: props.customerId
        }
    }
}   