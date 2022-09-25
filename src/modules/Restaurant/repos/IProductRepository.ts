import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Product } from "../domain/product";


export interface IProductRepository {
    save(product: Product): Promise<void>
    // findById(id: UniqueEntityID): Promise<Product>
    // list
    // by id
}