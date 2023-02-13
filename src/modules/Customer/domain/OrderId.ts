import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";


export class OrderId extends Entity<any> {
    
    get id(): UniqueEntityID {
        return this._id
    }
    private constructor(id?: UniqueEntityID) {
        super(null, id)
    }

    public static create(id?: UniqueEntityID): Result<OrderId> {
        return Result.ok<OrderId>(new OrderId(id));
    }
}