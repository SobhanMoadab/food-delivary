import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Food } from "../domain/food";
import { FoodDTO } from "../dto/FoodDTO";


export interface IFoodRepository {
    save(food: Food): Promise<void>
    findById(id: string): Promise<Food>
    saveBulk(foods: Food[]): Promise<void>
    getFoodsByRestaurantId(id: string): Promise<FoodDTO[]>
    // list
    // by id
}