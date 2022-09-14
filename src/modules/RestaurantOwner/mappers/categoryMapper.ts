import { Category } from "../domain/category";
import { Product } from "../domain/product";

export class CategoryMapper {
    public static toDomain(raw: any): Category {

        const products: Product[] = raw.products

        const categoryOrError = Category.create({
            name: raw.name,
            products
        })
        return categoryOrError.getValue()
    }
}   