import { Schema, model } from 'mongoose'
import { RestaurantProps } from '../../../../../modules/Restaurant/domain/restaurant'


export const Restaurant = new Schema<RestaurantProps>({
    name: { type: String, required: true },
    ownerName: { type: String, required: true },
    ownerSurname: { type: String, required: true },
    city: { type: String, required: true },
    foods: [{ type: Schema.Types.ObjectId, ref: 'Food'}],

}, { timestamps: true })

const RestaurantModel = model<RestaurantProps>('Restaurant', Restaurant)

export {
    RestaurantModel
}