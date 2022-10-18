import { Category } from "../domain/category";

export class CategoryMapper {
    public static toDomain(raw: any): Category {
        const categoryOrError = Category.create({
            name: raw.name,
            // products: raw.products,
            restaurantId: raw.restaurantId
        }, raw._id)
        return categoryOrError.isSuccess ? categoryOrError.getValue() : categoryOrError.getErrorValue()
    }

    public static toPersistence(category: Category): any {
        return {
            name: category.name,
            restaurantId: category.restaurantId
        }
    }
}   