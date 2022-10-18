import { Product } from "../domain/food"


export class ProductMapper {
    public static toDomain(raw: any): Product {
        const productOrError = Product.create({
            name: raw.name,
            categoryId: raw.categoryId,
            fee: raw.fee,
            recipe: raw.recipe,
            discountedFee: raw.discountedFee,
            restaurantId: raw.restaurantId
        })

        return productOrError.isSuccess ? productOrError.getValue() : productOrError.getErrorValue()
    }
    public static toPersistence(product: Product): any {
        return {
            name: product.props.name,
            categoryId: product.props.categoryId,
            recipe: product.props.recipe,
            fee: product.props.fee,
            discountedFee: product.props.discountedFee,
        }
    }
}