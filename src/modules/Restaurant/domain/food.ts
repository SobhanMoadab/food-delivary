import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { CategoryId } from "./categoryId";
import { FoodId } from "./foodId";


export interface FoodProps {
    name: string,
    fee: number,
    recipe: string,
    discountedFee?: number
    categoryId: CategoryId,
    
}

export class Food extends Entity<FoodProps> {

    constructor(props: FoodProps) {
        super(props)
    }
    get foodId(): FoodId {
        return FoodId.create(this._id).getValue()
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

    public static create(props: FoodProps): Result<Food> {
        const nullGuard = Guard.againstNullOrUndefinedBulk([
            { argument: props.name, argumentName: 'name' },
            { argument: props.fee, argumentName: 'fee' },
            { argument: props.recipe, argumentName: 'recipe' },
            { argument: props.categoryId, argumentName: 'categoryId' }
        ])

        if (nullGuard.isFailure) {
            return Result.fail<Food>(nullGuard.getErrorValue())
        } else {
            const newFood = new Food(props)
            return Result.ok<Food>(newFood)
        }
    }


}