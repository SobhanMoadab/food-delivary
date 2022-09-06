import { Category } from "../domain/Category/Category";


export interface ICategoryRepository {
    save(category: Category): Promise<void>
    // exists
    // list
    // by id
}