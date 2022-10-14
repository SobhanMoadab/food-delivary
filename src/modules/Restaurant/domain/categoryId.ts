import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";


export class CategoryId extends Entity<any> {
    get id(): UniqueEntityID {
        return this._id
    }
    private constructor(id?: UniqueEntityID) {
        super(null, id)
    }

    public static create(id?: UniqueEntityID): Result<CategoryId> {
        return Result.ok<CategoryId>(new CategoryId(id));
    }
}