/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectId } from "mongodb";
import { Order } from "../domain/Order";

export class OrderMapper {
    public static toDomain(raw: any): Order {

        const orderOrError = Order.create({
            foodsPrice: raw._doc.foodsPrice,
            product: raw._doc.product,
            restaurant: raw._doc.restaurant,
            status: raw._doc.restaurant,
            id: raw._doc._id
        })
        return orderOrError.isSuccess ? orderOrError.getValue() : orderOrError.getErrorValue()
    }

    public static toPersistence({ props }: Order): any {
        return {
            foodsPrice: props.foodsPrice,
            product: props.product.props,
            status: props.status,
            restaurant: props.restaurant.props,
            id: new ObjectId()
        }
    }
}   