import { ObjectId } from "mongodb";
import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { Product } from "../../Restaurant/domain/product";
import { Restaurant } from "../../Restaurant/domain/restaurant";



export interface OrderProps {
    id?: ObjectId | string
    product: Product,
    // customer: Customer,
    restaurant: Restaurant,
    foodsPrice: number
    status: string
}

export class Order extends Entity<OrderProps> {

    constructor(props: OrderProps) {
        super(props)
    }
    static create(props: OrderProps): Result<Order> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            // { argument: props.customer, argumentName: 'customer' },
            { argument: props.foodsPrice, argumentName: 'foodsPrice' },
            { argument: props.product, argumentName: 'product' },
            { argument: props.restaurant, argumentName: 'restaurant' },
        ])
        if (guardResult.isFailure) {
            return Result.fail<Order>(guardResult.getErrorValue())
        }
        const newOrder = new Order({
            foodsPrice: props.foodsPrice,
            product: props.product,
            restaurant: props.restaurant,
            status: props.status,
            id: props.id ?? new ObjectId()
        })
        return Result.ok<Order>(newOrder)
    }
}