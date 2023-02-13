import { Comment } from "../domain/Comment";

export class CommentMapper {
    // public static toDomain(raw: any): Customer {
    //     const customerOrError = Customer.create({
    //         address: raw.address,
    //         email: raw.email,
    //         name: raw.name,
    //         phoneNumber: raw.phoneNumber,
    //         accessToken: raw.accessToken,
    //         refreshToken: raw.refreshToken,
    //     })
    //     return customerOrError.isSuccess ? customerOrError.getValue() : customerOrError.getErrorValue()
    // }

    public static toPersistence({ props }: Comment): any {
        return {
            customerId: props.customerId,
            title: props.title,
            body: props.body,
            orderId: props.orderId
        }
    }
}   