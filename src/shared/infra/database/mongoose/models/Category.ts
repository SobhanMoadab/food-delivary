import { Schema, model } from 'mongoose'
import {CategoryProps } from '../../../../../modules/RestaurantOwner/domain/Category/Category'


export const Category = new Schema<CategoryProps>({
    name: { type: String },
    products: [{
        _id: { type: Schema.Types.ObjectId, ref: "Product" },
        name: { type: String, required: true },
        fee: { type: Number, required: true },
        recipe: { type: String, required: true },
        discountedFee: { type: Number }
    }]
}, { timestamps: true })

const CategoryModel = model<CategoryProps>('Category', Category)

export {
    CategoryModel
}