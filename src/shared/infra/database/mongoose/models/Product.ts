import { Schema, model } from 'mongoose'
import { ProductProps } from '../../../../../modules/Restaurant/domain/food'


export const Product = new Schema<ProductProps>({
    name: { type: String, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
    recipe: { type: String, required: true },
    fee: { type: Number, required: true },
    discountedFee: { type: Number },
    restaurantId: { type: Schema.Types.ObjectId, ref: "Restaurant" }

}, { timestamps: true })

const ProductModel = model<ProductProps>('Product', Product)

export {
    ProductModel
}