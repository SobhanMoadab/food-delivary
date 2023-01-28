import { Either, left, Result, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Order } from "../../domain/Order";
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
        let order: Order

        try {
            try {
                order = await this.orderRepo.findById(req.orderId)
            } catch (err) {
                return left(new Order404())
            }
            
            return right(Result.ok())
        } catch (error) {
            return left(Result.fail('failed'))
        }
    }
}