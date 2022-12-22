import { AddFoodToCartDTO } from "../usecases/addFoodToCart/AddFoodToCartDTO"
export interface ICartService {
    getCartItems(userId: string): Promise<any>
    increment(userId: string, foodId: string): Promise<void>
    decrement(userId: string, foodId: string): Promise<void>
} 