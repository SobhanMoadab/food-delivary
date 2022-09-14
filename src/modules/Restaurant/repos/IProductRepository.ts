import { Product } from "../domain/product";


export interface IProductRepository {
    save(product: Product): Promise<void>
    // exists
    // list
    // by id
}