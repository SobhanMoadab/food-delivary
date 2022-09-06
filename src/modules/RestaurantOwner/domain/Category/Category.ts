import { Guard } from "../../../../shared/core/Guard";
import { Result } from "../../../../shared/core/Result";
import { Entity } from "../../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { Product } from "../Product/Product";


interface CategoryProps {
    id?: string
    name: string
    products?: Product[]
}

export class Category extends Entity<CategoryProps> {

    constructor(props: CategoryProps, id?: UniqueEntityID) {
        super(props)
    }

    get name(): string {
        return this.props.name
    }

    public static create(props: CategoryProps): Result<Category> {
        const nullGuard = Guard.againstNullOrUndefined(props.name, 'Name')

        if (nullGuard.isFailure) {
            return Result.fail<Category>(nullGuard.getErrorValue())
        } else {
            const newCategory = new Category(props)
            return Result.ok<Category>(newCategory)
        }
    }
}