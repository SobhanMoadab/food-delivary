import { AddFoodToCartDTO } from "../usecases/addFoodToCart/AddFoodToCartDTO"
export interface ICartService {
    retrieveItems(userId: string): Promise<any>
    increment(userId: string, foodId: string): Promise<void>
    decrement(userId: string, foodId: string): Promise<void>
} 