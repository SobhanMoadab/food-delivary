import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Product } from "../domain/food";


export interface IProductRepository {
    save(product: Product): Promise<void>
    findById(id: string): Promise<Product>
    saveBulk(products: Product[]): Promise<void>
    getProductsByRestaurantId(id: string): Promise<Product[]>
    // list
    // by id
}