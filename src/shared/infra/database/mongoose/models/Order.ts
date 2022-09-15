import { Schema, model } from 'mongoose'
import { OrderProps } from '../../../../../modules/Customer/domain/Order'


export const Order = new Schema<OrderProps>({
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    foodsPrice: { type: Number, required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    status: { type: String, required: true },
}, { timestamps: true })



const OrderModel = model('Order', Order)

export {
    OrderModel
}