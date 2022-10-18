import { Schema, model } from 'mongoose'
import { FoodProps } from '../../../../../modules/Restaurant/domain/food'


export const Food = new Schema<FoodProps>({
    name: { type: String, required: true },
    recipe: { type: String, required: true },
    fee: { type: Number, required: true },
    discountedFee: { type: Number },
    restaurantId: { type: Schema.Types.ObjectId, ref: "Restaurant" }

}, { timestamps: true })

const FoodModel = model<FoodProps>('Food', Food)

export {
    FoodModel
}