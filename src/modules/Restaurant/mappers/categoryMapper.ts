import { Category } from "../domain/category";
import { Product } from "../domain/product";

export class CategoryMapper {
    public static toDomain(raw: any): Category {

        const categoryOrError = Category.create({
            name: raw._doc.name,
            products: raw.products
        })
        return categoryOrError.isSuccess ? categoryOrError.getValue() : categoryOrError.getErrorValue()
    }
}   