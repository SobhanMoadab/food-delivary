import { Category } from "../domain/category";


export interface ICategoryRepository {
    save(category: Category): Promise<void>
    getCategoriesOfRestaurant(restaurantId: string): Promise<Category[]>
    findById(id: string): Promise<Category>
    // list
    // by id
}