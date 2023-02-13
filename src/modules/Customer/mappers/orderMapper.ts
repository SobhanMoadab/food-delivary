/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectId } from "mongodb";
import { Order } from "../domain/Order";

export class OrderMapper {
    public static toDomain(raw: any): Order {
        console.log({ raw });
        const orderOrError = Order.create({
            foodsPrice: raw._doc.foodsPrice,
            restaurantId: raw._doc.restaurantId,
            status: raw._doc.restaurant,
            customerId: raw._doc.customerId,
        }, raw._doc.id)
        return orderOrError.isSuccess ? orderOrError.getValue() : orderOrError.getErrorValue()
    }

    public static toPersistence({ props }: Order): any {
        return {
            foodsPrice: props.foodsPrice,
            status: props.status,
            restaurant: props.restaurantId,
        }
    }
}   