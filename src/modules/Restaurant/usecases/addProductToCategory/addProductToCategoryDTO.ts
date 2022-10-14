import { Category } from "../../domain/category"


export interface AddProductToRestaurantDTO {
    name: string,
    fee: number,
    recipe: string,
    discountedFee: number
    categoryId: string
}