import { Product } from "../domain/Product/Product";


export interface IProductRepository {
    save(product: Product): Promise<void>
    // exists
    // list
    // by id
}