import { Product } from "../domain/product"


export class ProductMapper {
    public static toDomain(raw: any): Product {
        const productOrError = Product.create({
            name: raw._doc.name,
            category: raw._doc.category,
            fee: raw._doc.fee,
            recipe: raw._doc.recipe,
            discountedFee: raw._doc.discountedFee,
            _id: raw._doc._id
        })

        return productOrError.isSuccess ? productOrError.getValue() : productOrError.getErrorValue()
    }
    public static toPersistence(product: Product): any {
        return {
            name: product.props.name,
            category: product.props.category,
            recipe: product.props.recipe,
            fee: product.props.fee,
            discountedFee: product.props.discountedFee,
        }
    }
}