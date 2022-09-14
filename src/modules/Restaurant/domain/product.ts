import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Category } from "./category";


export interface ProductProps {
    id?: string,
    name: string,
    fee: number,
    recipe: string,
    discountedFee: number
    category: string
}

export class Product extends Entity<ProductProps> {

    constructor(props: ProductProps, id?: UniqueEntityID) {
        super(props)
    }

    get name(): string {
        return this.props.name
    }
    get recipe(): string {
        return this.props.recipe

    }
    get discountedFee(): number {
        return this.props.discountedFee

    }
    get fee(): number {
        return this.props.fee

    }
    get category(): string {
        return this.props.category

    }

    public static create(props: ProductProps): Result<Product> {
        const nullGuard = Guard.againstNullOrUndefinedBulk([
            { argument: props.name, argumentName: 'name' },
            { argument: props.discountedFee, argumentName: 'discountedFee' },
            { argument: props.fee, argumentName: 'fee' },
            { argument: props.recipe, argumentName: 'recipe' },
        ])
        if (!Guard.isObjectId(props.category)) {
            return Result.fail<Product>('category is not objectId')
        }

        if (nullGuard.isFailure) {
            return Result.fail<Product>(nullGuard.getErrorValue())
        } else {
            const newProduct = new Product(props)
            return Result.ok<Product>(newProduct)
        }
    }


}