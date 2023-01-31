import { ObjectId } from "mongodb"
import { Guard } from "../../../shared/core/Guard"
import { Result } from "../../../shared/core/Result"
import { Entity } from "../../../shared/domain/Entity"
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID"
import { CustomerId } from "./CustomerId"

export interface CommentProps {
    id?: ObjectId | string
    customerId: CustomerId
    title: string
    body: string
}

export class Comment extends Entity<CommentProps> {
    constructor(props: CommentProps) {
        super(props)
    }
    static create(props: CommentProps, id?: UniqueEntityID) {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.title, argumentName: 'title' },
            { argument: props.customerId, argumentName: 'customerId' },
            { argument: props.body, argumentName: 'body' },
        ])
        if (guardResult.isFailure) {
            return Result.fail<Comment>(guardResult.getErrorValue())
        }
        const comment = new Comment({
            body: props.body,
            customerId: props.customerId,
            title: props.title,
            id: props.id ?? new ObjectId()
        })
        return Result.ok(comment)
    }
    
}