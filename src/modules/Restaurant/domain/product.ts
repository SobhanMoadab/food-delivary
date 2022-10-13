import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { Entity } from "../../../shared/domain/Entity";
import { Category } from "./category";
import { CategoryId } from "./categoryId";
import { ProductId } from "./productId";


export interface ProductProps {
    name: string,
    fee: number,
    recipe: string,
    discountedFee?: number
    categoryId: CategoryId
}

export class Product extends Entity<ProductProps> {

    constructor(props: ProductProps) {
        super(props)
    }
    get productId(): ProductId {
        return ProductId.create(this._id).getValue()
    }
    get name(): string {
        return this.props.name
    }
    get recipe(): string {
        return this.props.recipe

    }
    get discountedFee(): number | null {
        return this.props.discountedFee ?? null

    }
    get fee(): number {
        return this.props.fee

    }
    get categoryId(): CategoryId {
        return this.props.categoryId

    }

    public static create(props: ProductProps): Result<Product> {
        const nullGuard = Guard.againstNullOrUndefinedBulk([
            { argument: props.name, argumentName: 'name' },
            { argument: props.fee, argumentName: 'fee' },
            { argument: props.recipe, argumentName: 'recipe' },
            { argument: props.categoryId, argumentName: 'categoryId' },
        ])

        if (nullGuard.isFailure) {
            return Result.fail<Product>(nullGuard.getErrorValue())
        } else {
            const newProduct = new Product(props)
            return Result.ok<Product>(newProduct)
        }
    }


}