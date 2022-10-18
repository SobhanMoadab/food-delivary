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
    public static toPersistence(product: Food): any {
        return {
            name: product.props.name,
            recipe: product.props.recipe,
            fee: product.props.fee,
            discountedFee: product.props.discountedFee,
        }
    }
}