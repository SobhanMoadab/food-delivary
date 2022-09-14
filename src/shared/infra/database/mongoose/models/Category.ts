import { Schema, model, Document } from 'mongoose'
import { CategoryProps } from '../../../../../modules/RestaurantOwner/domain/category'


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


const CategoryModel = model('Category', Category)

export {
    CategoryModel
}