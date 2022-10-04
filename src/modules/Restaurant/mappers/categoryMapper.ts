import { Category } from "../domain/category";

export class CategoryMapper {
    public static toDomain(raw: any): Category {

        const categoryOrError = Category.create({
            name: raw._doc.name,
            products: raw.products
        })
        return categoryOrError.isSuccess ? categoryOrError.getValue() : categoryOrError.getErrorValue()
    }

    public static toPersistence(category: Category): any {
        return {
            name: category.name,
            products: category.products
        }
    }
}   