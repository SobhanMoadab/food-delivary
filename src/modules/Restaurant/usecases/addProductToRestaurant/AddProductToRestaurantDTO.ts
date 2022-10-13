import { Category } from "../../domain/category"


export interface AddProductToRestaurantUseCaseDTO {
    name: string,
    fee: number,
    recipe: string,
    discountedFee: number
    categoryId: string
    restaurantId: string
}