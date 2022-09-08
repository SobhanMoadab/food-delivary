import { Guard } from "../../../../shared/core/Guard";
import { Result } from "../../../../shared/core/Result";
import { Entity } from "../../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { Category } from "../Category/Category";


interface ProductProps {
    id?: string,
    name: string,
    fee: number,
    recipe: string,
    discountedFee: number
    category: Category
}

export class Product extends Entity<ProductProps> {

    constructor(props: ProductProps, id?: UniqueEntityID) {
        super(props)
    }

    get name(): string {
        return this.props.name
    }

    public static create(props: ProductProps): Result<Product> {
        const nullGuard = Guard.againstNullOrUndefinedBulk([
            { argument: props.name, argumentName: 'name' },
            { argument: props.discountedFee, argumentName: 'discountedFee' },
            { argument: props.category, argumentName: 'category' },
            { argument: props.fee, argumentName: 'fee' },
            { argument: props.recipe, argumentName: 'recipe' },
        ])

        if (nullGuard.isFailure) {
            return Result.fail<Product>(nullGuard.getErrorValue())
        } else {
            const newProduct = new Product(props)
            return Result.ok<Product>(newProduct)
        }
    }


}