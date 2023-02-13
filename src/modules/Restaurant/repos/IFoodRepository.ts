
import { Food } from "../domain/food";
import { FoodId } from "../domain/foodId";
import { FoodDTO } from "../dto/FoodDTO";


export interface IFoodRepository {
    save(food: Food): Promise<void>
    findById(id: string): Promise<Food>
    saveBulk(foods: Food[]): Promise<void>
    getFoodsByRestaurantId(id: string): Promise<FoodDTO[]>
    exists(foodId: FoodId): Promise<boolean>
    // list
    // by id
}