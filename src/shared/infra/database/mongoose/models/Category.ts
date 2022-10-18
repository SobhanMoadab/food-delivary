import { model, Schema } from 'mongoose'
import { CategoryProps } from '../../../../../modules/Restaurant/domain/category'


export const Category = new Schema<CategoryProps>({
    name: { type: String },
    // products: [{
    //     type: Schema.Types.ObjectId, ref: "Product"
    // }]
}, { timestamps: true })


const CategoryModel = model('Category', Category)

export {
    CategoryModel
}