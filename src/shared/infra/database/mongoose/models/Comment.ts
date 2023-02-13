import { Schema, model } from 'mongoose'
import { CommentProps } from '../../../../../modules/Customer/domain/Comment'


export const Comment = new Schema<CommentProps>({
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
    title: { type: String, required: true },
    body: { type: String, required: true },
    orderId: { type: Schema.Types.ObjectId, ref: 'Order' },
}, { timestamps: true })

const CommentModel = model<CommentProps>('Comment', Comment)

export {
    CommentModel
}