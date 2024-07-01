import { Schema, model } from 'mongoose'
import { CustomerProps } from '../../../../../modules/Customer/domain/Customer'


export const Customer = new Schema<CustomerProps>({
  name: { type: String },
  email: { type: String },
  accessToken: { type: String },
  address: { type: String },
  phoneNumber: { type: Number },
  refreshToken: { type: String }
})

const CustomerModel = model<CustomerProps>('Customer', Customer)

export {
  CustomerModel
}