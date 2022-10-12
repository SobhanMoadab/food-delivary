import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";


export class RestaurantId extends Entity<any> {
    get id(): UniqueEntityID {
        return this.id
    }
    private constructor(id?: UniqueEntityID) {
        super(null, id)
    }

    public static create(id?: UniqueEntityID): Result<RestaurantId> {
        return Result.ok<RestaurantId>(new RestaurantId(id));
    }
}