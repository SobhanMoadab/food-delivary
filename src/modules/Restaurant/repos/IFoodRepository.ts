import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Food } from "../domain/food";


export interface IFoodRepository {
    save(food: Food): Promise<void>
    findById(id: string): Promise<Food>
    saveBulk(foods: Food[]): Promise<void>
    getFoodsByRestaurantId(id: string): Promise<Food[]>
    // list
    // by id
}