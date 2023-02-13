import { UnexpectedError } from "../../../../shared/core/AppError";
import { Guard } from "../../../../shared/core/Guard";
import { Either, left, Result, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { Comment } from "../../domain/Comment";
import { CustomerId } from "../../domain/CustomerId";
import { Order } from "../../domain/Order";
import { OrderId } from "../../domain/OrderId";
import { IOrderRepository } from "../../repos/IOrderRepository";
import { AddCommentToOrderDTO } from "./AddCommentToOrderDTO";
import { Order404 } from "./AddCommentToOrderErrors";


type Response = Either<
    Order404 |
    Result<any>,
    Result<void>
>


export class AddCommentToOrder implements UseCase<AddCommentToOrderDTO, Promise<Response>>{
    constructor(
        public orderRepo: IOrderRepository
    ) { }

    public async execute(req: AddCommentToOrderDTO): Promise<Response> {
        try {
            let order: Order
            try {
                order = await this.orderRepo.findById(req.orderId)
            } catch (err) {
                return left(new Order404())
            }
            const customerIdOrError = CustomerId.create(new UniqueEntityID(req.customerId))
            const orderIdOrError = OrderId.create(new UniqueEntityID(req.orderId))
            if (customerIdOrError.isFailure || orderIdOrError.isFailure) {
                return left(new UnexpectedError('Provided id is not valid'))
            }
            const comment = Comment.create({
                body: req.body,
                customerId: customerIdOrError.getValue(),
                title: req.title,
                orderId: orderIdOrError.getValue()
            }).getValue()

            order.addComment(comment)
            await this.orderRepo.save(order)
            return right(Result.ok())

        } catch (err) {
            return left(new UnexpectedError('Something went wrong'))
        }


    }
}