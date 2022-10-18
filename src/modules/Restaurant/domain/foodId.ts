import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Food } from "./food";


export class FoodId extends Entity<any> {
    get id(): UniqueEntityID {
        return this._id
    }
    private constructor(id?: UniqueEntityID) {
        super(null, id)
    }

    public static create(id?: UniqueEntityID): Result<FoodId> {
        return Result.ok<FoodId>(new FoodId(id));
    }
}