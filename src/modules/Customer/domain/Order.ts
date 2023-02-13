import { ObjectId } from "mongodb";
import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Food } from "../../Restaurant/domain/food";
import { Foods } from "../../Restaurant/domain/foods";
import { Restaurant } from "../../Restaurant/domain/restaurant";
import { RestaurantId } from "../../Restaurant/domain/RestaurantId";
import { Comment } from "./Comment";
import { Comments } from "./Comments";
import { CustomerId } from "./CustomerId";



export interface OrderProps {
    customerId: CustomerId
    restaurantId: RestaurantId,
    foodsPrice: number
    status: string
    foods?: Foods
    comments?: Comments
}

export class Order extends Entity<OrderProps> {

    constructor(props: OrderProps, id?: UniqueEntityID) {
        super(props, id)
    }
    get comments(): Comments {
        return this.props.comments ?? Comments.create()
    }

    static create(props: OrderProps, id?: UniqueEntityID): Result<Order> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            // { argument: props.customer, argumentName: 'customer' },
            { argument: props.foodsPrice, argumentName: 'foodsPrice' },
            { argument: props.restaurantId, argumentName: 'restaurantId' },
        ])
        if (guardResult.isFailure) {
            return Result.fail<Order>(guardResult.getErrorValue())
        }
        const newOrder = new Order({
            foodsPrice: props.foodsPrice,
            restaurantId: props.restaurantId,
            status: props.status,
            customerId: props.customerId
        }, id)
        return Result.ok<Order>(newOrder)
    }
    public addComment(comment: Comment) {
        if (!this.props.comments) {
            this.props.comments = Comments.create()
        }
        this.props.comments.add(comment)
    }
}