import { Product } from "../domain/product";


export interface IProductRepository {
    save(product: Product): Promise<void>
    findById(id: string): Promise<Product>
    // list
    // by id
}