/* eslint-disable @typescript-eslint/no-explicit-any */
import { Customer } from "../domain/Customer";

export class CustomerMapper {
    public static toDomain(raw: any): Customer {
        console.log({ raw })
        const customerOrError = Customer.create({
            address: raw.address,
            email: raw.email,
            name: raw.name,
            phoneNumber: raw.phoneNumber,
            accessToken: raw.accessToken,
            refreshToken: raw.refreshToken,
            id: raw._id
        })
        return customerOrError.isSuccess ? customerOrError.getValue() : customerOrError.getErrorValue()
    }

    public static toPersistence({ props }: Customer): any {
        return {
            address: props.address,
            email: props.email,
            name: props.name,
            phoneNumber: props.phoneNumber,
            accessToken: props.accessToken,
            refreshToken: props.refreshToken,
            id: props.id
        }
    }
}   