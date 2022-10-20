import { Food } from "../domain/food"


export class FoodMapper {
    public static toDomain(raw: any): Food {
        const foodOrError = Food.create({
            name: raw.name,
            fee: raw.fee,
            recipe: raw.recipe,
            discountedFee: raw.discountedFee,
            restaurantId: raw.restaurantId
        })

        return foodOrError.isSuccess ? foodOrError.getValue() : foodOrError.getErrorValue()
    }

    public static toPersistence(food: Food): any {
        return {
            name: food.props.name,
            recipe: food.props.recipe,
            fee: food.props.fee,
            discountedFee: food.props.discountedFee,
            restaurantId: food.props.restaurantId
        }
    }

}