import { Category } from "../../domain/category"


export interface AddFoodToRestaurantDTO {
    name: string,
    fee: number,
    recipe: string,
    discountedFee: number
    restaurantId: string
}