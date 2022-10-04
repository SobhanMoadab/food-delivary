import { ObjectId } from "mongodb";
import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Category } from "./category";


export interface ProductProps {
    _id?: string
    name: string,
    fee: number,
    recipe: string,
    discountedFee?: number
    category: string
}

export class Product extends Entity<ProductProps> {

    constructor(props: ProductProps) {
        super(props)
    }
    get id(): string | undefined {
        return this.props._id
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
    get category(): string {
        return this.props.category

    }

    public static create(props: ProductProps): Result<Product> {
        const nullGuard = Guard.againstNullOrUndefinedBulk([
            { argument: props.name, argumentName: 'name' },
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