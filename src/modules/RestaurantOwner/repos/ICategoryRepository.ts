import { Category } from "../domain/category";


export interface ICategoryRepository {
    save(category: Category): Promise<void>
    findById(id: string): Promise<Category>
    // list
    // by id
}