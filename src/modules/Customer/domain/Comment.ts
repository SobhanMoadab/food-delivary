import { ObjectId } from "mongodb"
import { Guard } from "../../../shared/core/Guard"
import { Result } from "../../../shared/core/Result"
import { Entity } from "../../../shared/domain/Entity"
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID"
import { CommentId } from "./CommentId"
import { CustomerId } from "./CustomerId"
import { OrderId } from "./OrderId"

export interface CommentProps {
    customerId: CustomerId
    title: string
    body: string
    orderId: OrderId
}

export class Comment extends Entity<CommentProps> {
    constructor(props: CommentProps, id?: UniqueEntityID) {
        super(props, id)
    }
    get commentId(): CommentId {
        return CommentId.create(this._id).getValue()
    }
    static create(props: CommentProps, id?: UniqueEntityID) {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.title, argumentName: 'title' },
            { argument: props.customerId.id.toString(), argumentName: 'customerId' },
            { argument: props.orderId.id.toString(), argumentName: 'orderId' },
            { argument: props.body, argumentName: 'body' },
        ])
        if (guardResult.isFailure) {
            return Result.fail<Comment>(guardResult.getErrorValue())
        }
        const comment = new Comment({
            body: props.body,
            customerId: props.customerId,
            title: props.title,
            orderId: props.orderId
        }, id)
        return Result.ok(comment)
    }

}