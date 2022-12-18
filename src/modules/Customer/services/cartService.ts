import { AddFoodToCartDTO } from "../usecases/addFoodToCart/AddFoodToCartDTO"
export interface ICartService {
    retrieveItems(userId: string): Promise<AddFoodToCartDTO>
    increment(): Promise<void>
    decrement(): Promise<void>
} 