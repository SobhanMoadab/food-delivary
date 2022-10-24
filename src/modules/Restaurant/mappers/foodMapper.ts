import { Food } from "../domain/food"
import { FoodDTO } from "../dto/FoodDTO"


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

    public static toDTO(food: any): FoodDTO {
        return {
            discountedFee: food.discountedFee,
            fee: food.fee,
            name: food.name,
            recipe: food.recipe
        }
    }

}