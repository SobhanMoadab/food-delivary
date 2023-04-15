import { UnexpectedError } from "../../../../shared/core/AppError";
import { Guard } from "../../../../shared/core/Guard";
import { Either, left, Result, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { Comment } from "../../domain/Comment";
import { Customer } from "../../domain/Customer";
import { CustomerId } from "../../domain/CustomerId";
import { Order } from "../../domain/Order";
import { OrderId } from "../../domain/OrderId";
import { ICustomerRepository } from "../../repos/ICustomerRepository";
import { IOrderRepository } from "../../repos/IOrderRepository";
import { AddCommentToOrderDTO } from "./AddCommentToOrderDTO";
import { Customer404, Order404 } from "./AddCommentToOrderErrors";


type Response = Either<
    Order404 |
    Result<any>,
    Result<void>
>


export class AddCommentToOrder implements UseCase<AddCommentToOrderDTO, Promise<Response>>{
    constructor(
        public orderRepo: IOrderRepository,
        public customerRepo: ICustomerRepository
    ) { }

    public async execute(req: AddCommentToOrderDTO): Promise<Response> {
        try {
            let order: Order
            let customer: Customer

            try {
                order = await this.orderRepo.findById(req.orderId)
                console.log({ order });
            } catch (err) {
                return left(new Order404())
            }
            try {
                customer = await this.customerRepo.findById(req.customerId)
            } catch (err) {
                return left(new Customer404())
            }
            const comment = Comment.create({
                body: req.body,
                customerId: customer.customerId,
            title: req.title,
                orderId: order.orderId
            }).getValue()
            order.addComment(comment)
            await this.orderRepo.save(order)
            return right(Result.ok())

        } catch (err) {
            return left(new UnexpectedError('Something went wrong'))
        }


    }
}