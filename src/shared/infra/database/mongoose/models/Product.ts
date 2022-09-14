import { Schema, model } from 'mongoose'
import { ProductProps } from '../../../../../modules/Restaurant/domain/product'


export const Product = new Schema<ProductProps>({
    name: { type: String },
    category: {
        id: { type: Schema.Types.ObjectId, ref: 'Category' },
        name: { type: String }
    },
    recipe: { type: String },
    fee: { type: Number, required: true },
    discountedFee: { type: Number },

}, { timestamps: true })

const ProductModel = model<ProductProps>('Product', Product)

export {
    ProductModel
}