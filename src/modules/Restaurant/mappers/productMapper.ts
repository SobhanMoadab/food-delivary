import { Product } from "../domain/product"


export class ProductMapper {
    public static toDomain(raw: any): Product {
        const productOrError = Product.create({
            name: raw._doc.name,
            categoryId: raw._doc.categoryId,
            fee: raw._doc.fee,
            recipe: raw._doc.recipe,
            discountedFee: raw._doc.discountedFee,
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