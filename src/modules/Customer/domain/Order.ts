import { ObjectId } from "mongodb";
import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { Food } from "../../Restaurant/domain/food";
import { Foods } from "../../Restaurant/domain/foods";
import { Restaurant } from "../../Restaurant/domain/restaurant";
import { RestaurantId } from "../../Restaurant/domain/RestaurantId";
import { Comment } from "./Comment";
import { Comments } from "./Comments";



export interface OrderProps {
    id?: ObjectId | string
    restaurantId: RestaurantId,
    foodsPrice: number
    status: string
    foods?: Foods
    comments?: Comments
}

export class Order extends Entity<OrderProps> {

    constructor(props: OrderProps) {
        super(props)
    }
    get comments(): Comments {
        return this.props.comments ?? Comments.create()
    }
    static create(props: OrderProps): Result<Order> {
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
            id: props.id ?? new ObjectId()
        })
        return Result.ok<Order>(newOrder)
    }
    public addComment(comment: Comment) {
        if (!this.props.comments) {
            this.props.comments = Comments.create()
        }
        this.props.comments.add(comment)
    }
}